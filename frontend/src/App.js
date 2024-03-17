import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
