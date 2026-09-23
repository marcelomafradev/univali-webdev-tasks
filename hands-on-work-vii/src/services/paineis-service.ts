import type { PagamentoCompleto } from '../repositories/pagamento-repository.js';

export interface TotalPorImovel {
  codigoImovel: number;
  totalPagamentos: number;
}

export interface TotalPorMes {
  mesAno: string;
  totalVendas: number;
}

export interface PercentualPorTipo {
  tipoImovel: string;
  percentual: number;
}

function arredondar(valor: number): number {
  return Math.round(valor * 100) / 100;
}

function extrairMesAno(data: string | Date): string {
  const dataReferencia = data instanceof Date ? data : new Date(`${data}T00:00:00`);
  const mes = String(dataReferencia.getMonth() + 1).padStart(2, '0');
  const ano = dataReferencia.getFullYear();
  return `${mes}/${ano}`;
}

function compararMesAno(mesAnoA: string, mesAnoB: string): number {
  const [mesA, anoA] = mesAnoA.split('/').map(Number);
  const [mesB, anoB] = mesAnoB.split('/').map(Number);
  return anoA * 12 + mesA - (anoB * 12 + mesB);
}

export function calcularTotalPagamentosPorImovel(
  pagamentos: PagamentoCompleto[]
): TotalPorImovel[] {
  const totaisPorImovel = pagamentos.reduce<Map<number, number>>(
    (acumulador, pagamento) => {
      const totalAtual = acumulador.get(pagamento.codigo_imovel) ?? 0;
      const valor = Number(pagamento.valor_do_pagamento);
      acumulador.set(pagamento.codigo_imovel, totalAtual + valor);
      return acumulador;
    },
    new Map()
  );

  return Array.from(totaisPorImovel.entries()).map(
    ([codigoImovel, totalPagamentos]) => ({
      codigoImovel,
      totalPagamentos: arredondar(totalPagamentos),
    })
  );
}

export function calcularVendasPorMes(
  pagamentos: PagamentoCompleto[]
): TotalPorMes[] {
  const totaisPorMes = pagamentos.reduce<Map<string, number>>(
    (acumulador, pagamento) => {
      const mesAno = extrairMesAno(pagamento.data_do_pagamento);
      const totalAtual = acumulador.get(mesAno) ?? 0;
      const valor = Number(pagamento.valor_do_pagamento);
      acumulador.set(mesAno, totalAtual + valor);
      return acumulador;
    },
    new Map()
  );

  return Array.from(totaisPorMes.entries())
    .map(([mesAno, totalVendas]) => ({
      mesAno,
      totalVendas: arredondar(totalVendas),
    }))
    .sort((a, b) => compararMesAno(a.mesAno, b.mesAno));
}

export function calcularPercentualVendasPorTipoImovel(
  pagamentos: PagamentoCompleto[]
): PercentualPorTipo[] {
  const valorTotalGeral = pagamentos.reduce(
    (soma, pagamento) => soma + Number(pagamento.valor_do_pagamento),
    0
  );

  const totaisPorTipo = pagamentos.reduce<Map<string, number>>(
    (acumulador, pagamento) => {
      const totalAtual = acumulador.get(pagamento.tipo_imovel) ?? 0;
      const valor = Number(pagamento.valor_do_pagamento);
      acumulador.set(pagamento.tipo_imovel, totalAtual + valor);
      return acumulador;
    },
    new Map()
  );

  return Array.from(totaisPorTipo.entries()).map(
    ([tipoImovel, valorTotal]) => ({
      tipoImovel,
      percentual: arredondar((valorTotal / valorTotalGeral) * 100),
    })
  );
}
