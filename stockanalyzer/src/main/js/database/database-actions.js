import { getHost } from "../app";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "DATABASE_INPUT_CHANGE", params });
  };
}

export function createGlobals() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "CREATE_GLOBALS";
    params.requestParams.service = "CACHE";

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
          dispatch(cancelItem());
        } else if (
          responseJson != null &&
          responseJson.status != null &&
          responseJson.status == "ACTIONFAILED"
        ) {
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}

export function saveItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "SAVE";
    params.requestParams.service = "CUSTOM_TECHNICAL_INDICATOR";
    item.shortSMAType = item.shortSMAType + "-" +item.evaluationPeriod.toLowerCase();
    item.longSMAType = item.longSMAType + "-" +item.evaluationPeriod.toLowerCase();
    params.requestParams.ITEM = item;

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
        dispatch(cancelItem());
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
    params.requestParams.action = "ITEM";
    params.requestParams.service = "CACHE";
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
    params.requestParams.service = "CACHE";
    params.requestParams.action = "LIST_GENERALS";
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
    params.requestParams.service = "CACHE";
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
        dispatch({ type: "DATABASE_LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function databaseDetailView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_DETAIL_VIEW", action: item });
  };
}

export function databaseSymbolView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_SYMBOL_VIEW", action: item });
  };
}

export function databaseModifyView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_MODIFY_VIEW", action: item });
  };
}

export function cancelItem() {
  return function (dispatch) {
    dispatch({ type: "DATABASE_CANCEL_ITEM" });
  };
}
