import { useState } from 'react';
import { FaHandPeace, FaSearch } from 'react-icons/fa';
import { GrGithub } from 'react-icons/gr';
import './App.css';

import Modal from './components/Modall';

function App() {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  async function UrlGit() {
    try {
      const response = await fetch(`https://api.github.com/users/${name}`);

      if (response.status !== 200) {
        throw new Error('Usuário não encontrado');
      }
      const data = await response.json();
      setUser(data);
      setShowModal(true);
    } catch (error) {
      setErrorApi(error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== '') {
      UrlGit();
      setErrorSearch(false);
    } else {
      setErrorSearch(true);
    }
    setName('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <div className="container">
        <div className="description">
          <h1>
            Olá, <FaHandPeace /> sejá bem vindo!
          </h1>
          <p>
            No campo abaixo, insira o nome da conta do Github <GrGithub /> que
            deseja buscar informações.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="search">
          <input
            type="text"
            placeholder="Digite o usuário do GitHub"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit">
            Search <FaSearch />
          </button>
        </form>
        {errorApi && !errorSearch && (
          <div className="invalid">
            <h2>Usuário não encontrado</h2>
          </div>
        )}
        {errorSearch && !errorApi && (
          <div className="invalid">
            <h2>Preencha o campo acima!</h2>
          </div>
        )}
      </div>
      {showModal && !errorApi && !errorSearch && (
        <Modal user={user} closeModal={closeModal} />
      )}
    </main>
  );
}

export default App;
