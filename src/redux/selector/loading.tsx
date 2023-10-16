export const loadingDataSelector = (func: any) => {
  return func((state: any) => state.loadingReducer);
};
