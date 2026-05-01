import "./App.css";
import ContextProvider from "./components/store/CtxProvider";
import Calculator from "./components/Calculator";
import Attribution from "./components/Attribution";

function App() {
  return (
    <ContextProvider>
      <Calculator />
      <Attribution />
    </ContextProvider>
  );
}

export default App;
