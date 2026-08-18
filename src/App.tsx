import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recetas from "./pages/Recetas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DetalleReceta from "./pages/DetalleReceta";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import CrearReceta from "./pages/CrearReceta";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/recetas/:id" element={<DetalleReceta />} />
          <Route path="/crear-receta" element={<CrearReceta />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
