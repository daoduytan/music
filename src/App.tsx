import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "./api";
import { ProviderAudioContext } from "./context";
import { Routes } from "./routes";

function App() {
  return (
    <ApolloProvider client={client}>
      <ProviderAudioContext>
        <Routes />
      </ProviderAudioContext>
    </ApolloProvider>
  );
}

export default App;
