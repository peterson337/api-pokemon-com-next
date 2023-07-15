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

        useEffect(() => {
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
        }, [input])
        
        const pokemon = (e : any) => {
            if (!e) {
                setInput(1);
            }else if (input < 1) {
                setInput(1);

            }
            else{
                setInput(e);
            }
        }
        
        return (
            <div>

                    {/* <div>
                    <img src="https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Pok%C3%A9mon-Logo-PNG.png?fit=1600%2C1200&ssl=1"
                    alt="Pokemon"
                    className="bg-image bg-size-cover bg-position-center" />
                    </div> */}
                
                <div>

                <div className='flex justify-center p-4 border-b'>
                <input
                  type='number'
                  className='text-black p-2 rounded-full'
                  value={input}
                  onChange={(e) => pokemon(e.target.value)}
                />
              </div>
              <section className='flex justify-center'>
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
                          className=' w-60 bg-slate-500 rounded-lg'
                        />

                      <div
                        className=' text-center pb-3 mb-4'
                      >
                      <p
                      className=' text-2xl font-bold'
                      >
                        Abilidades:
                     </p>
                        {val.abilities.map((ability) => (
                          <p 
                          key={ability.ability.name}
                          className=' text-2xl'

                          >
                          {ability.ability.name}
                        </p>
                        ))}

                        {/* TODO: {
                            val.gameIndices&& <p>{val.gameIndices.name}</p>
                        } */}
                      </div>
                      </div>
                    );
                  })}
                </div>
              </section>
                </div>
              
            </div>
          );
}
