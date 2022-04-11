import { bindActionCreators } from "redux";

/**
 * 
 */
 export default function tradeReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'TRADE_INPUT_CHANGE': {
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
		case 'TRADE_LIST': {
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
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

		case 'TRADE_CACHE': {
			if (action.responseJson != null && action.responseJson.params != null) {

				let symbols = {}
				if (action.responseJson.params.SYMBOLS != null) {
					symbols = action.responseJson.params.SYMBOLS;
				}
				
				let goldenCross = {}
				if(action.responseJson.params.GOLDENCROSS != null){
					for(let i = 0 ; i< symbols.size(); i++){
						Object.assign(goldenCross , symbols[i] , actions.responseJson.params.GOLDENCROSS[i])
					}
				}

				let lowerBollingerBand = {}
				if (action.responseJson.params.LOWERBOLLINGERBAND != null) {
					lowerBollingerBand = action.responseJson.params.LOWERBOLLINGERBAND;
				}
				return Object.assign({}, state, {
					cache: goldenCross,
					item: {},
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

		case 'TRADE_ADD_ITEM': {
			let clone = Object.assign({}, state);
			clone.view = "ADD";
			clone.item = {};
			return clone;
    	}
		case 'TRADE_CANCEL_ITEM': {
			let clone = Object.assign({}, state);
			clone.view = "";
			clone.item = {};
			return clone;
    	}

		case 'TRADE_MODIFY_ITEM': {
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

		case 'TRADE_HISTORICAL_ANALYSIS_VIEW': {
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
		case 'TRADE_DETAIL_VIEW': {
			if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "TRADE_DETAIL"
				});
			
			} else {
        		return state;
    		}
    	}

		case 'TRADE_SAVE_ITEM': {
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