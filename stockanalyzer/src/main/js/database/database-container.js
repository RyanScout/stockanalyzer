import React, { useEffect } from "react";
import DatabaseView from "./view/database-view";
import DatabaseDetailView from "./view/database-detail-view";
import * as databaseActions from "../database/database-actions"
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
        dispatch(databaseActions.getSymbol(item.tradeSignal, item.symbol));
        return true;
      case "DETAIL_VIEW":
        dispatch(databaseActions.databaseDetailView(item));
        return true;
    }
  }

  function inputChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        if (event.target.type === "Number")
          val = parseInt(event.target.value, 0);
        else if (event.target.type == "date")
          val = parseInt(event.target.valueAsNumber / 1000);
        else val = event.target.value;
      } else val = event;
      let field = event.target.id;
      dispatch(databaseActions.inputChange(field, val));
    }
  }

  if (databaseState != null && databaseState.view != "DATABASE_DETAIL") {
    return (
      <DatabaseView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputChange}
      />
    );
  } else if (databaseState.view == "DATABASE_DETAIL") {
    return <DatabaseDetailView
    itemState = {databaseState} />;
  } else {
    return <div> Loading... </div>;
  }
}

export default DatabaseContainer;
