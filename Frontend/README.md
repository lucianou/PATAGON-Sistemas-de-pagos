# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# README

## Introducción
Este repositorio está desarrollado para compilar en dos puertos diferentes, tanto el **Backend** como el **Frontend**. A continuación, se detalla la estructura del proyecto y los pasos necesarios para añadir nuevas funcionalidades.

## Estructura del Repositorio

### Frontend
El frontend está organizado de la siguiente manera:

```
Frontend
 ├── src
 │   ├── Pages
 │   │   ├── admin (Carpeta con archivos .jsx)
 │   │   ├── client (Carpeta con archivos .jsx)
 │   │   ├── //resto de archivos .jsx globales
 │   ├── Styles
 │   │   ├── admin (Carpeta con archivos .css)
 │   │   ├── client (Carpeta con archivos .css)
 │   │   ├── //resto de archivos .css globales
 └── app.jsx
```

#### .[!TIP].
> Para mantener la organización del proyecto, asegúrate de seguir la estructura definida al agregar nuevas páginas y estilos.

#### Pasos para Crear una Nueva Página
1. **Crear archivo `.jsx`**:
   - Crea un archivo `{name}.jsx` dentro de cualquier carpeta en `Pages`.
2. **Crear archivo `.css`**:
   - Crea un archivo `{name}.css` dentro de cualquier carpeta en `Styles`.
3. **Configurar rutas**:
   - Agrega la nueva página en `app.jsx` y define sus dependencias y rutas correspondientes.

### Backend
El backend está organizado de la siguiente forma:

```
Backend
 ├── src
 │   ├── controllers
 │   ├── middleware
 │   ├── data
 │   ├── models
```

#### .[!IMPORTANT].
> Cada carpeta del backend cumple una función específica:
>
> - **controllers**: Manejan la lógica de las rutas.
> - **middleware**: Contiene funciones de middleware para validaciones o procesamiento intermedio.
> - **data**: Maneja los datos o configuraciones estáticas.
> - **models**: Define los esquemas y modelos de base de datos.

## Endpoints
Los métodos y endpoints que maneja el backend son los siguientes:

### Autenticación y Registro
- `POST /login` - Valida la clave API y permite iniciar sesión.
- `POST /register` - Valida la clave API y registra un nuevo usuario.
- `POST /recoveryPassword` - Permite la recuperación de contraseña.
- `POST /newPass` - Establece una nueva contraseña.

### Tokens
- `POST /token/refresh` - Refresca el token de sesión.

### Visualización de Archivos
- `GET /viewPDF/:id` - Obtiene un PDF (requiere autenticación y autorización).
- `GET /viewPUB/:id` - Obtiene un archivo PUB (requiere autenticación y autorización).
- `GET /get-pub-key/:id` - Obtiene una clave pública (requiere autenticación y autorización).

### Productos
- `GET /get-products` - Lista todos los productos.
- `GET /get-product/:id` - Obtiene detalles de un producto por ID (requiere autenticación y autorización).
- `GET /get-time-remaining` - Obtiene el tiempo restante para una acción.

### Pagos
- `POST /create-payment` - Crea un pago.
- `GET /confirm-payment` - Confirma un pago.
- `GET /cancel-payment` - Cancela un pago.

#### .[!NOTE].
> Integra MercadoPago con los siguientes endpoints:
> - `POST /create-order` - Crea una orden.
> - `POST /webhook` - Maneja el webhook de MercadoPago.

### Boletas
- `GET /receipt/:orderId` - Obtiene la boleta de una orden.

### Solicitudes
- `GET /requests` - Obtiene las solicitudes (requiere autenticación y autorización).
- `POST /addRequest` - Añade una nueva solicitud con archivos adjuntos.

### Usuarios
- `GET /get-users-stats` - Obtiene estadísticas generales de usuarios.
- `GET /get-users-stats-week` - Obtiene estadísticas semanales de usuarios.
- `GET /get-users-stats-3months` - Obtiene estadísticas trimestrales de usuarios.
- `POST /insert-user-role` - Inserta un rol de usuario (requiere autenticación y autorización).
- `POST /new-user-creation` - Crea un nuevo usuario (requiere autenticación y autorización).
- `POST /deleted-user` - Elimina un usuario.
- `GET /users` - Lista todos los usuarios (requiere autenticación y autorización).
- `GET /get-admins-role` - Lista roles administrativos (requiere autenticación y autorización).
- `POST /delete-admins-roles` - Elimina roles administrativos.
- `POST /new-user-creation-patagon` - Crea un nuevo usuario en Patagón.
- `POST /reject-request` - Rechaza una solicitud.

### Transacciones
- `GET /get-total-gains` - Obtiene las ganancias totales.
- `GET /get-ingresos` - Obtiene los ingresos.
- `GET /get-ingreso-usuario` - Obtiene los ingresos de un usuario específico.
- `GET /dashboard-stats` - Obtiene estadísticas generales del dashboard.
- `GET /dashboard-stats-profit` - Obtiene estadísticas de ganancias en el dashboard.

### Otros
- `GET /` - Obtiene datos generales de Patagón (requiere autenticación).

## Notas Adicionales
- **Compilación en puertos distintos**:
  - Asegúrate de que tanto el frontend como el backend estén configurados para correr en puertos separados.
- **Estilo de Código**:
  - Sigue las convenciones de codificación establecidas para facilitar la colaboración y el mantenimiento.

#### .[!TIP].
> Revisa periódicamente los endpoints y su documentación para mantenerlos actualizados y claros para todos los desarrolladores del equipo.
