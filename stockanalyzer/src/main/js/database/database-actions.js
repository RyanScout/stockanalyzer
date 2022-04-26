import { getHost } from "../app";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "DATABASE_INPUT_CHANGE", params });
  };
}

export function backload() {
  let params = {};
  params.requestParams = {};
  params.requestParams.action = "BACKLOAD";
  params.requestParams.service = "ALGORITHM_CRUNCHER";

  params.URI = "/api/public/callService";

  const uri = getHost() + params.URI;
  let headers = new Headers();
  headers.set("Content-type", "application/json");
  if (params.auth != null) {
    headers.set("Authorization", "Basic " + params.auth);
  }
  fetch(uri, {
    method: "POST",
    credentials: "same-origin",
    headers: headers,
    body: JSON.stringify({ params: params.requestParams }),
  })
    .then(function (response) {
      if (response.status >= 400) {
        let responseMsg = { status: "ERROR", protocalError: response.status };
      } else {
        return response.json();
      }
    })
    .then((responseJson) => {
      if (
        responseJson != null &&
        responseJson.status != null &&
        responseJson.status == "SUCCESS"
      ) {
        dispatch(list());
      } else if (
        responseJson != null &&
        responseJson.status != null &&
        responseJson.status == "ACTIONFAILED"
      ) {
        dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
      }
    })
    .catch(function (error) {});
}

export function getSymbol(tradeSignal, symbol) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "GET_SYMBOL";
    params.requestParams.service = "CURRENT_ANALYSIS";
    params.requestParams.SYMBOL = symbol;
    params.requestParams.TRADE_SIGNAL = tradeSignal;

    params.URI = "/api/public/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "DATABASE_CACHE", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}
export function getCache() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "CURRENT_ANALYSIS";
    params.requestParams.action = "LIST";
    params.URI = "/api/public/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "DATABASE_CACHE", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function list() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "ALGORITHM_CRUNCHER";
    params.requestParams.action = "LIST";
    params.URI = "/api/public/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}
