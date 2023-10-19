import React, { useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon, fetchAbilities, fetchPokemonByAbility } from "../redux/asyncThunk/pokemon";
import { pokemonDataSelector } from "../redux/selector/pokemon";
import tag from "../assets/images/tag.png";
import "../styles/homePage.scss";
import ModalContainer from "src/components/pokemonDetailModal";
import { List, PokemonSprites, PokemonAbilities } from "@/types/pokemon";
import { loadingDataSelector } from "../redux/selector/loading";
import EvolutionsModal from "../components/evolutionsModal";
import Content from "src/components/content";
import Dropdown from "src/common/dropdown";

const HomePage = React.memo((props) => {
  const dispatch = useDispatch();

  const { list } = pokemonDataSelector(useSelector);
  const { loading } = loadingDataSelector(useSelector);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>({});
  
  const [selectedAbility, setSelectedAbility] = useState<any>({});

  const [abilities, setAbilities] = useState<any>([]);

  const [isError, setError] = useState<boolean>(false);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const setSelectedSearchOption = async(option:any) => {
    setSelectedOption(option);
    console.log("optionoption",option)
    if(option.name === 'Search by ability'){
      const result = await dispatch(
        fetchAbilities(null) as any
      );
      console.log("resultresult",result)
      setAbilities(result.payload.results)
    }
  }

  const setAbility=async(ability :any)=>{
    console.log("setSelectedAbility")
    setSelectedAbility(ability);
    const result = await dispatch(
      fetchPokemonByAbility({ queryParam: ability.name.toLowerCase() }) as any
    );
    console.log("fetchPokemonByAbility",result)
  }

  const handlePokemonSearch = async (pokemonName: string) => {
    // async (pokemonName?: string) => {
    let pokemonToSearch = pokemonName ? pokemonName : search;

    const existItem = list?.find(
      (item: List) =>
        item?.name?.toLowerCase() === pokemonToSearch?.toLowerCase()
    );
    console.log("existItemexistItem", list, pokemonToSearch, existItem);
    if (existItem) {
      alert(`This Pokemon ${pokemonToSearch} is already in the list!`);
    } else {
      setSearch("");
      if (pokemonToSearch) {
        const result = await dispatch(
          fetchPokemon({ queryParam: pokemonToSearch.toLowerCase() }) as any
        );
        if (!result.payload) {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        } else {
          setError(false);
        }
      }
    }
  };
  // [search, dispatch]

  return (
    <div className="main-container">
      <div className="header">
      <Dropdown options={[{name:"Search by name", value:0},{name:"Search by ability", value:1}]} selectedOption ={selectedOption} setSelectedOption = {setSelectedSearchOption} />
        {selectedOption.name === 'Search by name' ?    <div className="header-content">
            <>
              <input
                value={search}
                onChange={(e) => handleChange(e)}
                placeholder={loading ? "Loading..." : "Search"}
              />
              <button
                onClick={() => handlePokemonSearch(search)}
                disabled={!search}
              >
                Search
              </button>
            </>
          
          
        </div> : <Dropdown options={abilities} selectedOption ={selectedAbility}  setSelectedOption = {setAbility}/>
}
        {isError && (
          <div className="no-result">
            <p>Sorry, no pokemon matched your result! </p>
          </div>
        )}{" "}
      </div>
      <Content
        list={list}
        setSearch={setSearch}
        handlePokemonSearch={handlePokemonSearch}
      />
    </div>
  );
});
export default HomePage;
