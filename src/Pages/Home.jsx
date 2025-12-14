import { useContext } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      {/* ================= USUÁRIO NÃO LOGADO ================= */}
      {!user && (
        <>
          <div
            className="text-center p-5 rounded mb-4"
            style={{ backgroundColor: "#FFF3E0" }}
          >
            <h1 className="fw-bold mb-3" style={{ color: "#FF6F00" }}>
              Dê um Lar! 🐾
            </h1>

            <p className="fs-5 mb-4">
              Cadastre-se ou faça login para conhecer os pets disponíveis para adoção
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-lg btn-warning"
                onClick={() => navigate("/register")}
              >
                CADASTRE-SE
              </button>

              <button
                className="btn btn-lg btn-outline-warning"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </div>
          </div>

          {/* CARROSSEL CHAMADA */}
          <div
            id="carouselHome"
            className="carousel slide mb-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner rounded">

              <div className="carousel-item active">
                <img
                  src="https://placedog.net/900/400?id=3"
                  className="d-block w-100"
                />
                <div className="carousel-caption">
                  <h5>Amor que transforma</h5>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://png.pngtree.com/background/20230528/original/pngtree-five-dogs-and-a-cat-together-on-a-black-background-picture-image_2777259.jpg"
                  className="d-block w-100"
                />
                <div className="carousel-caption">
                  <h5>Um amigo para toda vida</h5>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://placedog.net/900/400?id=4"
                  className="d-block w-100"
                />
                <div className="carousel-caption">
                  <h5>Adotar é um ato de amor</h5>
                </div>
              </div>

            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselHome"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselHome"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </>
      )}

      {/* ================= USUÁRIO LOGADO ================= */}
      {user && (
        <>
          <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
            Pets em Destaque 💛
          </h2>

          <div
            id="petsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner rounded">

              <div className="carousel-item active">
                <img
                  src="https://s2-g1.glbimg.com/dXjuFl4QYkkfy9yySOyfUAHF-50=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/3/H/Ztg9DnSreAl1P1Xjxm5Q/feira-pet.jpg"
                  className="d-block w-100"
                  alt="Pet 1"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Rex</h5>
                  <p>Carinhoso e cheio de energia</p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://procao.ind.br/wp-content/uploads/2019/04/filhote-de-cachorro-veja-dicas-para-adotar-o-seu-1000x500.jpg"
                  className="d-block w-100"
                  alt="Pet 2"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Filhotes de Cachorro</h5>
                  <p>Companhia é tudo!</p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://www.petshoprj.com.br/blog/wp-content/uploads/2014/05/Como-adotar-um-gatinho-700x352.jpg"
                  className="d-block w-100"
                  alt="Pet 3"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Filhotes</h5>
                  <p>Gato</p>
                </div>
              </div>

            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#petsCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#petsCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-lg btn-warning"
              onClick={() => navigate("/pets")}
            >
              ADOTE UM AMIGUINHO AGORA!
            </button>
          </div>
        </>
      )}

    </div>
  );
}
