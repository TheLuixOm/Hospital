# Configuración de correo para recuperación de contraseña

Para que la funcionalidad de recuperación de contraseña por correo funcione correctamente, debes configurar las credenciales de un correo real en el archivo `.env` en la carpeta `backend`.

Ejemplo de `.env`:

EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

**Importante:**
- Si usas Gmail, debes generar una contraseña de aplicación desde la configuración de seguridad de tu cuenta Google.
- No uses tu contraseña normal, solo la contraseña de aplicación.
- Si usas otro proveedor, ajusta la configuración de `nodemailer` en `recuperarContrasenaPaciente.js`.

Guarda el archivo `.env` y reinicia el servidor backend para que los cambios tengan efecto.

Si tienes problemas con el envío de correos, revisa los mensajes de error en la consola del backend.
