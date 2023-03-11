import "./App.css";
import { GlobalStorage } from "./components/GlobalStorage";
import Home from "./components/Home";

function App() {
  return (
    <GlobalStorage>
      <Home />
    </GlobalStorage>
  );
}

export default App;
