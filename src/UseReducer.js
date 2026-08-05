import React from "react";
import "./UseReducer.css";




function UseReducer({name}){

    const [state, dispatch] = React.useReducer(reducer, initialState)
    console.log(state)
    const SECURITY_CODE = 'paradigma';

    React.useEffect(()=>{
        if(state.loading){
            setTimeout(()=>{
                if(state.value !== SECURITY_CODE){
                    dispatch({type: actionTypes.error})   
                }else{
                    dispatch({type: actionTypes.confirm})             
                }

            }, 2000)
        }
    }, [state.loading, state.value]);

    if(!state.confirmed){

        return(
            <div className="box">
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
    
            {state.error && !state.loading && (
                <p>El código es incorrecto</p>
            )}
    
            {state.loading && (
                <p>Cargando...</p>
            )}
    
            {/*!loading && !error && (
                <p>El codigo de seguridad es correcto!</p>
            )*/}
    
            <input value={state.value} onChange={(e)=>{dispatch({type: actionTypes.write, payload: e.target.value})}} type="text" placeholder="Código de seguridad"/>
            <button onClick={()=>dispatch({type: actionTypes.check})}>Comprobar</button>
        </div>
        )

    } else if (!state.deleted && state.confirmed) {

        return(
            <div className="box">
                <h3>¿Seguro que quieres eliminar UseReducer?</h3>
                <button className="btn" onClick={()=>dispatch({type: actionTypes.delete})}>Confirmar</button>
                <button className="btn" onClick={()=>dispatch({type: actionTypes.reset})}>Cancelar</button>
            </div>
        )

    } else {

        return(
            <div className="box">
                <h3>El codigo fue eliminado con exito.</h3>
                <button className="btn" onClick={()=>dispatch({type: actionTypes.reset})}>Volver atras</button>
            </div>
        )
    }

}

const initialState = {
    value: '',
    loading: false,
    error: false,
    confirmed: false,
    deleted: false
}

const actionTypes = {
    error: 'ERROR',
    check: 'CHECK',
    confirm: 'CONFIRM',
    reset: 'RESET',
    delete: 'DELETE',
    write: 'WRITE',
}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: true,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        confirmed: true
    },
    [actionTypes.reset]: initialState,
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    }
});

const reducer = (state, action) => {

    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    }else{
        return state;
    }
}

export { UseReducer }