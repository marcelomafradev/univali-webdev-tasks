import 'dotenv/config';
import { DatabaseConnection } from './config/database-connection.js';
import { PagamentoRepository } from './repositories/pagamento-repository.js';

async function main(): Promise<void> {
  const databaseConnection = new DatabaseConnection({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME as string,
  });

  const pagamentoRepository = new PagamentoRepository(databaseConnection);

  try {
    const serieHistorica = await pagamentoRepository.buscarSerieHistoricaCompleta();
    console.log(`Total de registros carregados em memória: ${serieHistorica.length}`);
    console.table(serieHistorica);
  } finally {
    await databaseConnection.close();
  }
}

main().catch((error) => {
  console.error('Falha ao consultar pagamentos:', error);
  process.exitCode = 1;
});
