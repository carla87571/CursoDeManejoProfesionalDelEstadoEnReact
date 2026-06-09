import { UseState } from './UseState';
import { ClassState } from './ClassState';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
