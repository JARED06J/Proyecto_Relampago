-- ============================================================
--  SCHEMA - Sistema de Citas de Matricula
--  Base de datos: SQL Server
--  Servidor: tiusr16pl.cuc-carrera-ti.ac.cr
-- ============================================================

USE proyecto_relampago;
GO

-- ============================================================
--  TABLA: carreras
-- ============================================================
CREATE TABLE carreras (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    codigo      VARCHAR(20)   NOT NULL UNIQUE,
    descripcion VARCHAR(500)  NULL,
    created_at  DATETIME2     DEFAULT GETDATE()
);
GO

-- ============================================================
--  TABLA: aspirantes
-- ============================================================
CREATE TABLE aspirantes (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    apellido    VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    telefono    VARCHAR(20)   NULL,
    carrera_id  INT           NULL,
    created_at  DATETIME2     DEFAULT GETDATE(),
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);
GO

-- ============================================================
--  TABLA: matriculas
--  PUNTO 2: fecha_inicio y fecha_fin para controlar el periodo
-- ============================================================
CREATE TABLE matriculas (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    nombre       VARCHAR(100)  NOT NULL,
    periodo      VARCHAR(50)   NOT NULL,
    fecha_inicio DATETIME2     NOT NULL,   -- Fecha/hora inicio matricula
    fecha_fin    DATETIME2     NOT NULL,   -- Fecha/hora fin matricula
    activa       BIT           DEFAULT 0,
    created_at   DATETIME2     DEFAULT GETDATE()
);
GO

-- ============================================================
--  TABLA: citas
--  PUNTO 3: se filtra por carrera_id para el listado por carrera
-- ============================================================
CREATE TABLE citas (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    aspirante_id  INT          NOT NULL,
    carrera_id    INT          NOT NULL,
    matricula_id  INT          NULL,
    fecha_hora    DATETIME2    NOT NULL,
    estado        VARCHAR(20)  NOT NULL DEFAULT 'pendiente'
                  CHECK (estado IN ('pendiente','confirmada','cancelada')),
    notas         VARCHAR(500) NULL,
    created_at    DATETIME2    DEFAULT GETDATE(),
    FOREIGN KEY (aspirante_id) REFERENCES aspirantes(id),
    FOREIGN KEY (carrera_id)   REFERENCES carreras(id),
    FOREIGN KEY (matricula_id) REFERENCES matriculas(id)
);
GO

-- ============================================================
--  DATOS INICIALES - Carreras de ejemplo
-- ============================================================
INSERT INTO carreras (nombre, codigo, descripcion) VALUES
('Ingenieria en Sistemas', 'INGE-SIS', 'Carrera de Ingenieria en Sistemas Computacionales'),
('Administracion', 'ADMIN', 'Carrera de Administracion de Empresas'),
('Contaduria', 'CONT', 'Carrera de Contaduria Publica'),
('Derecho', 'DER', 'Carrera de Derecho'),
('Medicina', 'MED', 'Carrera de Medicina General');
GO
