import React, { Component } from 'react';
import './App.css';
import PokemonList from './Components/PokemonList';
import PokemonInfo from './Components/Pokeinfo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      do_search: false,
      selected_pokemon: undefined
    };
  }

  onsearch = (value) => {
    if(value === "search" || value.onKeyDown === 13) {
      this.setState({ do_search: true })
    }
  }

  searchChange = (value) => {
    this.setState({search: value.target.value, do_search: false})
  }

  selectPokemon = (pokemon) => {
    this.setState({selected_pokemon: pokemon})
  }

  render() {

    let pokelist = <PokemonList clear={true} selected={this.selectPokemon}/>
    if(this.state.do_search){
      pokelist = <PokemonList data={this.state.search} do_search={this.state.do_search} selected={this.selectPokemon} />
    }

    let pokemoninfo = <></>
    if(this.state.selected_pokemon !== undefined){
        pokemoninfo = <PokemonInfo data={this.state.selected_pokemon}/>
    }

    return (
      <div className="App">
        <div className="container">
        <table style={{width: '100%'}}>
          <tr>
            <td className="title-text">
              <img className="title-img" src={'Pokemon_logo.svg'} alt="Pokemon" />
              <span>Pokedex</span>
            </td>
            <td>
              <img style={{float:'right'}} src={'Search_2384.png'} alt='search' onClick={e=>this.onsearch("search")}></img>
              <input className="input" type="text" style={{float:'right'}} placeholder="Search..." value={this.state.search.toUpperCase()} onChange={e => this.searchChange(e)} onKeyDown={this.onsearch} ></input>
            </td>
          </tr>
        </table>
          <div className="title-text">
              
              
          </div>
            {pokelist}
        </div>
        <div className="pokemon-container" style={{float:'right'}}>
          {pokemoninfo}
        </div>
         
      </div>
    );
  }
}


export default App;