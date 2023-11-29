# alertas-tempranas

Aplicación que permite la detección temprana de alumnos con altas probabilidades de abandonar su educación.

# Cambiar la configuracion de la base de datos:

Path: alertas-tempranas\server\config\config.json
-Cambiar el username y password de acuerdo a la configuracion del Postgres de la maquina local.

# Pasos para hacer correr el proyecto:

- Tener instalado node (la version del proyecto es v20.9.0)
- Dentro del proyecto (root) en la terminal correr los siguientes comandos:

# Para instalar las dependencias (estando en el root)(Obs: Tarda un poco):

npm run install-all

# Para iniciar tanto el cliente como el servidor (estando en el root):

npm run start-all

# Para cargar los registros iniciales, abrir una terminal nueva en el root y ejecutar:

npm run setup-server
