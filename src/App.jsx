import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthCont.jsx";
import DetalhesPet from "./Pages/DetalhesPet.jsx";




import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import CadastroPet from "./Pages/CadastroPet.jsx";
import Adocao from "./Pages/Adocao.jsx";
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
