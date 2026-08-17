import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recetas from "./pages/Recetas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recetas />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
