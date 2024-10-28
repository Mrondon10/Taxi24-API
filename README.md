# Taxi24 API

API RESTful diseñada para gestionar conductores, pasajeros y viajes en la plataforma Taxi24.

## Requisitos

- Node.js (v16 o superior)
- PostgreSQL (recomendado v12 o superior)

## Configuración e Instalación

1. **Clona este repositorio:**

  
   git clone <URL_DEL_REPOSITORIO>
   cd taxi24-api


2. ## Instala las dependencias:

  $ npm install  

3. ## Configura el archivo .env:

  -Crea un archivo .env en la raíz del proyecto basado en el siguiente ejemplo y asegúrate de configurar las siguientes variables:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=taxi24

4. ## Crear la Base de Datos

  -Para crear la base de datos automáticamente desde Node.js, utiliza el siguiente comando:
    
  $ node createDatabase.js
  

5. ## Poblar la Base de Datos

  Para insertar datos iniciales y cubrir todos los casos de uso, utiliza el archivo seed.ts:

  $ ts-node seed.ts

6. ## Ejecución de la API 

  Para iniciar la API, ejecuta el siguiente comando:

  $ npm run start

  La API estará corriendo en http://localhost:3000.

7. ## Endpoints de la API

  Conductores (Drivers):
    Obtener una lista de todos los conductores:

      Ruta: GET /drivers
      Ejemplo: http://localhost:3000/drivers

    Obtener una lista de todos los conductores disponibles:

      Ruta: GET /drivers/available
      Ejemplo: http://localhost:3000/drivers/available

    Obtener una lista de todos los conductores disponibles en un radio de 3 km para una ubicación específica:

      Ruta: GET /drivers/available/:lat/:lng/:radius
      Ejemplo: http://localhost:3000/drivers/available/40.7128/-74.0060/3

    Obtener un conductor específico por ID:

      Ruta: GET /drivers/:id
      Ejemplo: http://localhost:3000/drivers/1


  ## Viajes (Trips):
    Crear una nueva solicitud de "Viaje" asignando un conductor a un pasajero:

      Ruta: POST /trips
      Cuerpo (JSON):

      {
        "driverId": 1,
        "passengerId": 2,
        "originLat": 40.7128,
        "originLng": -74.0060,
        "destinationLat": 40.7580,
        "destinationLng": -73.9855
      }

      Ejemplo: POST http://localhost:3000/trips 

    Completar un viaje:

      Ruta: PATCH /trips/:id/complete
      Cuerpo (JSON):

      {
        "distance": 5.0,
        "status": "completed"
      }

      Ejemplo: PATCH http://localhost:3000/trips/1/complete -H "Content-Type: application/json" -d '{"distance": 5.0, "status": "completed"}'

    Obtener una lista de todos los viajes activos:

      Ruta: GET /trips/active
      Ejemplo: http://localhost:3000/trips/active

  ## Pasajeros (Passengers)
    Obtener una lista de todos los pasajeros:

      Ruta: GET /passengers
      Ejemplo: curl http://localhost:3000/passengers

    Obtener un pasajero específico por ID:

      Ruta: GET /passengers/:id
      Ejemplo: curl http://localhost:3000/passengers/1

     Para un pasajero solicitando un viaje, obtener una lista de los 3 conductores más cercanos al punto de partida:

      Ruta: GET /passengers/:id/closest-drivers?radius=3
      Ejemplo: curl http://localhost:3000/passengers/1/closest-drivers?radius=3

  ## Facturas (Invoices):
    Obtener una lista de todas las facturas:

      Ruta: GET /invoices
      Ejemplo: http://localhost:3000/invoices

    Obtener una factura específica por ID:

      Ruta: GET /invoices/:id
      Ejemplo: http://localhost:3000/invoices/1

    Generar una factura después de completar un viaje:

      Ruta: POST /invoices
      Cuerpo (JSON):
      {
        "tripId": 1,
        "amount": 25.00
      }
      Ejemplo: POST http://localhost:3000/invoices

8. ## Ejecución de Pruebas

  -Para ejecutar las pruebas unitarias y verificar el funcionamiento de la API, usa el siguiente comando:

    $ npm run test

9. ## Estructura del Proyecto

  -Este proyecto sigue los principios de arquitectura limpia (Clean Architecture), con una separación clara de controladores, servicios y entidades. Esto facilita el mantenimiento y escalabilidad del sistema.

10. ## Notas Importantes

  CONSEJO Nº 1: 
    El modelo de datos ha sido diseñado para reflejar claramente la relación entre conductores, pasajeros y viajes. Puedes revisar las sentencias de creación de tablas en el archivo createDatabase.js.

  CONSEJO Nº 2: 
    Se han incluido datos iniciales para cubrir los casos de uso más importantes, permitiendo una demostración completa de la funcionalidad.

  PUNTOS ADICIONALES: 
    El modelo Invoice permite generar una factura automáticamente después de completar cada viaje, cumpliendo con los requisitos adicionales solicitados.



