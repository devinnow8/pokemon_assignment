import Modal from "react-modal";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import customStyles from '../common/modalStyles.js'
import { getURLRequests } from "../api/baseAPI";
import { useState, useEffect } from "react";
import "../pages/homePage.css";
import {
  ChildComponentProps,
  Ability,
  PokemonAbility,
  Move,
  List,
} from "@/types/pokemon";
interface PokemonInfo {
  abilitiesData: Ability[];
  movesData: string[];
  species: string;
}

function ModalContainer({
  modal,
  data,
  setModal,
}: {
  modal: boolean;
  data: List;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pokemonInfo, setPokemonDetails] = useState<PokemonInfo>(
    {} as PokemonInfo
  );

  const getPokemonDetails = useCallback(async () => {
    try {
      const abilities = data.abilities.map(
        (value: PokemonAbility) => value.ability
      );
      const moves = data.moves.map((move: Move) => move.move.name);
      const pokemonInfo = {
        abilitiesData: abilities,
        movesData: moves,
        species: data?.species?.name,
      };
      setPokemonDetails(pokemonInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    }
  }, []);

  useEffect(() => {
    getPokemonDetails();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-header">
          <h3>{data.name.toUpperCase()} </h3>
          <button onClick={() => setModal(false)}>&times;</button>
        </div>
        <div className="modal-content">
          <div>Evolution </div>
          {Object.keys(pokemonInfo).includes("abilitiesData") && (
            <div>
              <h1>ABILITIES</h1>
              {pokemonInfo.abilitiesData?.map((dataItem: Ability, index) => {
                return (
                  <>
                    <ul>
                      <li>{dataItem.name}</li>{" "}
                    </ul>{" "}
                     {/* <button onClick={() => seeFullDetails(dataItem)}>
                      SEE FULL DETAILS
                    </button>  */}
                  </>
                );
              })}
            </div>
          )}
          {Object.keys(pokemonInfo).includes("movesData") && (
            <div>
              <h1>MOVES</h1>
              {pokemonInfo.movesData?.map((dataItem: string, index) => {
                return (
                  <ul>
                    <li>{dataItem}</li>
                  </ul>
                );
              })}
            </div>
          )}
          {pokemonInfo?.species && (
            <>
              <h1>SPECIES</h1>
              <p>{pokemonInfo.species}</p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModalContainer;
