import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const AppActions = {
	changePage(name){
		AppDispatcher.dispatch({
			type: AppActionTypes.CHANGE_PAGE,
			payload: {
				name: name
			}
		});
	}
}

export default AppActions;