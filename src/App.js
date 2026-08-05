import { UseState } from './UseState';
import { UseReducer } from './UseReducer';
import { BankTransferReducerExample } from './reducer-examples/BankTransferReducerExample';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
      <BankTransferReducerExample />
    </div>
  );
}

export default App;
