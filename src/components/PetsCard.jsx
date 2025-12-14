import { Link } from "react-router-dom";

export default function PetsCard({ pet }) {
  const isDog = pet.especie === 'Cachorro';
  const tagColor = isDog ? '#0066ff' : '#ff7a00';

  return (
    // O card é um Link que leva para a página de detalhes do pet (ex: /pets/1)
    <Link to={`/pets/${pet.id}`} style={styles.cardLink}>
      <div style={styles.card}>
        <img src={pet.fotoUrl} alt={`Foto de ${pet.nome}`} style={styles.image} />
        
        <div style={styles.info}>
          <h4 style={styles.name}>{pet.nome}</h4>
          <span style={{ ...styles.tag, backgroundColor: tagColor }}>
            {pet.especie}
          </span>
          <p style={styles.details}>{pet.idade}, {pet.porte}</p>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    flexShrink: 0, 
    width: 250, 
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
  info: {
    padding: 15,
    textAlign: 'left',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tag: {
    fontSize: 12,
    color: '#fff',
    padding: '3px 8px',
    borderRadius: 5,
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#777',
  }
};