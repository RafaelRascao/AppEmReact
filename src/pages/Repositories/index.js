import React, { useEffect, useState } from "react";
import * as S from './styled';
import { useNavigate } from "react-router-dom";

export default function Repositories() {
    const navigate = useNavigate();
    const [ repositories, setRepositories ] = useState([]);

    useEffect(() => {
        let repositoriesName = localStorage.getItem('repositoriesName');
        if(repositoriesName !== null) {
            repositoriesName = JSON.parse(repositoriesName);
            setRepositories(repositoriesName);
            // localStorage.clear();
        } else {
            navigate('/')        
        }
    }, [navigate]);

    return (
        <S.Container>
            <S.Tilte>Repositórios</S.Tilte>
            <S.List>
                { repositories.map(repository => {
                    return (
                        <S.listItem>Repositório: { repository } </S.listItem>
                    )
                }) }
            </S.List>
            <S.LinkHome to="/"> Voltar </S.LinkHome>     
        </S.Container>
    )
}