import React, { useEffect, useState } from "react";
import { fetchPokemonEvolution } from "../redux/asyncThunk/pokemon";
import { useDispatch } from "react-redux";
import customStyles from "../common/modalStyles";
import arrowImg from '../assets/images/right-arrow.png';
import Modal from "react-modal";

const EvolutionsModal = (params) => {
  const { setEvolutionModal, selectedPokemon } = params;
  const [evolutions, setEvolutions] = useState([]);
  const dispatch = useDispatch();
  console.log("selectedPokemonselectedPokemon", params);

  const fetchEvolutions = async () => {
    const result = await dispatch(fetchPokemonEvolution(selectedPokemon.id));
    // setData(result);
    const chain = findEvolutionChain(result.payload);

    console.log("resultresult22", chain);
  };
  useEffect(() => {
    fetchEvolutions();
  }, []);

  const findEvolutionChain = (data) => {
    const evolutionChain = [];
    let dataToCheck = { ...data.chain };
    // let currentSpecies = params.selectedPokemon.species.name;

    if (dataToCheck) {
      let evolvedSpecies = dataToCheck.species.name;
      // evolutionChain.push({ from: currentSpecies, to: evolvedSpecies });

      let chainData = dataToCheck.evolves_to;
      console.log("chainData", chainData);

      while (chainData.length > 0) {
        if (chainData.length) {
          console.log("kkkkk", chainData);
          const chainElement = chainData[0];
          const fromSpecies = evolvedSpecies;

          evolvedSpecies = chainElement.species.name;
          console.log("evolvedSpeciesevolvedSpecies", evolvedSpecies);
          console.log("kddchainData", fromSpecies, evolvedSpecies);

          evolutionChain.push({ from: fromSpecies, to: evolvedSpecies });

          dataToCheck = { ...chainElement };
          chainData = chainElement.evolves_to;
          // if (chainData.length <= 0) {
          // evolutionChain.push({
          //   from: 'new' ,
          //   to: 'new',
          // });
        }
        console.log("pppdataToCheck", chainData);
      }
    }

    console.log("evooo", evolutionChain);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => setEvolutionModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-header">
        <h3>Evolutions </h3>
        <button onClick={() => setEvolutionModal(false)}>&times;</button>
      </div>
      <div className="evolution-modal">
        <div className="evolution-modal-content">
          <h4>ABC</h4>
          <img src={arrowImg} />
        </div>
        <div className="evolution-modal-content">
          <h4>ABC</h4>
          <img src={arrowImg} />
        </div>
        <div className="evolution-modal-content">
          <h4>ABC</h4>
          <img src={arrowImg} />
        </div>

      </div>
    </Modal>
  );
};

export default EvolutionsModal;
