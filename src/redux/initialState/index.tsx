import { List } from "@/types/pokemon";
interface InitialType {
  LOADING: {
    loading: number;
  };
  POKEMON: {
    list: List[];
  };
}

const initialState: InitialType = {
  LOADING: {
    loading: 0,
  },
  POKEMON: {
    list: [],
  },
};

export default initialState;
