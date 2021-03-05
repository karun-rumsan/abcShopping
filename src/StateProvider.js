import React, { createContext, useContext, useReducer } from "react";

//prepare the data layer

export const StateContext = createContext();
//wrap our app and provide the data layer
export const StateProvider = ({ reducers, initialStates, children }) => (
  <StateContext.Provider value={useReducer(reducers, initialStates)}>
    {children}
  </StateContext.Provider>
);
//pull information from the data layer
export const useStateValue = () => useContext(StateContext); // useContext is alternative for consumer
