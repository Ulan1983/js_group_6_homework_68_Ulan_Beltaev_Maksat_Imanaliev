import axios from "../axios-orders";

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';

export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const FETCH_COUNTER_ERROR = 'FETCH_COUNTER_ERROR';

export const FETCH_TO_DO_LIST_REQUEST = 'FETCH_TO_DO_LIST_REQUEST';
export const FETCH_TO_DO_LIST_SUCCESS = 'FETCH_TO_DO_LIST_SUCCESS';
export const FETCH_TO_DO_LIST_ERROR = 'FETCH_TO_DO_LIST_ERROR';


export const fetchCounterRequest = () => {
	return {type: FETCH_COUNTER_REQUEST};
};

export const fetchCounterSuccess = counter => {
	return {type: FETCH_COUNTER_SUCCESS, counter};
};

export const fetchCounterError = error => {
	return {type: FETCH_COUNTER_ERROR, error};
};

export const postCounterInDataBase = () => {
	return (dispatch, getState) => {
		dispatch(fetchCounterRequest(true));
		const counter = getState().counter;
		axios.put('/counter.json', counter).then(() => {
			dispatch(fetchCounter());
		}, error => {
			dispatch(fetchCounterError(error));
		})
	}
};

export const fetchCounter = () => {
	return dispatch => {
		dispatch(fetchCounterRequest());
		axios.get('/counter.json').then(response => {
			dispatch(fetchCounterSuccess(response.data));
		}, error => {
			dispatch(fetchCounterError(error));
		})
	}
};

export const incrementCounter = () => {
	return dispatch => {
		dispatch ({type: INCREMENT});
		dispatch(postCounterInDataBase());
	}
};

export const decrementCounter = () => {
	return dispatch => {
		dispatch ({type: DECREMENT});
		dispatch(postCounterInDataBase());
	}
};

export const addCounter = amount => {
	return dispatch => {
		dispatch ({type: ADD, amount});
		dispatch(postCounterInDataBase());
	}
};

export const subtract = amount => {
	return dispatch => {
		dispatch ({type: SUBTRACT, amount});
		dispatch(postCounterInDataBase());
	}
};

export const fetchToDoListRequest = () => {
	return {type: FETCH_TO_DO_LIST_REQUEST};
};

export const fetchToDoListSuccess = tasks => {
	return {type: FETCH_TO_DO_LIST_SUCCESS, tasks};
};

export const fetchToDoListError = error => {
	return {type: FETCH_TO_DO_LIST_ERROR, error};
};

export const fetchToDoList = () => {
	return dispatch => {
		dispatch(fetchToDoListRequest());
		axios.get('/tasks.json').then(response => {
			dispatch(fetchToDoListSuccess(response.data));
		}, error => {
			dispatch(fetchToDoListError(error));
		})
	}
};

export const sendToDo = data => {
	return dispatch => {
		dispatch(fetchToDoListRequest());
		axios.post('/tasks.json', data).then(() => {
			dispatch(fetchToDoList());
		}, error => {
			dispatch(fetchToDoListError(error));
		})
	}
};

export const removeToDo = id => {
	return dispatch => {
		dispatch(fetchToDoListRequest());
		axios.delete('/tasks/' + id + '.json').then(() => {
			dispatch(fetchToDoList());
		}, error => {
			dispatch(fetchToDoListError(error));
		})
	}
};

