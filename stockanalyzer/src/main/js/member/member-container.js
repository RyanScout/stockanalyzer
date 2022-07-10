/*
* Author Edward Seufert
*/
'use strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import * as memberActions from './member-actions';
import StatusView from '../coreView/status/status-view';
import LoadingView from '../coreView/status/loading-view';
import NavigationView from '../coreView/navigation/navigation-view';
import ProfileContainer from './profile/profile-container';
import DashboardContainer from './dashboard/dashboard-container';
import LogoutContainer from './logout/logout-container';
import MemberView from '../memberView/member-view';
import CryptoContainer from "./crypto/crypto-container";
import StocksContainer from "./stocks/stocks-container";
import TradeContainer from "./trade/trade-container";
import OrdersContainer from "./orders/orders-container";
import DatabaseContainer from "./database/database-container";
import HistoricalAnalysisContainer from "./historical_analysis/historical-analysis-container";
import fuLogger from '../core/common/fu-logger';
import {PrivateRoute} from '../core/common/router-utils-web';

export default function MemberContainer({location,navigate}) {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	
  	
	useEffect(() => {
    	dispatch(memberActions.init({lang:session.selected.lang}));
  	}, []);

  	const changeTab = (code,index) => {
      navigate(index);
  	}

    fuLogger.log({level:'TRACE',loc:'MemberContainer::render',msg:"path "+ location.pathname});

    let myMenus = [];
    if (appMenus != null && appMenus[appPrefs.memberMenu] != null) {
      myMenus = appMenus[appPrefs.memberMenu];
    }
    let profileMenu = [];
    if (appMenus != null && appMenus.MEMBER_PROFILE_MENU_TOP != null) {
    	profileMenu = appMenus.MEMBER_PROFILE_MENU_TOP;
    }
    let myPermissions = {};
    if (session != null && session.selected != null && session.selected.permissions != null) {
      myPermissions = session.selected.permissions;
    }
    if (myMenus.length > 0) {
      return (
        <MemberView>
          <NavigationView appPrefs={appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={changeTab} activeTab={location.pathname} user={session.selected} profileMenu={profileMenu}/>
          <StatusView/>
          <Routes>
            <Route index element={<DashboardContainer location={location} navigate={navigate}/>} />
      		<Route element={<PrivateRoute permissions={myPermissions} code="MTATRADE" minRights="W" pathto="/access-denied"/>} >
				<Route path="/ta-trade/*" element={<TradeContainer location={location} navigate={navigate}/>} />
			</Route>
			<Route element={<PrivateRoute permissions={myPermissions} code="MTAHA" minRights="W" pathto="/access-denied"/>} >
				<Route path="/ta-historical-analysis/*" element={<HistoricalAnalysisContainer location={location} navigate={navigate}/>} />
			</Route>
      		<Route element={<PrivateRoute permissions={myPermissions} code="MTACACHE" minRights="W" pathto="/access-denied"/>} >
				<Route path="/ta-database/*" element={<DatabaseContainer location={location} navigate={navigate}/>} />
			</Route>
            <Route element={<PrivateRoute permissions={myPermissions} code="MP" minRights="W" pathto="/access-denied"/>} >
				<Route path="/profile/*" element={<ProfileContainer location={location} navigate={navigate}/>} />
			</Route>
            <Route element={<PrivateRoute permissions={myPermissions} code="ML" pathto="/access-denied"/>} >
				<Route path="/logout/*" element={<LogoutContainer location={location} navigate={navigate}/>} />
			</Route>
            <Route path="/admin" render={() => (
              <Redirect to="/admin"/>
            )}/>
          </Routes>
        </MemberView>
      );
    } else {
      	return (
        	<MemberView> <LoadingView/>
        	</MemberView>
      	);
    }
}

