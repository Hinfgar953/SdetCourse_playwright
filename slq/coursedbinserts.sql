
-- Clientes (nota: cliente 5 no tiene pedidos)
INSERT INTO clientes VALUES
(1, 'Ana Torres', 'Bogotá', '2023-01-15'),
(2, 'Luis Pérez', 'Medellín', '2023-03-22'),
(3, 'Carla Gómez', 'Cali', '2023-05-10'),
(4, 'Jorge Ramírez', 'Bogotá', '2023-07-01'),
(5, 'Sofía Díaz', 'Barranquilla', '2023-08-19');

-- Categorías
INSERT INTO categorias VALUES
(1, 'Acción'),
(2, 'Comedia'),
(3, 'Drama'),
(4, 'Ciencia Ficción'),
(5, 'Terror');

-- Películas (nota: pelicula 6 tiene categoria_id NULL)
INSERT INTO peliculas VALUES
(1, 'Duro de Matar', 1, 3.50),
(2, 'La Máscara', 2, 2.75),
(3, 'El Padrino', 3, 4.00),
(4, 'Interestelar', 4, 4.50),
(5, 'El Conjuro', 5, 3.00),
(6, 'Documental Desconocido', NULL, 2.00);

-- Pedidos (nota: cliente 5 no aparece aquí)
INSERT INTO pedidos VALUES
(101, 1, '2024-01-05'),
(102, 2, '2024-01-10'),
(103, 1, '2024-02-01'),
(104, 3, '2024-02-15'),
(105, 4, '2024-03-01');

-- Detalle de pedidos (nota: pedido 105 no tiene detalle)
INSERT INTO detalle_pedidos VALUES
(1001, 101, 1, 2),
(1002, 101, 3, 1),
(1003, 102, 2, 1),
(1004, 103, 4, 3),
(1005, 104, 5, 1),
(1006, 104, 1, 1);