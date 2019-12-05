/**
 * Reducers index
 *
 * This file generates persistReducers for redux-persist and exports all redux selectors.
 * It also contains the logic for the RESET_APP action.
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer, purgeStoredState } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import personnel, * as fromPersonnel from "./PersonnelReducer";
import group, * as fromGroup from "./GroupReducer";
import report, * as fromReport from "./ReportReducer";
import selected, * as fromSelected from "./SelectedReducer";
import { RESET_APP } from "../actions/types";
import clearReports from "../modules/reportManager";
import GroupReducer from "./GroupReducer";

// personnel reducer config, set persisted data to autoMergeLevel2 to track personnel changes
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const personnelPersistConfig = {
  key: "personnel",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const groupPersistConfig = {
  key: "group",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const reportPersistConfig = {
  key: "report",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const appReducer = combineReducers({
  personnel: persistReducer(personnelPersistConfig, personnel),
  group: persistReducer(groupPersistConfig, group),
  report: persistReducer(reportPersistConfig, report),
  selected
});

// root reducer config, persisted data defaults to autoMergeLevel1
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage
};

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    clearReports();
    // undefined state results in all reducers returning default state
    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    state = undefined;
    purgeStoredState(personnelPersistConfig);
    purgeStoredState(groupPersistConfig);
    purgeStoredState(rootPersistConfig);
    purgeStoredState(reportPersistConfig);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

// Selectors by reducer
export const getPersonnelByLocation = (state, location) =>
  fromPersonnel.getPersonnelByLocation(state.personnel, location);
export const getLastLocationUpdateById = (state, id) => 
  fromPersonnel.getLastLocationUpdateById(state.personnel, id);

export const getSelectedIds = state =>
  fromSelected.getSelectedIds(state.selected);
export const getSelectedLocation = state =>
  fromSelected.getSelectedLocation(state.selected);

export const getVisibilityByLocation = (state, location) =>
  fromGroup.getVisibilityByLocation(state.group, location);
export const getNameByLocation = (state, location) =>
  fromGroup.getNameByLocation(state.group, location);

export const getReport = (state) =>
  fromReport.getReport(state.report);