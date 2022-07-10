import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import NavigationView from "./coreView/navigation/navigation-view";
import LoginContainer from "./core/usermgnt/login-container";
import StatusView from "./coreView/status/status-view";
import MemberContainer from "./member/member-container";
import PublicContainer from "./public/public-container";
import ServiceContainer from "./public/service-container";
import AdminContainer from "./admin/admin-container";
import SystemContainer from "./system/system-container";
import AccessDeniedContainer from "./core/usermgnt/accessdenied-container";
import fuLogger from './core/common/fu-logger';

function PageContainer() {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		fuLogger.log({level:'TRACE',loc:'PageContainer::useEffect',msg:"page "+ location.pathname});
		if (session.callComplete == true && session.sessionActive == true && session.status === 'JUST_LOGGEDIN') {
			fuLogger.log({level:'TRACE',loc:'PageContainer::session active',msg:"page "+ location.pathname});
			dispatch({ type: "CLEAR_SESSION_LOGIN" });
			navigate("/member");
		} else if (session.callComplete == true && session.sessionActive == true && location.pathname === "/") {
			navigate("/member");
		} else if (session.callComplete == true && session.sessionActive == false) {
			if (location.pathname === "/member-logout") {
		    	navigate("/login");
		    } else if ( !(location.pathname === "/" || location.pathname === "/login" 
	    		|| location.pathname === "/about" || location.pathname === "/services")) {
	    		navigate("/");
	    	}
		}
	}, [session]);
	
	
	if (session.callComplete == true && session.sessionActive == true) {
		fuLogger.log({level:'TRACE',loc:'PageContainer::render session Active',msg:"page "+ location.pathname });
     return (
      <Routes>
        <Route path="/member/*" element={<MemberContainer location={location} navigate={navigate}/>} />
        <Route path="/access-denied" element={<AccessDeniedContainer />} />
        <Route path="/admin/*" element={<AdminContainer location={location} navigate={navigate}/>} />
        <Route path="/system/*" element={<SystemContainer location={location} navigate={navigate}/>} />
      </Routes>

      );
    } else {
		fuLogger.log({level:'TRACE',loc:'PageContainer::render session NOT Active',msg:"page "+ location.pathname });
      return (
        <div>
        <NavigationView appPrefs={appPrefs} activeTab={location.pathname}
          menus={appMenus.PUBLIC_MENU_RIGHT}/>
         <StatusView />
          <Routes>
            <Route path="/*" element={<PublicContainer location={location} navigate={navigate}/>}/>
            <Route path="/login/*" element={<LoginContainer location={location} navigate={navigate}/>}/>
            <Route path="/about/*" element={<PublicContainer location={location} navigate={navigate}/>}/>
            <Route path="/services/*" element={<ServiceContainer location={location} navigate={navigate}/>}/>
          </Routes>
        </div>
      );
    }

}

export default PageContainer;
