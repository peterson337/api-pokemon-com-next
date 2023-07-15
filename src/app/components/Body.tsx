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
              
             if (input < 1) {
                setInput(1);

            }
            else{
                setInput(e);
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
        
       return (
    <div>
      <div className='flex justify-center p-4 border-b'>
        <input
          type='number'
          className='text-black p-2 rounded-full'
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value))}
          placeholder='Escreva um número'
        />
        <button
          className='ml-3 bg-sky-600 p-2 rounded-full hover:bg-sky-400'
          onClick={pokemon}
        >
          Consultar api
        </button>
      </div>
      <section className='flex justify-center'>
        <div className=''>
          {array.length <= 0 && (
            <p className=''>
              Escreva um número no input acima para aparecer um pokemon.
            </p>
          )}
        </div>

        <div className='flex justify-center m-3 bg-slate-700 w-96 rounded-[20px]'>
          {array.map((val) => {
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
