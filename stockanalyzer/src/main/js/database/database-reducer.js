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

        let goldenCross = new Object();
        if (action.responseJson.params.GOLDEN_CROSS_DAY != null) {
          goldenCross["day"] = action.responseJson.params.GOLDEN_CROSS_DAY;
        }
        if (action.responseJson.params.GOLDEN_CROSS_MINUTE != null) {
          goldenCross["minute"] =
            action.responseJson.params.GOLDEN_CROSS_MINUTE;
        }
        cache["goldenCross"] = goldenCross;

        let lowerBollingerBand = new Object();
        if (action.responseJson.params.LOWER_BOLLINGER_BAND_DAY != null) {
          lowerBollingerBand["day"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_DAY;
        }
        if (action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE != null) {
          lowerBollingerBand["minute"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE;
        }
        cache["lowerBollingerBand"] = lowerBollingerBand;

        let upperBollingerBand = new Object();
        if (action.responseJson.params.UPPER_BOLLINGER_BAND_DAY != null) {
          upperBollingerBand["day"] =
            action.responseJson.params.UPPER_BOLLINGER_BAND_DAY;
        }
        if (action.responseJson.params.UPPER_BOLLINGER_BAND_MINUTE != null) {
          upperBollingerBand["minute"] =
            action.responseJson.params.UPPER_BOLLINGER_BAND_MINUTE;
        }
        cache["upperBollingerBand"] = upperBollingerBand;

        return Object.assign({}, state, {
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
