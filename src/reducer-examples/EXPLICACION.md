# Ejemplo de useReducer aplicado a una app bancaria

Este ejemplo simula una transferencia bancaria en 3 pasos:

1. Paso EDIT: el usuario llena cuenta destino, monto y concepto.
2. Paso OTP: si la validacion inicial pasa, se solicita OTP.
3. Paso SUCCESS: si el OTP es correcto, la transferencia se confirma.

## Por que useReducer aqui

En una transferencia hay varios estados relacionados al mismo tiempo:

- Datos del formulario.
- Estado de carga (`loading`).
- Flujo por pasos (`step`).
- Mensajes de error.
- Resultado final de transaccion.

Con `useState` esto puede dispersarse en muchos `setState`. Con `useReducer` se centraliza la logica en acciones y transiciones.

## Acciones principales

- `WRITE_FIELD`: actualiza campos del formulario.
- `SUBMIT_TRANSFER`: inicia validacion.
- `TRANSFER_SUCCESS`: avanza a OTP.
- `TRANSFER_ERROR`: muestra error de validacion.
- `WRITE_OTP`: actualiza OTP.
- `CONFIRM_OTP_REQUEST`: inicia confirmacion OTP.
- `CONFIRM_OTP_SUCCESS`: completa transferencia y descuenta saldo.
- `CONFIRM_OTP_ERROR`: muestra error OTP.
- `RESET`: vuelve al estado inicial.

## Flujo mental

- El usuario no cambia el estado directamente.
- El usuario dispara eventos con `dispatch`.
- El reducer decide el nuevo estado de forma declarativa.
- Cada accion representa un hecho del negocio.

## Datos de prueba

- OTP valido en el ejemplo: `123456`.
- Si el monto es mayor a 1000, el ejemplo simula saldo insuficiente.
