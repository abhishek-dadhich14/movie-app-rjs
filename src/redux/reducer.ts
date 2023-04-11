import { Data } from "../types";
import { ADD_DATA } from "./action";

export type initState = {
  data: Data[];
};

export const initData: initState = {
  data: [
    {
      Title: "",
      Year: "",
      imdbID: "",
      Poster: "",
      Type: "",
    },
  ],
};
type red = {
  type: string;
  payload: any;
};
const reducer = (state = initData, { type, payload }: red) => {
  switch (type) {
    case ADD_DATA:
      console.log(payload);
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default reducer;
