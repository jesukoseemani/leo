import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../store/moviesSlice";
import starredSlice from "../store/starredSlice";
import modalSlice from "../store/modalSlice";
import toastSlice from "../store/toastSlice";
import { render } from "@testing-library/react";
import watchLaterSlice from "../store/watchLaterSlice";

const ReactRouterWrapper = ({ component }) => {
  return <BrowserRouter>{component}</BrowserRouter>;
};

const ReduxWrapper = ({ component }) => {
  return <Provider store={store}>{component}</Provider>;
};

const ReduxReactRouterWrapper = ({ component }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );
};

export const getTestLayout = (component, type) => {
  switch (type) {
    case "react-router":
      return <ReactRouterWrapper component={component} />;
    case "redux":
      return <ReduxWrapper component={component} />;
    case "redux-react-router":
      return <ReduxReactRouterWrapper component={component} />;
    case "static":
      return component;
    default:
      return component;
  }
};

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        modal: modalSlice.reducer,
        toast: toastSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
