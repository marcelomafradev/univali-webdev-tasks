SELECT
  p.id_pagamento    AS id_venda,
  p.data_pagamento  AS data_do_pagamento,
  p.valor_pagamento AS valor_do_pagamento,
  i.id_imovel       AS codigo_imovel,
  i.descricao       AS descricao_imovel,
  t.tipo            AS tipo_imovel
FROM pagamento p
JOIN imovel i ON i.id_imovel = p.id_imovel
JOIN tipo_imovel t ON t.id_tipo = i.id_tipo
ORDER BY p.data_pagamento;
