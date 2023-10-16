import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../redux/asyncThunk/pokemon";
import { pokemonDataSelector } from "../redux/selector/pokemon";

function HomePage() {
  const dispatch = useDispatch();

  const { list } = pokemonDataSelector(useSelector);

  console.log(list);

  const [search, setSearch] = useState("");

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handlePokemonSearch = useCallback(() => {
    setSearch("");
    dispatch(fetchPokemon({ queryParam: search.toLowerCase() }) as any);
  }, [search, dispatch]);

  return (
    <div>
      <input value={search} onChange={handleChange} />
      <button onClick={handlePokemonSearch}>Search</button>
      {list?.map(({ name, sprites }: { name: string; sprites: any }) => {
        let src = Object.values(sprites).find((value: any) => value) as string;
        return (
          <div key={src + name}>
            {name} <img src={src} alt="pokemon" />
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
