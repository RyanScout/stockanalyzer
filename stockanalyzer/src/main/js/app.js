import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import PageContainer from "./PageContainer.js";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import Theme from "./theme.css";
import { Navbar, NavItem } from "./navigation.js";
import { GraphSvg, ListSvg , CloudSvg } from "./icons/icons.js";

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar>
      <NavItem icon={<ListSvg />} link = "/trade"/>
      <NavItem icon={<GraphSvg />} link = "/historical_analysis" />
      <NavItem icon={<CloudSvg/>} link = "/database" />
      </Navbar>
      <PageContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);

export function getHost() {
  return "";
}
