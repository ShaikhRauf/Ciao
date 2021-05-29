import { Dimensions, Platform, PixelRatio } from "react-native";


const { height, width } = Dimensions.get("window");

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export const createReducer = (initialState, reducerMap) => (
  state = initialState,
//   action = {}
action = {type:null, payload:null}  // remove it
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action.payload) : state;
};

export const getTopMargin = () => {
    let topMargin = "3%";
    if (Platform.OS === "ios") {
      if (height === 568) {
        topMargin = "1.5%";
      } else {
        topMargin = "3%";
      }
    }
    return topMargin;
  };

export const isIphoneX = () => {
  // This has to be iOS duh
  Platform.OS === "ios" &&
  // Accounting for the height in either orientation
  (height === 812 || width === 812);
}
