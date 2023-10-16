interface InitialType {
  LOADING: {
    loading: number;
  };
  POKEMON: {
    list: any[];
    error?: any;
  };
}

const initialState: InitialType = {
  LOADING: {
    loading: 0,
  },
  POKEMON: {
    list: [],
    error: undefined,
  },
};

export default initialState;
