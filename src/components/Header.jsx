import { useContext } from "react";
import { AuthContext } from "../context/AuthCont.jsx";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>🐾 Patinhas Felizes</h2>

      <div>
        {user ? (
          <>
            <span>Olá, {user.name}</span>
            <button onClick={logout} style={styles.btn}>Sair</button>
          </>
        ) : (
          <span>Olá, visitante</span>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    background: "#FF6F00",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  btn: {
    marginLeft: "10px"
  }
};
