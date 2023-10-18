interface Config {
  API_URL: ApiUrl;
}

interface ApiUrl {
  FETCH_POKEMON: string;
  FETCH_POKEMON_EVOLUTION:String
}



const CONFIG: Config = {
  API_URL: {
    FETCH_POKEMON: "/pokemon/",
    FETCH_POKEMON_EVOLUTION:"/evolution-chain/"
  },
};

export default CONFIG;
