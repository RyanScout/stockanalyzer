export default function databaseReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "DATABASE_BACKLOAD": {
      return state;
    }
    case 'DATABASE_INPUT_CHANGE': {
			if (action.params != null) {
				let item = {};
				if (state.item == null) {
					item[action.params.field] = action.params.value;
				} else {
					item = Object.assign({}, state.item);
					item[action.params.field] = action.params.value;
				}
				return Object.assign({}, state, {
					item: item
				});
			} else {
        		return state;
    		}
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
        let lowerBollingerBand = new Object();
        let upperBollingerBand = new Object();
        if(state.cache != null){
          cache = state.cache;
          if(state.cache.goldenCross != null){
            goldenCross = state.cache.goldenCross;
          }
          if(state.cache.lowerBollingerBand != null){
            lowerBollingerBand = state.cache.lowerBollingerBand;
          }
          if(state.cache.upperBollingerBand != null){
            upperBollingerBand = state.cache.upperBollingerBand;
          }
        }

        if (action.responseJson.params.GOLDEN_CROSS_DAY != null) {
          goldenCross["day"] = action.responseJson.params.GOLDEN_CROSS_DAY;
        }
        if (action.responseJson.params.GOLDEN_CROSS_MINUTE != null) {
          goldenCross["minute"] =
            action.responseJson.params.GOLDEN_CROSS_MINUTE;
        }
        cache["goldenCross"] = goldenCross;

        if (action.responseJson.params.LOWER_BOLLINGER_BAND_DAY != null) {
          lowerBollingerBand["day"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_DAY;
        }
        if (action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE != null) {
          lowerBollingerBand["minute"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE;
        }
        cache["lowerBollingerBand"] = lowerBollingerBand;

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
          view: "",
        });
      } else {
        return state;
      }
    }

    case "DATABASE_DETAIL_VIEW":{
      if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "DATABASE_DETAIL"
				});
			
			} else {
        		return state;
    		}
      }

    default:
      return state;
  }
}
