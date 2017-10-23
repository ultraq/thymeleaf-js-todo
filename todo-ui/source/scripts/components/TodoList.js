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

import {createTodo}          from '../actions/createTodo';
import {editTodo}            from '../actions/editTodo';
import {markCompleted}       from '../actions/markCompleted';
import {addEventDelegate}    from '../utilities/Dom';
import todoListItemsTemplate from '../../../../todo-website/source/templates/todo-list-items.html';

import {$}     from 'dumb-query-selector';
import keycode from 'keycode';

/**
 * Todo list component, which is the main UI for the app.  Looks over actions
 * that aren't to do with individual todo items, and re-renders the todo list
 * when something changes.
 * 
 * @author Emanuel Rabina
 */
export default class TodoList {

	/**
	 * Create a new todo list component.
	 */
	constructor() {

		let $todoList = $('#todo-list');

		// Create new todo items
		$('.new-todo').addEventListener('keypress', event => {
			if (keycode(event) === 'enter') {
				let {target} = event;
				let {value} = target;
				if (value && value.trim()) {
					createTodo(value);
					target.value = '';
				}
			}
		});

		// Toggle a todo item as completed/active when the tick is clicked
		addEventDelegate($todoList, 'click', '.toggle', event => {
			let {target} = event;
			let $todo = target.closest('.todo');
			markCompleted($todo.dataset.todoId);
		});

		// Enter editing mode when item double-clicked
		addEventDelegate($todoList, 'dblclick', 'label', event => {
			let {target} = event;
			let $todo = target.closest('.todo');

			$todo.classList.add('editing');

			let $input = $('.edit', $todo);
			$input.focus();

			function exitEditModeAndUpdateTodo() {
				$todo.classList.remove('editing');
				editTodo($todo.dataset.todoId, $input.value);
				$input.removeEventListener('keypress', onEnter);
				$input.removeEventListener('blur', onBlur);
			}

			function onEnter(event) {
				if (keycode(event) === 'enter') {
					exitEditModeAndUpdateTodo();
				}
			}
			function onBlur(event) {
				exitEditModeAndUpdateTodo();
			}

			$input.addEventListener('keypress', onEnter);
			$input.addEventListener('blur', onBlur);
		});
	}

	/**
	 * Recreate the todo list, returning the HTML string of the new list.
	 * 
	 * @param {Object} store
	 * @param {Object} templateEngine
	 * @return {Promise}
	 */
	render(store, templateEngine) {

		let {todos} = store.getState();
		return templateEngine.process(todoListItemsTemplate, {
			todos
		});
	}
}