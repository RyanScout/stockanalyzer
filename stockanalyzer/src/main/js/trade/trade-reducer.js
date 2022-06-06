import { bindActionCreators } from "redux";

/**
 *
 */
export default function tradeReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "TRADE_INPUT_CHANGE": {
      if (action.params != null) {
        let item = {};
        if (state.item == null) {
          item[action.params.field] = action.params.value;
        } else {
          item = Object.assign({}, state.item);
          item[action.params.field] = action.params.value;
        }
        return Object.assign({}, state, {
          item: item,
        });
      } else {
        return state;
      }
    }

    case "TRADE_LIST": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let itemCount = {};
        if (action.responseJson.params.TRADECOUNT != null) {
          itemCount = action.responseJson.params.TRADECOUNT;
        }

        let items = {};
        if (action.responseJson.params.TRADES != null) {
          items = action.responseJson.params.TRADES;
        }

        return Object.assign({}, state, {
          itemCount: itemCount,
          items: items,
          item: {},
          view: "",
        });
      } else {
        return state;
      }
    }

    case "TRADE_CUSTOM_TECHNICAL_INDICATORS": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let customTechnicalIndicators = {};
        if (action.responseJson.params.ITEMS != null) {
          customTechnicalIndicators = action.responseJson.params.ITEMS;
        }
        return Object.assign({}, state, {
          customTechnicalIndicators: customTechnicalIndicators,
        });
      } else {
        return state;
      }
    }

    case "TRADE_ADD_ITEM": {
      let clone = Object.assign({}, state);
      clone.view = "ADD";
      clone.item = {};
      return clone;
    }
    case "TRADE_CANCEL_ITEM": {
      let clone = Object.assign({}, state);
      clone.view = "";
      clone.item = {};
      return clone;
    }

    case "TRADE_MODIFY_ITEM": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "MODIFY",
        });
      } else {
        return state;
      }
    }

    case "TRADE_HISTORICAL_ANALYSIS_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "HISTORICAL_ANALYSIS",
        });
      } else {
        return state;
      }
    }
    case "TRADE_DETAIL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "TRADE_DETAIL",
        });
      } else {
        return state;
      }
    }

    case "TRADE_SAVE_ITEM": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let item = {};
        if (action.responseJson.params.ITEM != null) {
          item = action.responseJson.params.ITEM;
        }
        return Object.assign({}, state, {
          item: item,
          view: "",
        });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
