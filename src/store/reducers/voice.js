export const voiceReducers = (state = { text: "" }, action) => {
  switch (action.type) {
    case "VOICE_DETECTOR":
      return { ...state, text: action.payload };

    case "LOG_OUT":
      return { text: {} };

    default:
      return state;
  }
};
