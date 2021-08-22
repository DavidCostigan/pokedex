import React, { Component } from 'react';
import Pokemon from './Pokemon';

// Class that holds the table view
class PokemonList extends Component {
  constructor() {
      super();
      this.state = {
        loaded: false,
        pokemon: [],
        search: "",
        seleced_pokemon: {}
      };
  }

  componentDidMount() {
    this.getPokemonList()
  }

  // Returns a list of Pokemon name and API
  getPokemonList = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => response.json())
      .then(data => {
          this.getPokemon(data.results);
      })
  }

  getSearchResult = (pokemon) => {
    console.log(pokemon);
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase())
      .then(response => response.json())
      .then(data => {
        console.log(data);
          this.getSearchedPokemon(data);
      })
  }

  getSearchedPokemon = (data) => {
    let pokemonResults = [];
    let pokemon = {
      name: data.name,
      abilities: data.abilities,
      height: data.height,
      weight: data.weight,
      order: data.id,
      moves: data.moves.count,
      stats: data.stats,
      types: data.types,
      sprite: data.sprites.front_default
    }
    pokemonResults.push(pokemon)
        this.setState({ pokemon: pokemonResults });
  }

  // loops through and calls each api
  getPokemon = (pokedata) => {
    let pokemonResults = [];
      pokedata.forEach(pokemon => {
        fetch(pokemon.url).then( response => response.json())
        .then(data => {
          console.log(data.moves.length);
          // Creates the Pokemon object
          let pokemon = {
            name: data.name,
            abilities: data.abilities,
            height: data.height,
            weight: data.weight,
            order: data.id,
            moves: data.moves.length,
            stats: data.stats,
            types: data.types,
            sprite: data.sprites.front_default
          }

          pokemonResults.push(pokemon);

          // Quick sort method to order by "Order" number
          pokemonResults.sort(function(a, b){return a.order - b.order});

          this.setState({ pokemon: pokemonResults, loaded: true });
        })
      })
  }

  pokemonSelected = (pokemon) => {
      this.props.selected(pokemon);
      this.setState({selected_pokemon: pokemon})
  }
  
  render() {
    // Does a search based in info in search field
    if(this.props.data !== undefined && this.props.data !== "" && this.props.data !== this.state.search){
        this.setState({ search: this.props.data });
        this.getSearchResult(this.props.data);
    }

    // Resets the search if nothing is in search field
    if(this.props.clear && this.state.search !== ""){
        this.setState({ search: "" });
        this.getPokemonList();
    }

    
    let pokemon = this.state.pokemon.map((pokemon, key) => {
        return <Pokemon key={key} data={pokemon} selected={this.pokemonSelected} selected_pokemon={this.state.selected_pokemon}></Pokemon>
    })
      return (
          <div className="pokemon-list">
            {pokemon}
          </div>
      )
  }

}

export default PokemonList;