import Modal from "react-modal";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getURLRequests } from "../api/baseAPI";
import { useState, useEffect } from "react";
import "./homePage.css";
import {ChildComponentProps, Ability, PokemonAbility, Move, List } from "@/types/list";

function ModalContainer({
  modal,
  data,
  setModal,
}: {
  modal: boolean;
  data: List;
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const customStyles = {
    overlay: {
      zIndex: 15,
      background: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      width: "500px",
      height: "400px",
      border: "0",
      overflow: "hidden",
    },
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [abilitiesData, setAbilitiesData] = useState<Ability[]>([]);
  const [movesData, setMoves] = useState<string[]>([]);

  // const seeFullDetails = async (item: any) => {
  //   const endPoints = item.url;
  //   const mainUrl = endPoints.replace(/\/$/, "");
  //   const abilityId = mainUrl.substring(mainUrl.lastIndexOf("/") + 1);

  //   navigate(`/ability/${abilityId}`);
  // };

  const fetchData = useCallback(async () => {
    try {
      const abilities = data.abilities.map(
        (value: PokemonAbility) => value.ability
      );
      const moves = data.moves.map((move: Move) => move.move.name);
      setMoves(moves);
      setAbilitiesData(abilities);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
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
         {movesData.length && <div>
            <h1>MOVES</h1>
            {
              movesData?.map((dataItem: string, index) => {
                return <ul><li>{dataItem}</li></ul>;
              })}
          </div>}
        </div>
      </Modal>
    </div>
  );
}

export default ModalContainer;
