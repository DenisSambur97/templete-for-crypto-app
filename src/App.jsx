import React from 'react';
import CryptoContextProvider from "./context/crypto-context";
import LayoutApp from "./components/layout/Layout";

export default function App() {
  return (
      <CryptoContextProvider>
        <LayoutApp/>
      </CryptoContextProvider>
  )
}
