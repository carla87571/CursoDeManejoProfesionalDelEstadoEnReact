# Curso de Manejo Profesional del Estado en React

Proyecto de práctica para entender cómo funciona el estado en React con ejemplos de `useState`, componentes de clase y `useReducer`.

## Qué incluye

- Ejemplo de estado local con `useState`.
- Ejemplo con componente de clase y `setState`.
- Ejemplo de validación con `useReducer`.
- Caso práctico de transferencia bancaria con formulario, estados de carga, errores y confirmación por OTP.

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Scripts disponibles

- `npm start`: inicia la app en modo desarrollo.
- `npm test`: ejecuta los tests.
- `npm run build`: genera la versión de producción.

## Estructura principal

- [src/UseState.js](src/UseState.js): ejemplo de estado con hooks.
- [src/ClassState.js](src/ClassState.js): ejemplo equivalente con clase.
- [src/UseReducer.js](src/UseReducer.js): ejemplo con `useReducer`.
- [src/reducer-examples/BankTransferReducerExample.js](src/reducer-examples/BankTransferReducerExample.js): flujo completo de transferencia bancaria.

## Objetivo

Este proyecto reúne distintos patrones para comparar código imperativo y declarativo, y para practicar cómo modelar estados complejos en React.
