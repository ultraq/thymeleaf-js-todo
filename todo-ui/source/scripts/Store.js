/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import todos from './reducers/todos';

import {applyMiddleware,
        compose,
        createStore as createReduxStore} from 'redux';
import thunk                             from 'redux-thunk';

/**
 * Create a redux store for the todo app.  Includes integration with the redux
 * devtools extension for browsers.
 * 
 * @param {Object} [initialState]
 * @return {Store}
 */
export function createStore(initialState) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	return createReduxStore(
		todos,
		initialState,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);
}

/**
 * Observe the store for changes.  Adapted from
 * https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 * 
 * @param {Object} store
 * @param {Function} select
 * @param {Function} onChange
 * @return {Function}
 *   A function that lets the observer unsubscribe from store changes.
 */
export function observeStore(store, select, onChange) {

	let currentState = select(store.getState());

	function handleChange() {
		let nextState = select(store.getState());
		if (nextState !== currentState) {
			currentState = nextState;
			onChange(currentState);
		}
	}

	return store.subscribe(handleChange);
}
