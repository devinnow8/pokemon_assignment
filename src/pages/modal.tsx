import Modal from "react-modal";
import React, { useCallback } from "react";

import { getURLRequests } from "../api/baseAPI";
import { useState, useEffect } from "react";
import "./homePage.css";

function ModalContainer({ modal, data, setModal }: any) {
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
      border: '0'
    },
  };
  const [loading, setLoading] = useState(false);
  const [abilitiesData, setAbilitiesData] = useState([]);

  const fetchData = useCallback(
    async (endPoints: any) => {
      try {
        const responses = await getURLRequests(endPoints);
        const abilities: any = responses.map((response) => response.data);
        setAbilitiesData(abilities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching abilities:", error);
      }
    },
    []
  );

  useEffect(() => {
    const endPoints = data?.map((item: any) => {
      return item?.ability.url;
    });
    fetchData(endPoints);
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
          <h3>Abilities</h3>
        <button onClick={() => setModal(false)}>&times;</button>
        </div>
        <div className="modal-content">
        {
          /* <div>{fetchData()}</div> */
         
          abilitiesData?.map((dataItem:any, index) => {
            return dataItem?.effect_entries?.map((effectData:any) => {
              if(effectData?.language?.name === 'en'){
                return <p>- {effectData?.short_effect}</p>;
              }
            });
          })
         
        }
        </div>
      </Modal>
    </div>
  );
}

export default ModalContainer;
