/**
 * 
 */
'use-strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as dashboardActions from './dashboard-actions';
import DashboardView from "../../memberView/dashboard/dashboard-view";

function DashboardContainer() {
	const dashboardState = useSelector((state) => state.dashboard);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	
	useEffect(() => {
    	dispatch(dashboardActions.getDashboard())
  	}, [])
	
	if (dashboardState != null) {
		return (
			<DashboardView
			itemState={dashboardState}
			appPrefs={appPrefs}
			/>
		);
	} else {
		return (<div> Loading... </div>);
	}
	
}


export default DashboardContainer;