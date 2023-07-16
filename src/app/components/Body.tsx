'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'

  type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type PokemonSprites = {
  front_default: string;
};

type PokemonSpecies = {
  name: string;
  url: string;
};

type Api = {
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  species: PokemonSpecies;
  gameIndices: GameIndices[],
};

type GameIndices = {
    version: {
        name:string;
    }

}

type Version = {
    name: string;

}
export const Body = () => {
        const [array, setArray] = useState<Api[]>([]);
        const [input, setInput] = useState<number>(1);

        const pokemon = (e : any) => {
          e.preventDefault();
             if (input < 1) {
                setInput(1);

            } else if(!e){
              alert("Por favor escreva um número para consultar a api.")
              return
            }
             

            fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)
            .then(response => response.json())
            .then((json) => {

                setArray([

                    {   ...json,
                        ...json.sprites,
                        ...json.species,
                        ...json.abilities.ability,
                        ...json.game_indices.version,
                    }
                ])
            })
        }

        const handleKeyPress  = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                pokemon(e);
              }
        }
        
       return (
    <div>
      <div className='flex flex-row md:flex-row justify-center 
                      p-4 border-b space-y-3 md:space-y-0
                      '>
        <input
          type='number'
          className='text-black md:p-2 p-1 rounded-full
                         w-48 mt-2 md:mt-0 pl-3'
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value))}
          placeholder='Escreva um número'
          onKeyPress={handleKeyPress}

        />
        <button
          className='ml-3 bg-sky-600 md:p-2 p-2 
                    rounded-full hover:bg-sky-400
                     w-32
                    '
          onClick={pokemon}

        >
          Consultar api
        </button>
      </div>
      <section className='flex justify-center'>

        <div className={ array.length <= 0? 
                        'flex justify-center m-3'

                        :
                        'flex justify-center m-3 bg-slate-700 w-96 rounded-[20px]'

                      }>
          

              {
              array.length <= 0? (
                <div>
                  <p className=''>
                  Escreva um número no input acima para aparecer um pokemon. 
                  
                </p>

                </div>
              )

              :

            array.map((val) => {
            return (

              <div key={val.species.name}>
                <p className='text-center m-2 text-2xl md:text-3xl border-b pb-3'>
                  {val.species.name}
                </p>
                <img
                  src={val.sprites.front_default}
                  alt='Teste'
                  className='w-60 bg-slate-500 rounded-lg'
                />

                <div className='text-center pb-3 mb-4'>
                  <p className='text-2xl font-bold'>Abilidades:</p>
                  {val.abilities.map((ability) => (
                    <p key={ability.ability.name} className='text-2xl'>
                      {ability.ability.name}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
