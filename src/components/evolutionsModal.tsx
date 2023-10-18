import React, { useEffect, useState } from "react";
import { fetchPokemonEvolution } from "../redux/asyncThunk/pokemon";
import { useDispatch } from "react-redux";
import customStyles from "../common/modalStyles";
import arrowImg from "../assets/images/right-arrow.png";
import Modal from "react-modal";
import { List, Evolution } from "@/types/pokemon";

interface EvolutionProps {
  setEvolutionModal: any;
  selectedPokemon: List;
  evolutionModal: boolean;
  onEvolutionClick: any;
}

interface Species {
  from: string;
  to: string;
}

const EvolutionsModal = (params: EvolutionProps) => {
  const {
    setEvolutionModal,
    evolutionModal,
    onEvolutionClick,
    selectedPokemon,
  } = params;
  const [evolutions, setEvolutions] = useState<string[]>([]);
  const [apiResult, setApiResult] = useState<boolean>(false);

  const dispatch = useDispatch();

  const getEvolutionValues = (evolutionChainArr: Species[]) => {
    const evolutionValues = [] as string[];
    evolutionChainArr.forEach((species: Species) => {
      evolutionValues.push(species.from);
    });
    return evolutionValues;
  };

  const fetchEvolutions = async () => {
    // @ts-ignore:next-line
    const result = await dispatch(fetchPokemonEvolution(selectedPokemon.id));
    let evolutionsData = [] as any;

    if (result) {
      setApiResult(true);
      if (result?.payload) {
        const chain = await findEvolutionChain(result.payload);
        if (chain.length) {
          evolutionsData = await getEvolutionValues(chain);
        }
      }
    }

    setEvolutions(evolutionsData);
  };
  useEffect(() => {
    fetchEvolutions();
  }, []);

  const findEvolutionChain = (data: Evolution) => {
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

    return evolutionChain;
  };

  const onPokemonEvoClick = (evolution: string) => {
    onEvolutionClick(evolution);
  };

  return (
    <Modal
      isOpen={evolutionModal}
      onRequestClose={(e) => setEvolutionModal(e, false)}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <h3>{selectedPokemon.name.toUpperCase()} EVOLUTIONS </h3>
        <button onClick={(e) => setEvolutionModal(e, false)}>&times;</button>
      </div>
      <div className="evolution-modal">
        {evolutions.length ? (
          evolutions.map((evolution, index) => {
            return (
              <div key={index} className="evolution-modal-content">
                <h4
                  onClick={() => {
                    onPokemonEvoClick(evolution);
                  }}
                >
                  {evolution.toUpperCase()}
                </h4>
                {index + 1 !== evolutions.length && <img src={arrowImg} />}
              </div>
            );
          })
        ) : (
          <>{!apiResult ? <>Loading...</> : <>No chain found</>}</>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(EvolutionsModal);
