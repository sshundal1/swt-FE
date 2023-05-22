import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    client_secret={process.env.REACT_APP_AUTH0_SECRET}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
    advancedOptions={{ defaultScope: "openid profile email refresh_token" }}
    defaultScope="openid profile email refresh_token"
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
