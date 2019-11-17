import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class Detalhes extends Component {

  state = {
    id: '',
    titulo: '',
    autor: '',
    descricao: '',
    paginas: '',
    foto: '',
    lance_nome: '',
    lance_email: '',
    lance_fone: '',
    lance_descricao: '',
    aviso: ''
  }

  componentDidMount() {
    // obtém os parâmetros passados para a classe
    const { match: { params } } = this.props

    const db = firebase.firestore()

    var docRef = db.collection("obras").doc(params.id);

    docRef.get().then(doc => {
      if (doc.exists) {
        this.setState({ id: doc.id, ...doc.data() })
      } else {
        // doc.data() will be undefined in this case
        console.log("Erro...");
      }
    }).catch(function (error) {
      console.log("Erro de conexão: ", error);
    });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()

    const lance = {
      nome: this.state.lance_nome,
      email: this.state.lance_email,
      fone: this.state.lance_fone,
      opiniao: this.state.lance_descricao
    }

    const db = firebase.firestore()

    try {
      db.collection('obras').doc(this.state.id)
        .collection('comentarios').add(lance)
      this.setState({aviso: 'Opinião cadastrada!'})  
    } catch (erro) {
      this.setState({aviso: 'Erro: '+erro})
    }
    this.tempoAviso()
  }

  tempoAviso = () => {
    setTimeout(() => {
      this.setState({aviso: ''})
    }, 5000)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-2">
            <div className="card">
              <img src={this.state.foto}
                className="card-img-top img-fluid"
                alt="Quadro" />
              <div className="card-body">
                <h4 className="card-title">
                  {this.state.titulo}</h4>
                <h6 className="card-title">Autor:
                  {this.state.autor}</h6>
                <p className="card-text">
                  {this.state.descricao}</p>
                <p className="card-text">
                  Páginas: {(this.state.paginas)}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            {/* <button className="btn btn-danger btn-lg btn-block">
              GOSTOU? DÊ UM LANCE!</button> */}
            <div className="card">
              <div className="card-body">
                {/* <h1 className="card-text">
                  Gostou do livro? Deixe sua opinião!
                </h1> */}
                <div className="alert alert-warning" role="alert">
                Gostou do livro? Deixe sua opinião!
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-user"> Nome</i>
                      </span>
                    </div>
                    <input type="text" className="form-control"
                      // placeholder="Nome Completo" 
                      name="lance_nome" 
                      onChange={this.handleChange}
                      value={this.state.lance_nome}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-at"> E-mail</i>
                      </span>
                    </div>
                    <input type="email" className="form-control"
                      // placeholder="E-mail para contato" 
                      name="lance_email" 
                      onChange={this.handleChange}
                      value={this.state.lance_email}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-phone"> Telefone</i>
                      </span>
                    </div>
                    <input type="text" className="form-control"
                      // placeholder="Telefone (com DDD)" 
                      name="lance_fone" 
                      onChange={this.handleChange}
                      value={this.state.lance_fone}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-align-justify"> Opinião</i>
                      </span>
                    </div>
                    <input type="text" 
                      className="form-control"
                      // placeholder="Oque achou do livro?" 
                      name="lance_descricao" 
                      onChange={this.handleChange}
                      value={this.state.lance_descricao}  
                      />
                  </div>
                  <input type="submit" className="btn btn-success float-right mt-3"
                    value="Enviar"/>
                  <Link to={'/'} className="btn btn-primary float-right mt-3">
                    Retornar
                  </Link>
                </form>
              </div>
            </div>
            {this.state.aviso !== '' ?
            <div className='alert alert-info mt-3'>
              {this.state.aviso}
            </div>
            : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
