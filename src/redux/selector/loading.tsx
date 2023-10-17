import { RootState } from "../store";

export const loadingDataSelector = (func: any) => {
  return func((state: RootState) => state.loadingReducer);
};
