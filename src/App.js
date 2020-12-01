import React from "react";
import ChirpList from "./components/ChirpList";
import ChirpForm from './components/ChirpForm';
import ChirpContextProvider from "./contexts/ChirpContext";


function App() {
  return (
    <div className="App main container-lg">
      <ChirpContextProvider>
        <ChirpForm />
        <ChirpList />
      </ChirpContextProvider>
    </div>
  );
}

export default App;
