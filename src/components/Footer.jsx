export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div>
        <p>Email: contato@patinhasfelizes.org</p>
        <p>WhatsApp: (83) 90000-0000</p>
        <p>Atendimento: Seg a Sex • 08h às 17h</p>
      </div>

      <div style={styles.copy}>
        © 2025 Centro de Adoção Patinhas Felizes. Todos os direitos reservados.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#F7F7F7",
    padding: 25,
    textAlign: "center",
    borderTop: "1px solid #ddd",
  },
  copy: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
};
