/**
 * 
 */
 export default function tradeBlasterReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'TRADEBLASTER_INPUT_CHANGE': {
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
		case 'TRADEBLASTER_LIST': {
			if (action.responseJson != null && action.responseJson.params != null) {

				let itemCount = {};
  				if (action.responseJson.params.TRADECOUNT != null) {
    				itemCount.tradeCount = action.responseJson.params.TRADECOUNT;
  				}
				if (action.responseJson.params.HISTORICAL_ANALYSIS_COUNT != null) {
    				itemCount.historicalAnalysisCount = action.responseJson.params.HISTORICAL_ANALYSIS_COUNT;
  				}

				let items = {};
  				if (action.responseJson.params.TRADES != null) {
    				items.trades = action.responseJson.params.TRADES;
  				}
				if (action.responseJson.params.HISTORICAL_ANALYSES != null) {
    				items.historicalAnalyses = action.responseJson.params.HISTORICAL_ANALYSES;
  				}

				return Object.assign({}, state, {
					itemCount: itemCount,
					items: items,
					item: {},
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

		case 'TRADEBLASTER_ADD_ITEM': {
			let clone = Object.assign({}, state);
			clone.view = "ADD";
			clone.item = {};
			return clone;
    	}
		case 'TRADEBLASTER_CANCEL_ITEM': {
			let clone = Object.assign({}, state);
			clone.view = "";
			clone.item = {};
			return clone;
    	}
		case 'TRADEBLASTER_HISTORICAL_DETAIL_VIEW':{
			if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "HISTORICAL_DETAIL"
				});
			
			} else {
        		return state;
    		}
		}

		case 'TRADEBLASTER_MODIFY_ITEM': {
			if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "MODIFY"
				});
			
			} else {
        		return state;
    		}
    	}

		case 'TRADEBLASTER_HISTORICAL_ANALYSIS_VIEW': {
			if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "HISTORICAL_ANALYSIS"
				});
			
			} else {
        		return state;
    		}
    	}
		case 'TRADEBLASTER_SAVE_ITEM': {
			if (action.responseJson != null && action.responseJson.params != null) {
				let item = {};
  				if (action.responseJson.params.ITEM != null) {
    				item = action.responseJson.params.ITEM;
  				}
				return Object.assign({}, state, {
					item: item,
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