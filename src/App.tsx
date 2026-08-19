import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recetas from "./pages/Recetas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DetalleReceta from "./pages/DetalleReceta";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import CrearReceta from "./pages/CrearReceta";
import ProtectedRoute from "./components/ProtectedRoute";
import { Registro } from "./pages/Registro";
import VerificarEmail from "./pages/VerificarEmail";
import EditarReceta from "./pages/EditarReceta";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/recetas/:id" element={<DetalleReceta />} />
          

          <Route element={<ProtectedRoute />}>
            <Route path="/crear-receta" element={<CrearReceta />} />
            <Route path="/recetas/editar/:id" element={<EditarReceta />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/verificar-email" element={<VerificarEmail />} />
          
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
