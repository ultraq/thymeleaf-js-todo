/* 
 * Copyright 2018, Emanuel Rabina (http://www.ultraq.net.nz/)
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

import Filter from '../utilities/Filter';

export const APPLY_FILTER = 'APPLY_FILTER';

export const NO_FILTER = new Filter(
	'none',
	todo => todo
);

export const ACTIVE_FILTER = new Filter(
	'active',
	todo => todo.status === 'ACTIVE'
);

export const COMPLETED_FILTER = new Filter(
	'completed',
	todo => todo.status === 'COMPLETED'
);

/**
 * Set the given filter over the todo list.
 * 
 * @param {Filter} filter
 * @return {Object}
 */
export default filter => ({
	type: APPLY_FILTER,
	filter
});
