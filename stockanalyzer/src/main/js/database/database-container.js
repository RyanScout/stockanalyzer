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
        dispatch(databaseActions.getSymbol(item.tradeSignal, item.symbol));
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

  return (
    <DatabaseView
      onOption={onOption}
      itemState={databaseState}
      inputChange={inputChange}
    />
  );
}

export default DatabaseContainer;
