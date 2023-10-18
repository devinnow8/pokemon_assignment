import React, { useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../redux/asyncThunk/pokemon";
import { pokemonDataSelector } from "../redux/selector/pokemon";
import tag from "../assets/images/tag.png";
import "./homePage.scss";
import ModalContainer from "../components/pokemonDetailModal";
import { List, PokemonSprites, PokemonAbilities } from "@/types/pokemon";
import { loadingDataSelector } from "../redux/selector/loading";
import EvolutionsModal from "../components/evolutionsModal";

const HomePage = React.memo((props) => {
  const dispatch = useDispatch();

  const { list } = pokemonDataSelector(useSelector);
  const { loading } = loadingDataSelector(useSelector);
  const [search, setSearch] = useState("");
  const [evolutionModal, setEvolutionModal] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<List>();

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handlePokemonSearch = useCallback(async () => {
    const existItem = list?.find(
      (item: List) => item?.name?.toLowerCase() === search?.toLowerCase()
    );
    if (existItem) {
      alert("Pokemon already in the list!");
    } else {
      setSearch("");
      const result = await dispatch(
        fetchPokemon({ queryParam: search.toLowerCase() }) as any
      );
      if (!result.payload) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [search, dispatch]);

  const handleModal = (data: List) => {
    console.log("hare callll");

    setModal(!modal);
    setSelectedPokemon(data);
  };

  const setEvolutionModalState = useCallback((value: boolean, data: List) => {
    console.log(value, "setEvolutionModalState");
    setSelectedPokemon(data);

    setEvolutionModal(value);
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <div className="header-content">
          <input
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder={loading ? "Loading..." : "Search"}
          />
          <button onClick={() => handlePokemonSearch()} disabled={!search}>
            Search
          </button>
        </div>
        {isError && (
          <div className="no-result">
            <p>Sorry, no results found! </p>
          </div>
        )}{" "}
      </div>

      {list?.length > 0 ? (
        <div className="content">
          {list?.map(
            (
              {
                name = "",
                sprites,
                abilities,
              }: {
                name: string;
                sprites: PokemonSprites;
                abilities: PokemonAbilities;
              },
              index: number
            ) => {
              let src = Object.values(sprites).find(
                (value: PokemonSprites) => value
              ) as string;

              return (
                <div
                  className="card"
                  key={src + name}
                  onClick={() => handleModal(list[index])}
                >
                  <h3>{name}</h3> <img src={src} alt="pokemon" />
                  <div key={index}>
                    {index === 0 && (
                      <div className="image-container">
                        <img src={tag} />
                        <span>New</span>
                      </div>
                    )}
                  </div>
                  <button
                    className="evolution-btn"
                    onClick={() => setEvolutionModalState(true, list[index])}
                  >
                    Evolutions{" "}
                  </button>
                  {selectedPokemon &&
                    Object.values(selectedPokemon).length &&
                    modal && (
                      <>
                        <ModalContainer
                          modal={modal}
                          setModal={setModal}
                          data={selectedPokemon}
                        />
                      </>
                    )}
                </div>
              );
            }
          )}
          {selectedPokemon &&
            Object.keys(selectedPokemon).length > 0 &&
            evolutionModal && (
              <EvolutionsModal
                evolutionModal={evolutionModal}
                selectedPokemon={selectedPokemon}
                setEvolutionModal={setEvolutionModalState}
              />
            )}
        </div>
      ) : (
        <div className="no-data">
          <h2> No Data</h2>
        </div>
      )}
    </div>
  );
});
export default HomePage;
