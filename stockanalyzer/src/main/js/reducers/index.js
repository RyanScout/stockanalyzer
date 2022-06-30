import { combineReducers } from "redux";
import appPrefs from "./apppref-reducer";
import appMenus from "./appmenu-reducer";
import session from "./session-reducer";
import status from "./status-reducer";
import stocks from "../stocks/stocks-reducer";
import crypto from "../crypto/crypto-reducer";
import dashboard from "../dashboard/dashboard-reducer";
import orders from "../orders/orders-reducer";
import database from "../database/database-reducer";
import historicalAnalysis from "../historical_analysis/historical-analysis-reducer";
import trade from"../trade/trade-reducer";

const rootReducer = combineReducers({
  appPrefs,
  appMenus,
  session,
  status,
  stocks,
  crypto,
  dashboard,
  trade,
  orders,
  database,
  historicalAnalysis,
});

export default rootReducer;
