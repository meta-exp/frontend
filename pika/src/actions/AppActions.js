import AppActionTypes from './AppActionTypes';
import AppDispatcher from '../dispatchers/AppDispatcher';

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