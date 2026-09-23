import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { load as carregarYaml } from 'js-yaml';
import { DatabaseConnection } from './config/database-connection.js';
import { PagamentoRepository } from './repositories/pagamento-repository.js';
import {
  calcularTotalPagamentosPorImovel,
  calcularVendasPorMes,
  calcularPercentualVendasPorTipoImovel,
} from './services/paineis-service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const especificacaoOpenApi = carregarYaml(
  readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8')
) as Record<string, unknown>;

const databaseConnection = new DatabaseConnection({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME as string,
});

const pagamentoRepository = new PagamentoRepository(databaseConnection);

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(especificacaoOpenApi));

app.get('/api/imoveis/total-pagamentos', async (_req: Request, res: Response) => {
  try {
    const pagamentos = await pagamentoRepository.buscarSerieHistoricaCompleta();
    res.json(calcularTotalPagamentosPorImovel(pagamentos));
  } catch (error) {
    console.error('Falha ao calcular total de pagamentos por imovel:', error);
    res.status(500).json({ mensagem: 'Falha ao consultar pagamentos' });
  }
});

app.get('/api/vendas/mensal', async (_req: Request, res: Response) => {
  try {
    const pagamentos = await pagamentoRepository.buscarSerieHistoricaCompleta();
    res.json(calcularVendasPorMes(pagamentos));
  } catch (error) {
    console.error('Falha ao calcular vendas por mes:', error);
    res.status(500).json({ mensagem: 'Falha ao consultar pagamentos' });
  }
});

app.get('/api/imoveis/percentual-por-tipo', async (_req: Request, res: Response) => {
  try {
    const pagamentos = await pagamentoRepository.buscarSerieHistoricaCompleta();
    res.json(calcularPercentualVendasPorTipoImovel(pagamentos));
  } catch (error) {
    console.error('Falha ao calcular percentual por tipo de imovel:', error);
    res.status(500).json({ mensagem: 'Falha ao consultar pagamentos' });
  }
});

const porta = Number(process.env.PORT ?? 3000);

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
  console.log(`Documentacao Swagger em http://localhost:${porta}/docs`);
});
