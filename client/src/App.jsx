import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEntry from "./components/CodeEntry";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEntry />} />
        <Route path="/dashboard/:code" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
