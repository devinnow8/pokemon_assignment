interface Config {
  API_URL: ApiUrl;
}

interface ApiUrl {
  FETCH_POKEMON: string;
}

const CONFIG: Config = {
  API_URL: {
    FETCH_POKEMON: "/pokemon/",
  },
};

export default CONFIG;
