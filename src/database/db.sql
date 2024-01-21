-- Active: 1705079014325@@127.0.0.1@3306/buenosairesbasquet
USE buenosairesbasquet

CREATE TABLE Cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_email (email)
);

-- Crear tabla para almacenar datos adicionales del cliente
CREATE TABLE DatosCliente (
    cliente_id INT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    edad INT NOT NULL,
    sede_preferida VARCHAR(255),
    genero VARCHAR(20),
    altura DECIMAL(5,2),
    peso DECIMAL(5,2),
    foto LONGBLOB, -- Almacenar imágenes (ajusta según tus necesidades)
    certificado_salud BOOLEAN NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);

-- Crear tabla para almacenar historial de pagos
CREATE TABLE HistorialPagos (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);

-- Crear tabla para almacenar historial de reservas de clases
CREATE TABLE HistorialReservas (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    fecha_reserva DATE NOT NULL,
    clase_plan VARCHAR(255) NOT NULL, -- Ajusta según tus necesidades
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);

SELECT * FROM Cliente;
