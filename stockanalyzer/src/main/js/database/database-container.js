import React , {useEffect} from "react";
import DatabaseView from "./view/database-view";
import * as databaseActions from "./database-actions";
import { useSelector , useDispatch} from "react-redux";


function DatabaseContainer(){
const databaseState = useSelector((state => state.database));
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(databaseActions.getCache());
  }, []);

function backload(){
    databaseActions.backload();
};

  return <DatabaseView backload={backload} itemState = {databaseState} />;
}

export default DatabaseContainer;
