CREATE DATABASE IF NOT EXISTS how_vii DEFAULT CHARACTER SET utf8mb4;
USE how_vii;

DROP TABLE IF EXISTS pagamento;
DROP TABLE IF EXISTS imovel;
DROP TABLE IF EXISTS tipo_imovel;

CREATE TABLE tipo_imovel (
  id_tipo INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE imovel (
  id_imovel INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(400) NOT NULL,
  id_tipo INT NOT NULL,
  inquilino VARCHAR(70) DEFAULT NULL,
  PRIMARY KEY (id_imovel),
  KEY id_tipo (id_tipo),
  CONSTRAINT imovel_ibfk_1 FOREIGN KEY (id_tipo) REFERENCES tipo_imovel (id_tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE pagamento (
  id_pagamento INT NOT NULL AUTO_INCREMENT,
  data_pagamento DATE NOT NULL,
  valor_pagamento DECIMAL(12,2) NOT NULL,
  id_imovel INT NOT NULL,
  PRIMARY KEY (id_pagamento),
  KEY id_imovel (id_imovel),
  CONSTRAINT pagamento_ibfk_1 FOREIGN KEY (id_imovel) REFERENCES imovel (id_imovel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tipo_imovel (id_tipo, tipo) VALUES
  (1, 'Apartamento'),
  (2, 'Casa'),
  (3, 'Terreno'),
  (4, 'Sala Comercial');

INSERT INTO imovel (id_imovel, descricao, id_tipo, inquilino) VALUES
  (1, 'Apartamento 100 m² em condomínio fechado', 1, 'João Silva'),
  (2, 'Apartamento 80 m² próximo ao centro', 1, 'Maria Souza'),
  (3, 'Casa 150 m² com garagem', 2, 'Carlos Oliveira'),
  (4, 'Casa 200 m² em bairro residencial', 2, 'Ana Santos'),
  (5, 'Terreno 300 m² em área residencial', 3, 'Pedro Lima'),
  (6, 'Terreno 500 m² próximo à rodovia', 3, 'Lucas Pereira'),
  (7, 'Sala comercial 60 m² no centro', 4, 'Juliana Costa'),
  (8, 'Sala comercial 100 m² em edifício comercial', 4, 'Rafael Almeida');

INSERT INTO pagamento (id_pagamento, data_pagamento, valor_pagamento, id_imovel) VALUES
  (1, '2025-08-05', 5000.00, 1),
  (2, '2025-08-10', 4500.00, 2),
  (3, '2025-08-15', 7000.00, 3),
  (4, '2025-08-20', 6000.00, 4),
  (5, '2025-08-25', 3000.00, 5),
  (6, '2025-08-28', 3500.00, 6),
  (7, '2025-08-30', 2500.00, 7),
  (8, '2025-09-03', 5500.00, 1),
  (9, '2025-09-08', 4800.00, 2),
  (10, '2025-09-12', 7500.00, 3),
  (11, '2025-09-17', 6500.00, 4),
  (12, '2025-09-21', 3200.00, 5),
  (13, '2025-09-25', 3700.00, 6),
  (14, '2025-09-29', 2800.00, 8),
  (15, '2025-10-04', 5200.00, 1),
  (16, '2025-10-09', 4600.00, 2),
  (17, '2025-10-14', 7200.00, 3),
  (18, '2025-10-18', 6800.00, 4),
  (19, '2025-10-22', 3100.00, 5),
  (20, '2025-10-26', 3900.00, 6),
  (21, '2025-10-30', 3000.00, 7),
  (22, '2025-11-05', 5800.00, 1),
  (23, '2025-11-10', 4900.00, 2),
  (24, '2025-11-15', 7800.00, 3),
  (25, '2025-11-19', 7000.00, 4),
  (26, '2025-11-23', 3300.00, 5),
  (27, '2025-11-27', 4000.00, 6),
  (28, '2025-11-29', 3200.00, 8),
  (29, '2025-12-03', 6000.00, 1),
  (30, '2025-12-08', 5100.00, 2),
  (31, '2025-12-13', 8000.00, 3),
  (32, '2025-12-18', 7200.00, 4),
  (33, '2025-12-21', 3500.00, 5),
  (34, '2025-12-27', 4200.00, 6),
  (35, '2025-12-29', 3500.00, 7),
  (36, '2025-12-30', 3800.00, 8);
