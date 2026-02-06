import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthCont.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CadastroPet from "./pages/CadastroPet.jsx";
import Adocao from "./pages/Adocao.jsx";
import DetalhesPet from "./pages/DetalhesPet.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cadastro-pet" element={<CadastroPet />} />
          <Route path="/adocao" element={<Adocao />} />
          <Route path="/pet/:id" element={<DetalhesPet />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
