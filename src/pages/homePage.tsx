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
import Content from "src/components/content";

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

  const onEvolutionClick = (pokemonName: string) => {
    setSearch(pokemonName);
    handlePokemonSearch(pokemonName);
    setEvolutionModal(false);
  };

  const handlePokemonSearch = async(pokemonName: string) => {
    // async (pokemonName?: string) => {
      let pokemonToSearch = pokemonName ? pokemonName : search;

      const existItem = list?.find(
        (item: List) =>
          item?.name?.toLowerCase() === pokemonToSearch?.toLowerCase()
      );
      console.log("existItemexistItem",list,pokemonToSearch,existItem)
      if (existItem) {
        alert(`This Pokemon ${pokemonToSearch} is already in the list!`);
      } else {
        setSearch("");
        if (pokemonToSearch) {
          const result = await dispatch(
            fetchPokemon({ queryParam: pokemonToSearch.toLowerCase() }) as any
          );
          if (!result.payload) {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 2000);
          } else {
            setError(false);
          }
        }
      }
    }
    // [search, dispatch]


  const handleModal = (data: List) => {
    setModal(!modal);
    setSelectedPokemon(data);
  };

  const setEvolutionModalState = useCallback(
    (e: any, value: boolean, data: List) => {
      e.stopPropagation();
      setSelectedPokemon(data);
      setModal(false);
      setEvolutionModal(value);
    },
    []
  );


  const renderCard = (index: any) => {
    let source = "";
    const name = list[index].name;

    let sprites = list[index].sprites;
    source = sprites["front_default"];

    return (
      <div
        className="card"
        key={source + name}
        onClick={() => handleModal(list[index])}
      >
        <h3>{name}</h3> <img src={source} alt="pokemon" />
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
          onClick={(e) => setEvolutionModalState(e, true, list[index])}
        >
          Evolutions{" "}
        </button>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="header-content">
          <input
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder={loading ? "Loading..." : "Search"}
          />
          <button onClick={() => handlePokemonSearch(search)} disabled={!search}>
            Search
          </button>
        </div>
        {isError && (
          <div className="no-result">
            <p>Sorry, no pokemon matched your result! </p>
          </div>
        )}{" "}
      </div>
      <Content
        list={list}
        setSearch={setSearch}
        handlePokemonSearch={handlePokemonSearch}
      />
    </div>
  );
});
export default HomePage;
