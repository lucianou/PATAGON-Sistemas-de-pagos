# PATAGÓN - Sistemas de pagos


## Endpoints


1. POST `http://localhost:3004/api/command/login`: Envía correo y contraseña, devuelve token
2. POST `http://localhost:3004/api/command/register`: Envía correo, username, y contraseña para registro
3. POST `http://localhost:3004/api/command/new-user-creation`: Admin registra nuevo usuario, aceptado en solicitud para uso de Patagón
4. POST `http://localhost:3004/api/command/send-email`: Correo de solicitud aceptada/rechazada a cliente
