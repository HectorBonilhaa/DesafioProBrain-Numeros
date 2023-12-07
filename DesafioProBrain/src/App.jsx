import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import EvenOrOdd from "./pages/EvenOrOdd/evenOrOdd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evenOrOdd" element={<EvenOrOdd />} />
      </Routes>
    </Router>
  );
}

export default App;