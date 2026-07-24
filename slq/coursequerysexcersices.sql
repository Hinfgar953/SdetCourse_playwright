-- INNER JOIN
--Consulta para mostrar todos los pedidos incluyendo el nombre de la pelicula y la pelicula alquilada
use practica_peliculas
SELECT c.nombre    AS cliente,
    p.pedido_id,
    pe.titulo       AS pelicula,
    dp.cantidad,
    pe.precio_alquiler,
    (dp.cantidad * pe.precio_alquiler) AS subtotal
FROM clientes c
INNER JOIN pedidos p        ON p.cliente_id = c.cliente_id
INNER JOIN detalle_pedidos dp ON dp.pedido_id = p.pedido_id
INNER JOIN peliculas pe      ON pe.pelicula_id = dp.pelicula_id
ORDER BY p.pedido_id;

-- ---------------------------------------------------------------------
--LEFT JOIN
--Consulta para mostrar todos los clientes (no importa si hayan hecho pedidos o no)
-- ---------------------------------------------------------------------
SELECT
    c.cliente_id,
    c.nombre,
    p.pedido_id,
    p.fecha_pedido
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.cliente_id
ORDER BY c.cliente_id;

-- ---------------------------------------------------------------------
-- LEFT JOIN 
-- Clientes que NUNCA han hecho un pedido (filtra los NULL del LEFT JOIN).
-- ---------------------------------------------------------------------
SELECT
    c.cliente_id,
    c.nombre,
    c.ciudad
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.cliente_id
WHERE p.pedido_id IS NULL;

-- ---------------------------------------------------------------------
-- LEFT JOIN 
-- consulta para mostrar películas sin categoría asignada.
-- ---------------------------------------------------------------------
SELECT
    pe.pelicula_id,
    pe.titulo,
    cat.nombre_categoria
FROM peliculas pe
LEFT JOIN categorias cat ON cat.categoria_id = pe.categoria_id
WHERE cat.categoria_id IS NULL;

-- ---------------------------------------------------------------------
-- GROUP BY + HAVING
--  Consulta para mostrar el total gastado por cada cliente, mostrando solo quienes han gastado más de 10.
-- ---------------------------------------------------------------------
SELECT
    c.cliente_id,
    c.nombre,
    SUM(dp.cantidad * pe.precio_alquiler) AS total_gastado
FROM clientes c
INNER JOIN pedidos p         ON p.cliente_id = c.cliente_id
INNER JOIN detalle_pedidos dp ON dp.pedido_id = p.pedido_id
INNER JOIN peliculas pe       ON pe.pelicula_id = dp.pelicula_id
GROUP BY c.cliente_id, c.nombre
HAVING SUM(dp.cantidad * pe.precio_alquiler) > 10
ORDER BY total_gastado DESC;

-- GROUP BY + HAVING 
--  consulta para mostrar categorías cuyas películas se han alquilado más de 3 veces en total
SELECT
    cat.nombre_categoria,
    SUM(dp.cantidad) AS veces_alquilada
FROM categorias cat
INNER JOIN peliculas pe       ON pe.categoria_id = cat.categoria_id
INNER JOIN detalle_pedidos dp ON dp.pelicula_id = pe.pelicula_id
GROUP BY cat.nombre_categoria
HAVING SUM(dp.cantidad) > 3
ORDER BY veces_alquilada DESC;
-- consulta para msotrar cada cliente junto con el número total de pedidos que ha hecho.
-- ---------------------------------------------------------------------
SELECT
    c.cliente_id,
    c.nombre,
    (SELECT COUNT(*)
     FROM pedidos p
     WHERE p.cliente_id = c.cliente_id) AS total_pedidos
FROM clientes c
ORDER BY total_pedidos DESC;

-- consulta para mostrar Clientes que han alquilado alguna vez una película de la categoría 'Terror'.

SELECT DISTINCT
    c.nombre
FROM clientes c
WHERE c.cliente_id IN (
    SELECT p.cliente_id
    FROM pedidos p
    INNER JOIN detalle_pedidos dp ON dp.pedido_id = p.pedido_id
    INNER JOIN peliculas pe       ON pe.pelicula_id = dp.pelicula_id
    INNER JOIN categorias cat     ON cat.categoria_id = pe.categoria_id
    WHERE cat.nombre_categoria = 'Terror'
);

-- consulta para mostrar Películas cuyo precio de alquiler está por encima del precio promedio de su propia categoría.

SELECT
    pe.titulo,
    cat.nombre_categoria,
    pe.precio_alquiler
FROM peliculas pe
INNER JOIN categorias cat ON cat.categoria_id = pe.categoria_id
WHERE pe.precio_alquiler > (
    SELECT AVG(pe2.precio_alquiler)
    FROM peliculas pe2
    WHERE pe2.categoria_id = pe.categoria_id

-- consulta para mostrar el Ranking de películas más alquiladas (por cantidad total) dentro de cada categoría.
SELECT
    cat.nombre_categoria,
    pe.titulo,
    SUM(dp.cantidad) AS total_alquilada,
    RANK() OVER (
        PARTITION BY cat.nombre_categoria
        ORDER BY SUM(dp.cantidad) DESC
    ) AS ranking_en_categoria
FROM peliculas pe
INNER JOIN categorias cat     ON cat.categoria_id = pe.categoria_id
INNER JOIN detalle_pedidos dp ON dp.pelicula_id = pe.pelicula_id
GROUP BY cat.nombre_categoria, pe.titulo
ORDER BY cat.nombre_categoria, ranking_en_categoria;

-- ---------------------------------------------------------------------

--  consulta  para mostrar el pedido más reciente de cada cliente (top-1 por cliente).
-- ---------------------------------------------------------------------
SELECT *
FROM (
    SELECT
        c.nombre,
        p.pedido_id,
        p.fecha_pedido,
        ROW_NUMBER() OVER (
            PARTITION BY c.cliente_id
            ORDER BY p.fecha_pedido DESC
        ) AS rn
    FROM clientes c
    INNER JOIN pedidos p ON p.cliente_id = c.cliente_id
) sub
WHERE rn = 1;
