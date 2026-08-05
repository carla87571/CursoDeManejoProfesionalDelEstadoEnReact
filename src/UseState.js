import React from "react";

const SECURITY_CODE = "paradigma";
const INITIAL_STATE = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

function UseState( { name}) {

    const [state, setState] = React.useState(INITIAL_STATE);

    const onConfirm = React.useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            value: '',
            error: false,
            loading: false,
            confirmed: true,
        }));
    }, []);

    const onError = React.useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            loading: false,
            error: true,
        }));
    }, []);

    const onWrite = React.useCallback((newValue) => {
        setState((prevState) => ({
            ...prevState,
            value: newValue,
        }));
    }, []);

    const onCheck = React.useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
            error: false,
        }));
    }, []);

    const onDelete = React.useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            deleted: true,
        }));
    }, []);

    const onReset = React.useCallback(() => {
        setState({ ...INITIAL_STATE });
    }, []);
    

    console.log(state.value);

    React.useEffect(() => {

            console.log("Empezando el efecto");

            if (!state.loading) {
                console.log("Terminando el efecto");
                return;
            }

            const timeoutId = setTimeout(() => {
                console.log("Haciendo la validación");

                const isValid = state.value === SECURITY_CODE;

                if (isValid) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log("Terminando la validación");
            }, 3000);
                
            console.log("Terminando el efecto");

            return () => clearTimeout(timeoutId);
            }, [state.loading, state.value, onConfirm, onError]);

    if (!state.deleted && !state.confirmed) {

        
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, introducir el código de seguridad</p>

                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input 
                    placeholder="Código de seguridad" 
                    value={state.value}
                    onChange={(e) => {
                        onWrite(e.target.value);
                    }}
                />
                <button 
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estás seguro?</p>
                <button
                    onClick={() => {
                        onDelete();
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >No, cancelar</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >Resetear volver atrás</button>
            </React.Fragment>
        );
    }
}

export { UseState };