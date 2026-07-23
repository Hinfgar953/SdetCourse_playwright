CREATE DATABASE practica_peliculas;
USE practica_peliculas;

CREATE TABLE clientes (
    cliente_id INT PRIMARY KEY,
    nombre VARCHAR(100),
    ciudad VARCHAR(100),
    fecha_registro DATE
);

CREATE TABLE categorias (
    categoria_id INT PRIMARY KEY,
    nombre_categoria VARCHAR(100)
);

CREATE TABLE peliculas (
    pelicula_id INT PRIMARY KEY,
    titulo VARCHAR(150),
    categoria_id INT,
    precio_alquiler DECIMAL(10,2),
    FOREIGN KEY (categoria_id)
        REFERENCES categorias(categoria_id)
);

CREATE TABLE pedidos (
    pedido_id INT PRIMARY KEY,
    cliente_id INT,
    fecha_pedido DATE,
    FOREIGN KEY (cliente_id)
        REFERENCES clientes(cliente_id)
);

CREATE TABLE detalle_pedidos (
    detalle_id INT PRIMARY KEY,
    pedido_id INT,
    pelicula_id INT,
    cantidad INT,
    FOREIGN KEY (pedido_id)
        REFERENCES pedidos(pedido_id),
    FOREIGN KEY (pelicula_id)
        REFERENCES peliculas(pelicula_id)
);