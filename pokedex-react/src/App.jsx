import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeId, setPokeId] = useState(1);
  const [pokeInput, setPokeInput] = useState('');

  const typeColors = {
    normal: '#A6AEBF',
    fire: '#FA812F',
    water: '#133E87',
    grass: '#7c5',
    bug: '#859F3D',
    electric: '#FEEC37',
    ice: '#A2D2DF',
    fighting: '#C62E2E',
    poison: '#7E60BF',
    ground: '#db5',
    flying: '#89f',
    psychic: '#D76C82',
    rock: '#ba6',
    ghost: '#66b',
    dragon: '#433878',
    dark: '#754',
    steel: '#aab',
    fairy: '#e9e'
  }

  useEffect(() => {
    const fetchPokeData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        if (!response.ok) throw new Error('Not good response');
        const data = await response.json();
        setPokeData(data);
      } catch (error) {
        console.error('Failed to Fetch:', error);
        setPokeData(null);
      }
    };

    fetchPokeData();
  }, [pokeId]);

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    setPokeId(randomId);
  };

  const handleInputChange = (event) => {
    setPokeInput(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const idOrName = pokeInput.toLocaleLowerCase();
      setPokeId(idOrName);
    }
  };

  function PokemonStats({ stats }) {
    return (
      <article className='pokeStats'>
        <h2>Stats:</h2>
        <ul>
          {stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </article>
    );
  }


  return (
    <>

      <section className='pokedex--section'>
        <h1>PokeDex</h1>

        <section className='pokedex-screen'>

          <article className='pokemon'>

            <div className='inputs'>
              <input
                type="text"
                value={pokeInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder='Enter pokemon name or pokemon ID'
              />
              <button onClick={handleRandomPokemon}>Next Random Pokemon</button>
            </div>

            {pokeData && (
              <>
                <article className='pokeInfo'>
                  <h1 className='pokeName'>{pokeData.name}</h1>
                  <img src={pokeData.sprites.front_default} alt={pokeData.name} />
                  <article className='types'>
                    <ul>
                      {pokeData.types.map((type) => (
                        <li key={type.type.name} style={{ background: typeColors[type.type.name] }}>{type.type.name}</li>
                      ))}
                    </ul>
                  </article>
                </article>

                <PokemonStats stats={pokeData.stats} />
              </>
            )}
          </article>

          {pokeData ? (
            <section className='pokemon-data'>

              <article className='lists'>
                <article className='abilityList'>
                  <h2>Abilities:</h2>
                  <ul>
                    {pokeData.moves.map((move) => (
                      <li key={move.move.name}>{move.move.name}</li>
                    ))}
                  </ul>
                </article>

                <article className='moveList'>
                  <h2>Moves:</h2>
                  <ul>
                    {pokeData.moves.map((move) => (
                      <li key={move.move.name}>{move.move.name}</li>
                    ))}
                  </ul>
                </article>
              </article>
            </section>
          ) : (
            <p>Loading next Pokemon...</p>
          )}
        </section>
      </section>
    </>
  );
}

export default App