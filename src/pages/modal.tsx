
import Modal from "react-modal";
import React, { useCallback,  } from "react";

import {getURLRequests} from "../api/baseAPI"
import { useState, useEffect } from 'react';

function ModalContainer({ modal, data, setModal }) {
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
      width: "430px",
      height: "400px",
    },
  };
  const [loading, setLoading] = useState(false);
const [abilitiesData, setAbilitiesData] = useState([]);
  const endpointUrls = [
    'https://pokeapi.co/api/v2/ability/9/',
    'https://pokeapi.co/api/v2/ability/31/'
  ];

  const fetchData = useCallback(async (endPoints:any) => {
    try {
      const responses = await getURLRequests(endPoints);
      const abilities = responses.map(response => response.data)
      setAbilitiesData(abilities)
      setLoading(false)
      console.log('Abilities:', abilities);
    } catch (error) {
      console.error('Error fetching abilities:', error);    
    }
  }, [endpointUrls]);

  useEffect(() => {
    
    const endPoints = data?.map((item: any)=> {
      return item?.ability.url
    })
    fetchData(endPoints);
  }, []);

 




  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={() => setModal(false)}>Close</button>
          {/* <div>{fetchData()}</div> */
          abilitiesData?.map((dataItem, index)=> {
            console.log("dataItem",index,  dataItem)
            return dataItem?.effect_entries?.map((effectData)=> {
              return (
                <div>{effectData?.effect || "sdkjfhdjksfdhsf"}</div>
              )
            })
          })
          }
        </Modal>
      </div>
    )
  );
}

export default ModalContainer;
