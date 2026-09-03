import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import type { RowDataPacket } from 'mysql2/promise';
import { DatabaseConnection } from '../config/database-connection.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONSULTA_JOIN_SQL = readFileSync(
  path.join(__dirname, '../../db/consulta-join.sql'),
  'utf8'
);

export interface PagamentoCompleto extends RowDataPacket {
  id_venda: number;
  data_do_pagamento: string;
  valor_do_pagamento: string;
  codigo_imovel: number;
  descricao_imovel: string;
  tipo_imovel: string;
}

export class PagamentoRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async buscarSerieHistoricaCompleta(): Promise<PagamentoCompleto[]> {
    return this.databaseConnection.query<PagamentoCompleto[]>(CONSULTA_JOIN_SQL);
  }
}
