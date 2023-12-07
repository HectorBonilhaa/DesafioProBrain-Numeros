import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import EvenOrOdd from "./pages/EvenOrOdd/evenOrOdd";
import PrimeNumber from "./pages/PrimeNumber/primeNumber";
import Fibonacci from "./pages/FibonacciSequence/fibonacci";
import FourPin from "./pages/FourPin/fourPin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evenOrOdd" element={<EvenOrOdd />} />
        <Route path="/primeNumber" element={<PrimeNumber />} />
        <Route path="/fibonacci" element={<Fibonacci />} />
        <Route path="/fourPin" element={<FourPin />} />
      </Routes>
    </Router>
  );
}

export default App;