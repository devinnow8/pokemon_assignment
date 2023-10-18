import React, { useEffect, useState } from "react";
import { fetchPokemonEvolution } from "../redux/asyncThunk/pokemon";
import { useDispatch } from "react-redux";
import customStyles from "../common/modalStyles";
import arrowImg from "../assets/images/right-arrow.png";
import Modal from "react-modal";

const EvolutionsModal = (params) => {
  const { setEvolutionModal, selectedPokemon } = params;
  const [evolutions, setEvolutions] = useState([]);
  const dispatch = useDispatch();

  const getEvolutionValues = (evolutionChainArr) => {
    const values = [];
    evolutionChainArr.forEach((species) => {
      values.push(species.from);
    });
    return values;
  };

  const fetchEvolutions = async () => {
    const result = await dispatch(fetchPokemonEvolution(selectedPokemon.id));
    const chain = await findEvolutionChain(result.payload);

    let evolutionsData = [];
    if (chain.length) {
      evolutionsData = await getEvolutionValues(chain);
    }
    setEvolutions(evolutionsData);
  };
  useEffect(() => {
    fetchEvolutions();
  }, []);

  const findEvolutionChain = (data) => {
    const evolutionChain = [];
    let dataToCheck = { ...data.chain };
    let evolvedSpecies = dataToCheck.species.name;

    if (dataToCheck) {
      let chainData = dataToCheck.evolves_to;

      while (chainData.length > 0) {
        const chainElement = chainData[0];
        const fromSpecies = evolvedSpecies;

        evolvedSpecies = chainElement.species.name;

        evolutionChain.push({ from: fromSpecies, to: evolvedSpecies });

        dataToCheck = { ...chainElement };
        chainData = chainElement.evolves_to;
      }
      if (dataToCheck.evolves_to.length <= 0) {
        evolutionChain.push({ from: evolvedSpecies, to: evolvedSpecies });
      }
    }

    console.log("evooo", evolutionChain);
    return evolutionChain;
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => setEvolutionModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-header">
        <h3>{selectedPokemon.name.toUpperCase()} EVOLUTIONS </h3>
        <button onClick={() => setEvolutionModal(false)}>&times;</button>
      </div>
      <div className="evolution-modal">
        {evolutions.length ? 
        evolutions.map((evolution, index) => {
          return (
            <div className="evolution-modal-content">
              <h4>{evolution.toUpperCase()}</h4>
              {index + 1 !== evolutions.length && <img src={arrowImg} />}
            </div>
          );
        }) : <>Loading...</>}
      </div>
    </Modal>
  );
};

export default EvolutionsModal;
