import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { ClientsContext } from '../../contexts/ClientsContext';
import './style.scss';
import ClientsCard from '../components/ClientCard';
import { IClients } from '../../interfaces/Interfaces';
import { Spinner } from 'react-bootstrap';

const Home = () => {
  const { getClients, clients, reload, loading } = useContext(ClientsContext);

  const [search, setSearch] = useState('');
  const [allClients, setAllClients] = useState([]);

  const searchLower = search
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filter = clients.filter((item: IClients) =>
    item.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(searchLower)
  );

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    setAllClients(clients);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients]);

  useEffect(() => {
    setAllClients(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLower]);

  useEffect(() => {
    setSearch('');
  }, [clients]);

  return (
    <main className="clients-container">
      <Header />
      <div className="container">
        <h1 className="text-center pt-5 mb-5 text-white">Meus Clientes</h1>
        <div className="d-flex justify-content-center w-100">
          <input
            type="text"
            value={search}
            placeholder="Pesquisar por nome..."
            onChange={(e) => setSearch(e.target.value)}
            className="input-search  w-75 p-3 mb-5"
          />
        </div>
        {!loading ? (
          allClients.length > 0 ? (
            allClients.map((client: IClients) => (
              <ClientsCard key={client.id} client={client} />
            ))
          ) : (
            <h2 className="text-center text-white mt-5 pt-5">
              Nenhum Resultado Encontrado
            </h2>
          )
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="dark" />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
