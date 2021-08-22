import React, { Component } from 'react';

// Pokemon Class That has the sprite and quick details
class Pokemon extends Component {
    constructor() {
        super();
        this.state = {
            selected: false
        };
    }

    // Colour codes for all the types
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

    // Generates the type tags
    sortTypes = () => {
        let types = this.props.data.types;
        return types.map(type => {
            let colour = this.getColour(type.type.name);
            let text = type.type.name;
            return <span className="tag-type" style={{backgroundColor: colour}}>{text.toUpperCase()}</span>
                    
        })
        
    }

    // Passes the info to load more info on the pokemon
    loadPokemon = () => {
        let pokemon = this.props.data;
        this.props.selected(pokemon);
        this.setState({selected: true})
    }

    render() {

        // checks if its selected or not, returns false if another pokemon is selected
        if(this.props.selected_pokemon !== this.props.data && this.state.selected !== false){
            this.setState({ selected: false })
        }
        let indexNumber = "#00" + this.props.data.order;
        let types = this.sortTypes();

        // Changes packground if its selected
        if(this.state.selected){
            return (
                <table className="pokemon" onClick={this.loadPokemon} style={{background:"black", color:'white'}}>
                    <tr>
                        <td style={{width:"120px"}}>
                            <img loading="lazy" src={this.props.data.sprite} alt={this.props.data.name} />
                        </td>
                        <td>
                            <span>{indexNumber}</span>
                            <p style={{fontSize: "small"}}>{this.props.data.name.toUpperCase()}</p>
                            <div className="type-format" >
                            {types}
                            </div>
                        </td>
                        
                    </tr>
                </table>
            )
        } else {
            return (
                <table className="pokemon" onClick={this.loadPokemon}>
                    <tr>
                        <td style={{width:"120px"}}>
                            <img loading="lazy" src={this.props.data.sprite} alt={this.props.data.name} />
                        </td>
                        <td>
                            <span>{indexNumber}</span>
                            <p style={{fontSize: "small"}}>{this.props.data.name.toUpperCase()}</p>
                            <div className="type-format" >
                            {types}
                            </div>
                        </td>
                        
                    </tr>
                </table>
        )
        }
        
    }

}

export default Pokemon;