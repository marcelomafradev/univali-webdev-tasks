# Hands on Work VII — Parte 1

Serviços de backend para os painéis gráficos de uma gestora imobiliária
(disciplina Hands on Work VII, contexto de extensão Projeto NAM/UNIVALI).

**Entrega 1:** [`docs/entrega-1.pdf`](docs/entrega-1.pdf) — documento
consolidado com capa, diagrama ER, scripts SQL, código-fonte e especificação
OpenAPI (itens a ao f).

Esta entrega cobre os itens **a a f** da Parte 1 do enunciado:

| Item | Onde está |
|---|---|
| a. Tabelas (`tipo_imovel`, `imovel`, `pagamento`) | `db/schema.sql` |
| b. ≥ 30 pagamentos em ≥ 5 meses distintos | `db/schema.sql` (36 registros, ago–dez/2025) |
| c. ≥ 8 imóveis, ≥ 3 tipos distintos | `db/schema.sql` (8 imóveis, 4 tipos) |
| d. Consulta SQL com JOIN entre as 3 tabelas | `db/consulta-join.sql` |
| e. Código que executa a consulta do item d | `src/consultar-pagamentos.ts` |
| f. Especificação OpenAPI dos 3 serviços da Parte 2 | `docs/openapi.yaml` |

## Estrutura do banco

3 tabelas relacionadas por chave estrangeira:

- `tipo_imovel(id_tipo, tipo)`
- `imovel(id_imovel, descricao, id_tipo, inquilino)`
- `pagamento(id_pagamento, data_pagamento, valor_pagamento, id_imovel)`

A consulta em `db/consulta-join.sql` faz o `JOIN` entre as três tabelas e
devolve a estrutura apresentada no enunciado (`id_venda`, `data_do_pagamento`,
`valor_do_pagamento`, `codigo_imovel`, `descricao_imovel`, `tipo_imovel`), sem
`WHERE` nem `GROUP BY` — o filtro e a agregação (Parte 2) ficam a cargo da
aplicação, usando `map`/`filter`/`reduce` sobre os dados carregados na íntegra
em memória.

## Como rodar

Pré-requisitos: Node.js 20+ e um MySQL acessível. O projeto é em TypeScript e
roda direto via [`tsx`](https://github.com/privatenumber/tsx), sem passo de
build.

1. Suba o schema e os dados de exemplo:

   ```bash
   mysql -u root -p < db/schema.sql
   ```

   > Se a porta 3306 já estiver em uso (ex. outro MySQL via Docker), suba uma
   > instância em outra porta e ajuste `DB_PORT` no `.env` de acordo.

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Copie `.env.example` para `.env` e ajuste as credenciais:

   ```bash
   cp .env.example .env
   ```

4. Execute a consulta (item e):

   ```bash
   npm start
   ```

   O script conecta ao banco, executa `db/consulta-join.sql` e imprime os 36
   registros carregados em memória — a base sobre a qual as 3 funções da
   Parte 2 vão processar os dados.

## Documento OpenAPI (item f)

`docs/openapi.yaml` descreve os 3 serviços REST/GET que serão implementados
na Parte 2 (ainda não implementados nesta entrega):

- `GET /api/imoveis/total-pagamentos` — total acumulado por imóvel (gráfico de barras)
- `GET /api/vendas/mensal` — total de vendas por mês/ano (gráfico de linha/dispersão)
- `GET /api/imoveis/percentual-por-tipo` — percentual de vendas por tipo de imóvel (gráfico de pizza)

Para visualizar/testar a especificação no Swagger, importe o arquivo em
https://editor.swagger.io/ ou em uma instância local do Swagger UI.
