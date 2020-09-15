import React from 'react';
import './App.css';
import { gql } from '@apollo/client';

const MEDICOS = gql`
query getMedicos  { 
        doctors
  {
    id
    user{
      email
    }
  }
} 
`;

const SUBSCRIPTION = gql`
subscription novaSubscription {
  novaSubscription{
    id
    patientId
    status
    complaint
  }
}  `;

const subscriptionAtendimento = (client) => {
  client.subscribe({ query: SUBSCRIPTION }).subscribe(subs => {
    console.log(subs.data.novaSubscription);
  })

}

const queryMedicos = (client) => {
  client.query({ query: MEDICOS }).then(medicos => {
    console.log(medicos.data.doctors);
  })

}
const styleButton = {
  width: 100,
  height: 100,
  margin:"5px"
}
function App(props) {

  return (
    <div className="App">
      <button style={styleButton} onClick={() => { queryMedicos(props.client) }}> Retornar Médicos</button>
      <button style={styleButton} onClick={() => { subscriptionAtendimento(props.client) }}>Atendimento Subscription</button>
    </div>
  );
}

export default App;


