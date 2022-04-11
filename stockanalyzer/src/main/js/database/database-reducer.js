export default function databaseReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "DATABASE_BACKLOAD": {
      return state;
    }
    case "DATABASE_LIST": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let stockDay = {};
        if (action.responseJson.params.STOCKDAY != null) {
          stockDay = action.responseJson.params.STOCKDAY;
        }
        let stockMinute = {};
        if (action.responseJson.params.STOCKMINUTE != null) {
          stockMinute = action.responseJson.params.STOCKMINUTE;
        }
        return Object.assign({}, state, {
          stockDay: stockDay,
          stockMinute: stockMinute,
        });
      } else {
        return state;
      }
    }
    case "DATABASE_CACHE": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let cache = new Object();

        let symbols = {};
        if (action.responseJson.params.SYMBOLS != null) {
          symbols = action.responseJson.params.SYMBOLS;
        }

        let goldenCross = new Object();
        if (action.responseJson.params.GOLDENCROSS != null) {
          for (let i = 0; i < symbols.length; i++) {
            let symbol = new Object();
            symbol["DAY"] = action.responseJson.params.GOLDENCROSS[i][0];
            symbol["MINUTE"] = action.responseJson.params.GOLDENCROSS[i][1];
            goldenCross[symbols[i]] = symbol;
          }
          cache["goldenCross"] = goldenCross;
        }

        let lowerBollingerBand = new Object();
        if (action.responseJson.params.LOWERBOLLINGERBAND != null) {
          for (let i = 0; i < symbols.length; i++) {
            let symbol = new Object();
            symbol["DAY"] = action.responseJson.params.LOWERBOLLINGERBAND[i][0];
            symbol["MINUTE"] =
              action.responseJson.params.LOWERBOLLINGERBAND[i][1];
            lowerBollingerBand[symbols[i]] = symbol;
          }
          cache["lowerBollingerBand"] = lowerBollingerBand;
        }

        let upperBollingerBand = new Object();
        if (action.responseJson.params.UPPERBOLLINGERBAND != null) {
          for (let i = 0; i < symbols.length; i++) {
            let symbol = new Object();
            symbol["DAY"] = action.responseJson.params.UPPERBOLLINGERBAND[i][0];
            symbol["MINUTE"] =
              action.responseJson.params.UPPERBOLLINGERBAND[i][1];
            upperBollingerBand[symbols[i]] = symbol;
          }
          cache["upperBollingerBand"] = upperBollingerBand;
        }

        return Object.assign({}, state, {
          symbols: symbols,
          cache: cache,
          item: {},
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
