import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recetas from "./pages/Recetas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DetalleReceta from "./pages/DetalleReceta";

function App() {
  return (
    <BrowserRouter>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route
          path="/recetas/:id"
          element={<DetalleReceta />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
