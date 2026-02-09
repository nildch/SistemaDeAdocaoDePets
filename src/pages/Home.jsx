import { useContext } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#fbfbfb", minHeight: "100vh" }}>
      <div className="container pt-5">

        
        {!user && (
          <div
            className="text-center p-5 shadow-sm border-0 mb-5"
            style={{ 
              backgroundColor: "#FFF3E0", 
              borderRadius: "30px",
              backgroundImage: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)"
            }}
          >
            <h1 className="display-4 fw-bold mb-3" style={{ color: "#FF6F00", letterSpacing: "-1px" }}>
              Dê um Lar! 🐾
            </h1>

            <p className="fs-5 mb-4 text-dark opacity-75 mx-auto" style={{ maxWidth: "600px" }}>
              Cadastre-se ou faça login para conhecer os pets disponíveis para adoção
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-lg btn-warning px-4 py-2 fw-bold shadow-sm"
                style={{ borderRadius: "12px" }}
                onClick={() => navigate("/register")}
              >
                CADASTRE-SE
              </button>

              <button
                className="btn btn-lg btn-outline-warning px-4 py-2 fw-bold"
                style={{ borderRadius: "12px", borderWidth: "2px" }}
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </div>
          </div>
        )}

      
        <div
          id="carouselHome"
          className="carousel slide mb-5 shadow-lg"
          data-bs-ride="carousel"
          style={{ borderRadius: "25px", overflow: "hidden", border: "8px solid white" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://placedog.net/1200/500?id=3"
                className="d-block w-100"
                alt="Pet 1"
                style={{ height: "450px", objectFit: "cover", filter: "brightness(0.8)" }}
              />
              <div className="carousel-caption d-none d-md-block text-start" style={{ left: "10%" }}>
                <h5 className="display-6 fw-bold">Amor que transforma</h5>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://placedog.net/1200/500?id=5"
                className="d-block w-100"
                alt="Pet 2"
                style={{ height: "450px", objectFit: "cover", filter: "brightness(0.8)" }}
              />
              <div className="carousel-caption d-none d-md-block text-start" style={{ left: "10%" }}>
                <h5 className="display-6 fw-bold">Um amigo para toda vida</h5>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://placedog.net/1200/500?id=4"
                className="d-block w-100"
                alt="Pet 3"
                style={{ height: "450px", objectFit: "cover", filter: "brightness(0.8)" }}
              />
              <div className="carousel-caption d-none d-md-block text-start" style={{ left: "10%" }}>
                <h5 className="display-6 fw-bold">Adotar é um ato de amor</h5>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
            <span className="carousel-control-prev-icon p-3 bg-dark rounded-circle" style={{ width: "15px", height: "15px" }}></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
            <span className="carousel-control-next-icon p-3 bg-dark rounded-circle" style={{ width: "15px", height: "15px" }}></span>
          </button>
        </div>

        <div className="pb-5">
          {user && user.role === "user" && (
            <div className="text-center p-4 bg-white shadow-sm rounded-4 border">
              <p className="text-muted mb-3 small fw-bold text-uppercase">Pronto para aumentar a família?</p>
              <button
                className="btn btn-lg btn-warning px-5 py-3 fw-bold shadow hover-grow"
                style={{ borderRadius: "15px" }}
                onClick={() => navigate("/adocao")}
              >
                ADOTE UM AMIGUINHO AGORA!
              </button>
            </div>
          )}

          {user && user.role === "admin" && (
            <div className="text-center p-4 bg-white shadow-sm rounded-4 border">
              <p className="text-muted mb-3 small fw-bold text-uppercase">Painel Administrativo</p>
              <button
                className="btn btn-lg btn-danger px-5 py-3 fw-bold shadow hover-grow"
                style={{ borderRadius: "15px" }}
                onClick={() => navigate("/adocao")}
              >
                Gerenciar Pets
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .hover-grow:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          transition: 0.3s ease;
        }
        .carousel-caption h5 {
          text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
}