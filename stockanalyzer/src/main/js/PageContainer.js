import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContainer from "./dashboard/dashboard-container";
import CryptoContainer from "./crypto/crypto-container";
import StocksContainer from "./stocks/stocks-container";
import TradeContainer from "./trade/trade-container";
import OrdersContainer from "./orders/orders-container";
import DatabaseContainer from "./database/database-container";
import Navbar from "./navigation";
import HistoricalAnalysisContainer from "./historical_analysis/historical-analysis-container";

function PageContainer() {
  return (
    <Routes>
      <Route exact path="/" element={<DashboardContainer />} />
      <Route path="/crypto/*" element={<CryptoContainer />} />
      <Route path="/stocks/*" element={<StocksContainer />} />
      <Route path="/historical_analysis/*" element={<HistoricalAnalysisContainer/>} />
      <Route path="/trade/*" element={<TradeContainer />} />
      <Route path="/orders/*" element={<OrdersContainer />} />
      <Route path="/database/*" element={<DatabaseContainer />} />
    </Routes>
  );
}

export default PageContainer;
