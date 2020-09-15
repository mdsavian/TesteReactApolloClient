import React from 'react';

import './App.css';

import { useQuery, gql, useSubscription } from '@apollo/client';

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
  }
   
  
}
  `;
  
function App() {

  //  const { loading, error, data } = useQuery(MEDICOS);

  const { data, loading, error } = useSubscription(SUBSCRIPTION, {
    onSubscriptionData: c => {
      console.log(c);
    }
  });

  


  console.log(loading, data, error);

  return (
    <div className="App">
      <button style={{ width: 500, height: 300 }} />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;


