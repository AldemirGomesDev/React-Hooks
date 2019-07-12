import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  //executado uma vez assim que o componente é carregado
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/aldemirgomes/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  //executado toda vez que o repositories é alterado
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`;

  }, [repositories]);

  //adicionar favoritos
  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <strong>(favorito)</strong>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}

