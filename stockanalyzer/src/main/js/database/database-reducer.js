export default function databaseReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "BACKLOAD": {
      return state;
    }
    case "LIST":{
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
    default:
      return state;
  }
}
