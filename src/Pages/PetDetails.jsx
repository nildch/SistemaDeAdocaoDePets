// Importe useParams para testar o parâmetro da rota
import { useParams } from 'react-router-dom';

export default function PetDetails() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Detalhes do Pet #{id}</h1>
      <p>Aqui serão mostradas as informações detalhadas e o botão de Candidatura.</p>
    </div>
  );
}