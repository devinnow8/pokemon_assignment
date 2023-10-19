import React, { useState, useCallback } from "react";
import { List, PokemonSprites, PokemonAbilities } from "@/types/pokemon";
import tag from "../assets/images/tag.png";
import ModalContainer from "./pokemonDetailModal";
import EvolutionsModal from "./evolutionsModal";

interface ContentProps {
  list: List[];
  setSearch: any;
  handlePokemonSearch: any;
}

function Content(props: ContentProps) {
  const { list, setSearch, handlePokemonSearch } = props;
  const [evolutionModal, setEvolutionModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<List>();
  const onEvolutionClick = (pokemonName: string) => {
    setSearch(pokemonName);
    handlePokemonSearch(pokemonName);
    setEvolutionModal(false);
  };
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
  const renderCard = (index: number) => {
    let source = null;
    const name = list[index].name;

    let sprites = list[index].sprites;
    source = sprites["front_default"];

    return (
      <div
        className="card"
        key={source + name}
        onClick={() => handleModal(list[index])}
      >
        <h3>{name}</h3> <img src={source || ""} alt="pokemon" />
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
    <>
      {!list.length ? (
        <div className="no-data">
          <h2> No Data</h2>
        </div>
      ) : (
        <div className="content">
          <h2>recently viewed</h2>
          {list?.length > 0 && (
            <div className="recently-viewed">{renderCard(0)}</div>
          )}
          <div className="other-cards">
            {list?.length > 1 && (
              <>
                <h2>Searched history</h2>
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

                    return <>{index !== 0 && renderCard(index)}</>;
                  }
                )}
              </>
            )}
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
            {selectedPokemon &&
              Object.keys(selectedPokemon).length > 0 &&
              evolutionModal && (
                <EvolutionsModal
                  evolutionModal={evolutionModal}
                  selectedPokemon={selectedPokemon}
                  setEvolutionModal={setEvolutionModalState}
                  onEvolutionClick={onEvolutionClick}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
}
export default Content;
