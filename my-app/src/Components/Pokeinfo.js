import React, { Component } from 'react';

// Pokemon Class That has the sprite and quick details
class PokemonInfo extends Component {
    constructor() {
        super();
        this.state = {};
    }

    getColour = (type) => {
        switch(type) {
            case "bug":
                return '#A8B820';
            case "dark":
                return '#705848';
            case "dragon":
                return '#7038F8';
            case "electric":
                return '#F8D030';
            case "fairy":
                return '#EE99AC';
            case "fighting":
                return '#C03028';
            case "fire":
                return '#F08030';
            case "flying":
                return '#A890F0';
            case "ghost":
                return '#705898';
            case "grass":
                return '#78C850';
            case "ground":
                return '#E0C068';
            case "ice":
                return '#98D8D8';
            case "normal":
                return '#A8A878';
            case "poison":
                return '#A040A0';
            case "psychic":
                return '#F85888';
            case "Rock":
                return '#B8A038';
            case "steel":
                return '#B8B8D0';
            case "water":
                return '#6890F0';
            default:
                return;
        }
    }

    sortTypes = () => {
        let types = this.props.data.types;
        return types.map(type => {
            let colour = this.getColour(type.type.name);
            let text = type.type.name;
            return <span className="tag-type" style={{backgroundColor: colour}}>{text.toUpperCase()}</span>
                    
        })
        
    }

    // Goes through API response and gets the name and base stats
    getStats = () => {
        let stats = this.props.data.stats;
        return stats.map(stat => {
            return <p >{stat.stat.name} {stat.base_stat}</p>
        })
    }

    // Goes through the JSOn and generates the abilities
    getAbilities = () => {
        console.log(this.props.data)
        let abilities = this.props.data.abilities;
        return abilities.map(ability => {
            return <span>{ability.ability.name}, </span>
        })
    }

    // Displays all the information about the pokemon
    render() {
        let indexNumber = "#00" + this.props.data.order;
        let types = this.sortTypes();
        return (
                <table onClick={this.loadPokemon}>
                    <tr>
                        <td >
                            <img loading="lazy" src={this.props.data.sprite} alt={this.props.data.name} />
                        </td>
                    </tr>
                    <tr>
                    <td>
                            <span>{indexNumber}</span>
                            <p style={{fontSize: "small"}}>{this.props.data.name.toUpperCase()}</p>
                            <div className="type-format" >
                            {types}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{this.getStats()}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width={'300px'} style={{tableLayout: 'fixed', border:'solid', padding:'10px'}} >
                                <tr >
                                    <td className="pokestat-padding">
                                        <span>Height </span>
                                    </td>
                                    <td className="pokestat-padding" style={{textAlign: 'end'}}>
                                        <span>{this.props.data.height}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pokestat-padding">
                                    <span>Weight </span>
                                    </td>
                                    <td className="pokestat-padding" style={{textAlign: 'end'}} >
                                    <span>{this.props.data.weight}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pokestat-padding">
                                        <span>Abilities</span>
                                    </td>
                                    <td className="pokestat-padding" style={{textAlign: 'end'}}>
                                        <span>{this.getAbilities()}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pokestat-padding">
                                        <span>Moves</span>
                                    </td>
                                    <td className="pokestat-padding" style={{textAlign: 'end'}}>
                                        <span>{this.props.data.moves}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
        )
    }

}

export default PokemonInfo;