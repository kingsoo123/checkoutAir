import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Result from "./Result";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
