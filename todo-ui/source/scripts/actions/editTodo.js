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

import updateTodo from './updateTodo.js';

/**
 * Update the value of a todo item.
 * 
 * @param {String} todoId
 * @param {String} value
 * @return {Function}
 *   A redux thunk for updating the server with the new value and then
 *   reflecting that in the store.
 */
export default (todoId, value) => (dispatch, getState) => {
	let todo = getState().todos.find(todo => todo.id === todoId);
	return updateTodo({
		...todo,
		value
	})(dispatch);
};
