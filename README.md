# Tresastronautas NestJS App

## 🌍 Descripción General

Este proyecto es una API construida con **NestJS** siguiendo los principios de **DDD (Domain-Driven Design)**, **arquitectura hexagonal**, y los principios de **SOLID**. La aplicación gestiona usuarios y productos, implementa autenticación con **JWT**, está dockerizada, y documentada con **Swagger**.

```
https://tresatronautas-production.up.railway.app/api
```

## 🌐 Tecnologías principales

* [NestJS](https://nestjs.com/) - Framework principal
* [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
* [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
* [JWT](https://jwt.io/) - Autenticación con tokens
* [Docker](https://www.docker.com/) - Contenerización
* [Swagger](https://swagger.io/) - Documentación de la API
* [Railway](https://railway.app/) - Hosting y despliegue
* [Jest](https://jestjs.io/) - Testing
* \[Faker Core (mock-core.com)] - Simulación de integración externa

## 🔧 Arquitectura

El proyecto está estructurado en módulos siguiendo una **arquitectura hexagonal**:

* **Domain**: Entidades, interfaces de repositorios, objetos de valor y excepciones de negocio.
* **Application**: Casos de uso que orquestan la lógica entre dominio e infraestructura.
* **Infrastructure**:

  * Controladores HTTP (NestJS)
  * Repositorios que acceden a la base de datos (implementación de interfaces de dominio)
  * Servicios externos (Faker Core)
* **Shared**: Módulos comunes, decoradores, guardas JWT, excepciones comunes.

## 🔒 Autenticación con JWT

* Al registrar un usuario, se almacena su información y contraseña hasheada.
* El login genera un **JWT** con `sub` y `email`.
* Las rutas protegidas usan un **JwtGuard** y decorador `@CurrentUser()`.

## 🔢 Endpoints principales

* `POST /auth/register` - Registrar usuario
* `POST /auth/login` - Login y obtener token JWT
* `GET /products` - Listar productos del usuario
* `POST /products` - Crear producto
* `GET /products/:id` - Obtener un producto por ID
* `DELETE /products/:id` - Borrar un producto

## 🔹 Validación con Core Fake

Cuando se crea o actualiza un producto, se simula una llamada POST a:

```
POST http://mock-core.com/validate
```

* Se envía el `price`
* Si `price < 10`, el producto es rechazado como inválido
* El campo `isValid` se alamcena en memoria en un VO y reporta la excepcion si no se cumple la condición 

## 🛠️ Tests

Se usó **Jest** para realizar pruebas unitarias de los casos de uso:

* `UsersStoreUseCase`
* `UsersLoginUseCase`
* `ProductsStoreUseCase`
* `ProductsUpdateUseCase`
* `ProductsDeleteUseCase`
* `ProductsShowUseCase`
* `ProductsIndexUseCase`

Los repositorios y servicios externos se mockean con `jest.fn()`.

## 🧱 Principios de diseño aplicados

* **Single Responsibility Principle**: cada clase tiene una única responsabilidad.
* **Dependency Inversion**: inyección de dependencias mediante interfaces del dominio.
* **Open/Closed Principle**: componentes abiertos a extensión, cerrados a modificación.

## 🚀 Despliegue en Railway

La aplicación está desplegada en Railway:

* **NestJS** como servicio principal
* **MongoDB** como servicio conectado
* Se configuran las variables de entorno: `MONGO_URI`
* El dominio se genera desde Railway

## 📚 Swagger

Disponible en:

```
https://tresatronautas-production.up.railway.app/api
```

Incluye:

* Endpoints
* Request body
* Respuestas
* Autenticación JWT

## ⚖️ Docker

El proyecto incluye docker compose y configuración para ejecutarse con:

```bash
docker-compose up --build
```

---

Desarrollado con ❤ por Cristian Vasquez 2025