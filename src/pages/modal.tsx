import Modal from 'react-modal';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getURLRequests } from "../api/baseAPI";
import { useState, useEffect } from "react";
import "./homePage.css";
import { Ability, PokemonAbility, Move } from "@/types/list";

function ModalContainer({ modal, data, setModal }: any) {
  const customStyles = {
		overlay: {
			zIndex: 15,
			background: 'rgba(0, 0, 0, 0.7)',
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			padding: '0px',
			width: '500px',
			height: '400px',
			border: '0',
		},
	};
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [abilitiesData, setAbilitiesData] = useState([]);
	const [movesData, setMoves] = useState([]);

  // const seeFullDetails = async (item: any) => {
  //   console.log("seeFullDetails", item);
  //   const endPoints = item.url;
  //   const mainUrl = endPoints.replace(/\/$/, "");
  //   const abilityId = mainUrl.substring(mainUrl.lastIndexOf("/") + 1);

  //   navigate(`/ability/${abilityId}`);
  // };

  const fetchData = useCallback(async () => {
    try {
      console.log("daaata", data);
      const abilities = data.abilities.map(
        (value: PokemonAbility) => value.ability
      );
      const moves = data.moves.map((move: Move) => move.move.name);
      setMoves(moves);
      setAbilitiesData(abilities);
      // const responses = await getURLRequests(endPoints);
      // const abilities: any = responses.map((response) => response.data);
      // setAbilitiesData(abilities);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("abilitiesData", movesData, abilitiesData);

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
					<h3>Details</h3>
					<button onClick={() => setModal(false)}>&times;</button>
				</div>
				<div className="modal-content">
					{abilitiesData.length > 0 && (
						<div>
							<h1>ABILITIES</h1>
              {abilitiesData?.map((dataItem: Ability, index) => {
                return (
                  <>
                    <ul><li>{dataItem.name}</li> </ul>{" "}
                    {/* <button onClick={() => seeFullDetails(dataItem)}>
                      SEE FULL DETAILS
                    </button> */}
                  </>
                );
              })}
            </div>
          )}
          <div>
            <h1>MOVES</h1>

            {movesData &&
              movesData?.map((dataItem: string, index) => {
                return <ul><li>{dataItem}</li></ul>;
              })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalContainer;
