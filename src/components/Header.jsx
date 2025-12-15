import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthCont.jsx";



export default function Header() {
  const { user, logout } = useContext(AuthContext);
  

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          🐾 Patinhas Felizes
        </Link>
      </h2>

      <nav style={styles.nav}>
        {user?.role === "admin" && (
          <Link to="/cadastro-pet" style={styles.link}>
            Cadastrar Pet
          </Link>
        )}

        {user ? (
          <>
            <span>Olá, {user.name}</span>
            <button onClick={logout} style={styles.btn}>
              Sair
            </button>
          </>
        ) : (
          <>
            {/* 👇 ADIÇÃO (não remove nada) */}
            <span>Olá, visitante</span>

            <Link to="/login" style={styles.link}>
              Entrar
            </Link>
            <Link to="/register" style={styles.link}>
              Cadastrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}



const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "#FF6F00",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  },
  btn: {
    marginLeft: "10px",
    padding: "6px 12px",
    cursor: "pointer"
  }
};
