//ALUNOS: LUCAS FERREIRA VERÃO E RAY POLONI


import './App.css';
import {Component} from 'react';
import { Busca } from './components/Busca';
import { Lista } from './components/Lista';
import { Cabecalho } from './components/Cabecalho';
import { Rodape } from './components/Rodape';
import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';

export default function App() {
  const [busca, setBusca] = useState('');
  const [odas, setOdas] = useState([]);
 
  useEffect(()=> {
    carregaODAS();
    document.title = 'API - Bocaweb'
  })
 
  const carregaODAS = async () => {
    fetch('https://www.bocaweb.com.br/apibocaweb?nome='+busca)
    .then(response => response.json())
    .then(odas => setOdas(odas))
  };
 
  const buscaODA = (evento) => {
    setBusca(evento.target.value)
    carregaODAS();
  };


  const meta = {
    title: "BocaWebFront",
    description: "n/a ideais",
    meta: {
      charset: "utf-8",
      name: {
        viewport: "width=device-width, scale=1"
      }
    }
  }

  return(

      <DocumentMeta {...meta}>
      
        <section className = "container">

          <Cabecalho />

          <Busca 
          
            busca={busca}
            buscaODA={buscaODA}

          />

          <div className = 'lista'> 
              <p className="lengthODAS"> {odas.length} odas </p>
              {odas.map(oda => (
                <Lista
                  key = {oda._id}
                  nome = {oda.nome} 
                  usuario = {oda.usuario} 
                  descricao = {oda.descricao} 
                  data_inclusao = {oda.data_inclusao}
                  palavras_chave = {oda.palavras_chave}
                />
              ))}
          </div>

          <Rodape />      
          

        </section>

      </DocumentMeta>

    )
}

