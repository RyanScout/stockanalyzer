import React, { useEffect } from "react";
import DatabaseView from "./view/database-view";
import DatabaseDetailView from "./view/database-detail-view";
import DatabaseModifyView from "./view/database-modify-view";
import * as databaseActions from "../database/database-actions";
import { useSelector, useDispatch } from "react-redux";

function DatabaseContainer() {
  const databaseState = useSelector((state) => state.database);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(databaseActions.getCache());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "SAVE": {
        onSave();
        return true;
      }
      case "BACKLOAD":
        databaseActions.backload();
        return true;
      case "CREATE_GLOBALS":
        dispatch(databaseActions.createGlobals());
        return true;
      case "GET_SYMBOL":
        dispatch(databaseActions.getSymbol(item.tradeSignal, item.symbol));
        return true;
      case "DETAIL_VIEW":
        dispatch(databaseActions.databaseDetailView(item));
        return true;
      case "MODIFY_VIEW":
        dispatch(databaseActions.databaseModifyView(item));
        return true;
      case "CANCEL": {
        dispatch(databaseActions.cancelItem());
        return true;
      }
    }
  }

  function onSave() {
    if (databaseState.item != null) {
      dispatch(databaseActions.saveItem(databaseState.item));
    }
  }

  function inputChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        val = event.target.value;
      } else val = event;
      let field = event.target.id;
      dispatch(databaseActions.inputChange(field, val));
    }
  }

  function inputItemChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        val = event.target.value;
      } else val = event;
      let field = event.target.id;
      dispatch(databaseActions.inputItemChange(field, val));
    }
  }

  if (
    databaseState != null &&
    databaseState.view != "DATABASE_DETAIL" &&
    databaseState.view != "DATABASE_MODIFY"
  ) {
    return (
      <DatabaseView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputChange}
      />
    );
  } else if (databaseState.view == "DATABASE_MODIFY") {
    return (
      <DatabaseModifyView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputItemChange}
      />
    );
  } else if (databaseState.view == "DATABASE_DETAIL") {
    return <DatabaseDetailView onOption={onOption} itemState={databaseState} />;
  } else {
    return <div> Loading... </div>;
  }
}

export default DatabaseContainer;
