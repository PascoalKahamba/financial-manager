import CustomizedSnackbars from "./components/CustomizedSnackbars";
import { GlobalStorage } from "./components/GlobalStorage";
import Home from "./components/Home";

function App() {
  return (
    <GlobalStorage>
      <Home />
      <CustomizedSnackbars />
    </GlobalStorage>
  );
}

export default App;
