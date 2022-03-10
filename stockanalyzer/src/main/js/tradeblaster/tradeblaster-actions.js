/**
 *
 */
import { getHost } from "../app";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "TRADEBLASTER_INPUT_CHANGE", params });
  };
}

export function list() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "LIST";
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
        dispatch({ type: "TRADEBLASTER_LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function addItem() {
  return function (dispatch) {
    dispatch({ type: "TRADEBLASTER_ADD_ITEM" });
  };
}

export function cancelItem() {
  return function (dispatch) {
    dispatch({ type: "TRADEBLASTER_CANCEL_ITEM" });
  };
}

export function modifyItem(item) {
  return function (dispatch) {
    dispatch({ type: "TRADEBLASTER_MODIFY_ITEM" , action: item});
  };
}

export function historicalAnalysisView(item) {
  return function (dispatch) {
    dispatch({ type: "TRADEBLASTER_HISTORICAL_ANALYSIS_VIEW" , action: item});
  };
}

export function historicalDetailView(item) {
  return function (dispatch) {
    dispatch({ type: "TRADEBLASTER_HISTORICAL_DETAIL_VIEW" , action: item});
  };
}



export function deleteItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = item.identifier;
    params.requestParams.action = "DELETE";
    params.requestParams.ITEMID = item.id;

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
        dispatch(list());
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
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
    params.requestParams.service = "TRADE";
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
export function historicallyAnalyzeSwingTrade(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "HISTORICALLY_ANALYZE_SWING_TRADE";
    params.requestParams.service = "HISTORICALLY_ANALYZE"
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
        dispatch(list());
      })
      .catch(function (error) {});
  };
}
export function historicallyAnalyzeDayTrade(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "HISTORICALLY_ANALYZE_DAY_TRADE";
    params.requestParams.service = "HISTORICALLY_ANALYZE"
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
        } else {
          return response.json();
        }
      })
      .then(() => {
        dispatch(list());
      })
      .catch(function () {});
  };
}
