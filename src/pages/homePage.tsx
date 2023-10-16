import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../redux/asyncThunk/pokemon";
import { pokemonDataSelector } from "../redux/selector/pokemon";
import tag from "../assets/images/tag.png";
import "./homePage.css";
import ModalContainer from "./modal";

function HomePage() {
  const dispatch = useDispatch();

  const { list } = pokemonDataSelector(useSelector);

  console.log("list ===>", list[0]?.abilities[0]?.ability.url);

  const getAbilitiesRes = () => {
    list?.forEach((data: any) => {
      const abilityUrl = data?.abilities.ability.url
    })
  }
  

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState([]);


  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handlePokemonSearch = useCallback(() => {
    const existItem = list.some((item: { name: string; sprites: any }) =>
      item.name.includes(search)
    );
    if (existItem) {
      console.log("Pokemon already exists");
    } else {
      setSearch("");
      dispatch(fetchPokemon({ queryParam: search.toLowerCase() }) as any);
    }
  }, [search, dispatch]);

  const handleModal = (data:any) => {
    setModal(!modal);
    setSelectedModal(data)
  };
console.log("setSelectedModal", );

  return (
    <div className="main-container">
      <div className="header">
        <div className="header-content">
          <input value={search} onChange={handleChange} placeholder="Search" />
          <button onClick={handlePokemonSearch} disabled={!search}>
            Search
          </button>
        </div>
      </div>

      {list.length ? (
        <div className="content">
          {list?.map(({ name, sprites, abilities }: { name: string; sprites: any }, index) => {
            let src = Object.values(sprites).find(
              (value: any) => value
            ) as string;
          console.log("test", index, abilities);
          
            return (
                <div className="card" key={src + name} onClick={()=>handleModal(abilities)}>
                  <h3>{name}</h3> <img src={src} alt="pokemon" />
                  <div key={index}>
                  {index=== 0 && (
                    <div className="image-container">
                      <img src={tag} />
                      <span>New</span>
                    </div>
                  )}
                  </div>
                 {modal && (<ModalContainer modal={modal}  setModal={setModal} data={selectedModal}/> )}
                </div>
            );
          })}
        </div>
      ) : (
        <div className="no-data">
          <h2> No Data</h2>
        </div>
      )}
    </div>
  );
}

export default HomePage;
