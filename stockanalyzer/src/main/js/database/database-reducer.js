export default function databaseReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "DATABASE_BACKLOAD": {
      return state;
    }
    case "DATABASE_LIST":{
      if (action.responseJson != null && action.responseJson.params != null) {

				let stockDay = {};
  				if (action.responseJson.params.STOCKDAY != null) {
    				stockDay = action.responseJson.params.STOCKDAY;
  				}
        let stockMinute = {}
        if (action.responseJson.params.STOCKMINUTE != null) {
          stockMinute = action.responseJson.params.STOCKMINUTE;
        }
				return Object.assign({}, state, {
					stockDay: stockDay,
          stockMinute: stockMinute
				});
			
			} else {
        		return state;
    		}
    }
    case 'DATABASE_CACHE': {
			if (action.responseJson != null && action.responseJson.params != null) {

        let cache= new Object()

				let symbols = {}
				if (action.responseJson.params.SYMBOLS != null) {
					symbols = action.responseJson.params.SYMBOLS;
				}
      
				let goldenCross = new Object()
				if(action.responseJson.params.GOLDENCROSS != null){
					for(let i =0; i< symbols.length; i++){
            let symbol = new Object()
            symbol["DAY:LASTFLASH"] = action.responseJson.params.GOLDENCROSS[i][0]
            symbol["MINUTE:LASTFLASH"] = action.responseJson.params.GOLDENCROSS[i][1]
            symbol["DAY:FLASHED"] = action.responseJson.params.GOLDENCROSS[i][2]
            symbol["MINUTE:FLASHED"] = action.responseJson.params.GOLDENCROSS[i][3]
            symbol["DAY:CHECKED"] = action.responseJson.params.GOLDENCROSS[i][4]
            symbol["MINUTE:CHECKED"] = action.responseJson.params.GOLDENCROSS[i][5]
            goldenCross[symbols[i]] = symbol
					}
          cache["goldenCross"] = goldenCross
				}

				let lowerBollingerBand = new Object()
				if(action.responseJson.params.LOWERBOLLINGERBAND != null){
					for(let i =0; i< symbols.length; i++){
            let symbol = new Object()
            symbol["DAY:LASTFLASH"] = action.responseJson.params.LOWERBOLLINGERBAND[i][0]
            symbol["MINUTE:LASTFLASH"] = action.responseJson.params.LOWERBOLLINGERBAND[i][1]
            symbol["DAY:FLASHED"] = action.responseJson.params.LOWERBOLLINGERBAND[i][2]
            symbol["MINUTE:FLASHED"] = action.responseJson.params.LOWERBOLLINGERBAND[i][3]
            symbol["DAY:CHECKED"] = action.responseJson.params.LOWERBOLLINGERBAND[i][4]
            symbol["MINUTE:CHECKED"] = action.responseJson.params.LOWERBOLLINGERBAND[i][5]
            lowerBollingerBand[symbols[i]] = symbol
					}
          cache["lowerBollingerBand"] = lowerBollingerBand
				}

        let upperBollingerBand = new Object()
				if(action.responseJson.params.UPPERBOLLINGERBAND != null){
					for(let i =0; i< symbols.length; i++){
            let symbol = new Object()
            symbol["DAY:LASTFLASH"] = action.responseJson.params.UPPERBOLLINGERBAND[i][0]
            symbol["MINUTE:LASTFLASH"] = action.responseJson.params.UPPERBOLLINGERBAND[i][1]
            symbol["DAY:FLASHED"] = action.responseJson.params.UPPERBOLLINGERBAND[i][2]
            symbol["MINUTE:FLASHED"] = action.responseJson.params.UPPERBOLLINGERBAND[i][3]
            symbol["DAY:CHECKED"] = action.responseJson.params.UPPERBOLLINGERBAND[i][4]
            symbol["MINUTE:CHECKED"] = action.responseJson.params.UPPERBOLLINGERBAND[i][5]
            upperBollingerBand[symbols[i]] = symbol
					}
          cache["upperBollingerBand"] = upperBollingerBand
				}


				return Object.assign({}, state, {
          symbols: symbols,
					cache: cache,
					item: {},
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

    default:
      return state;
  }
}
