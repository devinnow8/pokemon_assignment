interface Config {
  API_URL: ApiUrl;
}

interface ApiUrl {
  FETCH_POKEMON: string;
  FETCH_POKEMON_EVOLUTION:String
  FETCH_ABILITIES:String,
  FETCH_POKEMONBY_ABILITIES:String
}



const CONFIG: Config = {
  API_URL: {
    FETCH_POKEMON: "/pokemon/",
    FETCH_POKEMON_EVOLUTION:"/evolution-chain/",
    FETCH_ABILITIES:"/ability",
    FETCH_POKEMONBY_ABILITIES:"/ability/"
  },
};

export default CONFIG;
