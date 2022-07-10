/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import reducerUtils from '../core/common/reducer-utils';

export default function memberReducer(state = {}, action) {
  switch(action.type) {
    case 'PROCESS_LOGOUT': {
      return Object.assign({}, state, {user:null});
    }
	case 'USERMGNT_SET_VIEW': {
		if (action.params != null) {
			let clone = Object.assign({}, state);
			clone.view = action.params.value;
			return clone;
		} else {
    		return state;
		}
	}
	case 'USERMGNT_SET_FIELD': {
		if (action.params != null) {
			let inputFields = Object.assign({}, state.inputFields);
			inputFields[action.params.field] = action.params.value;
			let clone = Object.assign({}, state);
			clone.inputFields = inputFields;
			return clone;
		} else {
    		return state;
		}
	}
	case 'MEMBER_PROFILE_INPUT_CHANGE': {
		return reducerUtils.updateInputChange(state,action);
	}
	case 'LOAD_INIT_MEMBER_PROFILE': {
		if (action.responseJson != null && action.responseJson.params != null) {
			// load inputFields
			let inputFields = {};
			let prefForms = reducerUtils.getPrefForms(action);
			for (let i = 0; i < prefForms.MEMBER_PROFILE_FORM.length; i++) {
				if (prefForms.MEMBER_PROFILE_FORM[i].group === "FORM1") {
					let classModel = JSON.parse(prefForms.MEMBER_PROFILE_FORM[i].classModel);
					if (action.responseJson.params.item != null && action.responseJson.params.item[classModel.field]) {
						inputFields[prefForms.MEMBER_PROFILE_FORM[i].name] = action.responseJson.params.item[classModel.field];
					} else {
						let result = "";
						if (prefForms.MEMBER_PROFILE_FORM[i].value != null && prefForms.MEMBER_PROFILE_FORM[i].value != ""){
							let formValue = JSON.parse(prefForms.MEMBER_PROFILE_FORM[i].value);
							if (formValue.options != null) {
								for (let j = 0; j < formValue.options.length; j++) {
									if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
										result = formValue.options[j].value;
									}
								}
							} else if (formValue.referPref != null) {
								let pref = action.appPrefs.prefTexts[formValue.referPref.prefName][formValue.referPref.prefItem];
								if (pref != null && pref.value != null && pref.value != "") {
									let value = JSON.parse(pref.value);
									if (value.options != null) {
										for (let j = 0; j < value.options.length; j++) {
											if (value.options[j] != null && value.options[j].defaultInd == true){
												result = value.options[j].value;
											}
										}
									}
								}
							}
						}
						inputFields[prefForms.MEMBER_PROFILE_FORM[i].name] = result;
					}
				}
			}
			// add id if this is existing item
			if (action.responseJson.params.item != null) {
				inputFields.itemId = action.responseJson.params.item.id;
			}
			return Object.assign({}, state, {
				prefForms: Object.assign({}, state.prefForms, reducerUtils.getPrefForms(action)),
				prefTexts: Object.assign({}, state.prefTexts, reducerUtils.getPrefTexts(action)),
				prefLabels: Object.assign({}, state.prefLabels, reducerUtils.getPrefLabels(action)),
				prefOptions: Object.assign({}, state.prefOptions, reducerUtils.getPrefOptions(action)),
				columns: reducerUtils.getColumns(action),
				itemCount: reducerUtils.getItemCount(action),
				items: reducerUtils.getItems(action),
				listLimit: reducerUtils.getListLimit(action),
				listStart: reducerUtils.getListStart(action),
				orderCriteria: [{'orderColumn':'MEMBER_PROFILE_TABLE_NAME','orderDir':'ASC'}],
				searchCriteria: [{'searchValue':'','searchColumn':'MEMBER_PROFILE_TABLE_NAME'}],
				paginationSegment: 1,
				item : action.responseJson.params.item,
				inputFields : inputFields,
				isModifyOpen: false,
				pageName:"MEMBER_PROFILE",
				isDeleteModalOpen: false,
				errors:null, 
				warns:null, 
				successes:null,
				searchValue:""
			});
		} else {
			return state;
		}
	}
	case 'MEMBER_PROFILE_UPDATE': {
		let myItem = { ...state.item };
		for (let i = 0; i < state.prefForms.MEMBER_PROFILE_FORM.length; i++) {
			if (state.prefForms.MEMBER_PROFILE_FORM[i].group === "FORM1") {
				let classModel = JSON.parse(state.prefForms.MEMBER_PROFILE_FORM[i].classModel);
				myItem[classModel.field] = state.inputFields[state.prefForms.MEMBER_PROFILE_FORM[i].name];
			}
		}
		return Object.assign({}, state, {
			item: myItem
		});
	}
    default:
        return state;
    }
}
