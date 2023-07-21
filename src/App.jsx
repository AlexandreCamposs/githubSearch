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

  async function UrlGit() {
    const response = await fetch(`https://api.github.com/users/${name}`);
    console.log(response);
    const data = await response.json();
    setUser(data);
    console.log(data);
    setShowModal(true);
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
        {errorSearch && (
          <div className="invalid">
            <h2>Preencha o campo acima!</h2>
          </div>
        )}
      </div>
      {showModal && <Modal user={user} closeModal={closeModal} />}
    </main>
  );
}

export default App;
