import React, { useEffect } from "react";
import DatabaseView from "./view/database-view";
import * as databaseActions from "./database-actions";
import { useSelector, useDispatch } from "react-redux";

function DatabaseContainer() {
  const databaseState = useSelector((state) => state.database);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(databaseActions.getCache());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "BACKLOAD":
        databaseActions.backload();
        return true;
      case "GET_SYMBOL":
        databaseActions.getSymbol();
        return true;
    }
  }

  return <DatabaseView onOption={onOption} itemState={databaseState} />;
}

export default DatabaseContainer;
