import React, { useState } from "react";
import axios from "axios";
import * as S from './styled'
import { useNavigate } from 'react-router-dom';

function App(props) {
  const navigate = useNavigate();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro] = useState(false);
  
  function handldePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        navigate('/repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className='usuarioInput' placeholder='Usuário' value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handldePesquisa}> Pesquisar </S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg> Ocorreu um erro. Tente novamente. </S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}


export default App;