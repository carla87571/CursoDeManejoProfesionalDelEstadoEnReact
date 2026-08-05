import React from "react";
import "./BankTransferReducerExample.css";

const initialState = {
  form: {
    toAccount: "",
    amount: "",
    concept: "",
    otp: "",
  },
  balance: 1500,
  step: "EDIT", // Possible values: "EDIT", "OTP", "SUCCESS", "ERROR"
  loading: false,
  error: null,
  transactionId: null,
};

const actionTypes = {
  writeField: "WRITE_FIELD",
  submitTransfer: "SUBMIT_TRANSFER",
  transferSuccess: "TRANSFER_SUCCESS",
  transferError: "TRANSFER_ERROR",
  writeOtp: "WRITE_OTP",
  confirmOtpRequest: "CONFIRM_OTP_REQUEST",
  confirmOtpSuccess: "CONFIRM_OTP_SUCCESS",
  confirmOtpError: "CONFIRM_OTP_ERROR",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.writeField]: {
    ...state,
    form: {
      ...state.form,
      [payload.field]: payload.value,
    },
    error: null,
  },
  [actionTypes.submitTransfer]: {
    ...state,
    loading: true,
    error: null,
  },
  [actionTypes.transferSuccess]: {
    ...state,
    loading: false,
    step: "OTP",
    transactionId: payload.transactionId,
  },
  [actionTypes.transferError]: {
    ...state,
    loading: false,
    step: "EDIT",
    error: payload,
  },
  [actionTypes.writeOtp]: {
    ...state,
    form: {
      ...state.form,
      otp: payload,
    },
    error: null,
  },
  [actionTypes.confirmOtpRequest]: {
    ...state,
    loading: true,
    error: null,
  },
  [actionTypes.confirmOtpSuccess]: {
    ...state,
    loading: false,
    step: "SUCCESS",
    balance: state.balance - Number(state.form.amount || 0),
  },
  [actionTypes.confirmOtpError]: {
    ...state,
    loading: false,
    error: payload,
  },
  [actionTypes.reset]: initialState,
});

const reducer = (state, action) => {
  const transitions = reducerObject(state, action.payload);
  return transitions[action.type] || state;
};


// API Simulada
const fakeTransferApi = ({ toAccount, amount }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const parsedAmount = Number(amount);

      if (!toAccount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        reject("Completa una cuenta destino y un monto valido.");
      } else if (parsedAmount > 1000) {
        reject("Saldo insuficiente para esta transferencia.");
      } else {
        resolve({ transactionId: "TX-2026-001" });
      }
    }, 1000);
  });

const fakeConfirmOtpApi = (otp) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve(true);
      } else {
        reject("OTP incorrecto. Prueba con 123456 para este ejemplo.");
      }
    }, 1000);
  });

function BankTransferReducerExample() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onWriteField = (field, value) => {
    dispatch({
      type: actionTypes.writeField,
      payload: { field, value },
    });
  };

  const onSubmitTransfer = async (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.submitTransfer });

    try {
      const response = await fakeTransferApi({
        toAccount: state.form.toAccount,
        amount: state.form.amount,
      });

      dispatch({
        type: actionTypes.transferSuccess,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.transferError,
        payload: String(error),
      });
    }
  };

  const onConfirmOtp = async () => {
    dispatch({ type: actionTypes.confirmOtpRequest });

    try {
      await fakeConfirmOtpApi(state.form.otp);
      dispatch({ type: actionTypes.confirmOtpSuccess });
    } catch (error) {
      dispatch({
        type: actionTypes.confirmOtpError,
        payload: String(error),
      });
    }
  };

  return (
    <section className="bank-example-box">
      <h2>Ejemplo real con useReducer: Transferencia bancaria</h2>
      <p className="balance">Saldo disponible: ${state.balance}</p>

      {state.step === "EDIT" && (
        <form className="bank-form" onSubmit={onSubmitTransfer}>
          <input
            type="text"
            placeholder="Cuenta destino"
            value={state.form.toAccount}
            onChange={(e) => onWriteField("toAccount", e.target.value)}
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Monto"
            value={state.form.amount}
            onChange={(e) => onWriteField("amount", e.target.value)}
          />
          <input
            type="text"
            placeholder="Concepto"
            value={state.form.concept}
            onChange={(e) => onWriteField("concept", e.target.value)}
          />
          <button type="submit" disabled={state.loading}>
            {state.loading ? "Validando transferencia..." : "Continuar"}
          </button>
        </form>
      )}

      {state.step === "OTP" && (
        <div className="otp-box">
          <p>Transferencia creada: {state.transactionId}</p>
          <p>Ingresa tu OTP para confirmar (demo: 123456)</p>
          <input
            type="text"
            placeholder="Codigo OTP"
            value={state.form.otp}
            onChange={(e) => dispatch({ type: actionTypes.writeOtp, payload: e.target.value })}
          />
          <button onClick={onConfirmOtp} disabled={state.loading}>
            {state.loading ? "Confirmando OTP..." : "Confirmar transferencia"}
          </button>
        </div>
      )}

      {state.step === "SUCCESS" && (
        <div className="success-box">
          <h3>Transferencia confirmada con exito</h3>
          <p>Cuenta destino: {state.form.toAccount}</p>
          <p>Monto transferido: ${state.form.amount}</p>
          <button onClick={() => dispatch({ type: actionTypes.reset })}>
            Nueva transferencia
          </button>
        </div>
      )}

      {state.error && <p className="error-text">{state.error}</p>}
    </section>
  );
}

export { BankTransferReducerExample };
