// import cloneDeep from "utils/helpers/cloneDeep";

// export const middleware =
//     ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//         if (typeof action === 'function') {
//             return action(dispatch, getState);
//         }
//         return next(action);
//     };

// export const applyMiddleware = (middleware) => {
// 	debugger
// 	return (store) => {
// 		let {dispatch} = store;
// 		dispatch = middleware(store)(dispatch)
	
// 		return { ...cloneDeep(store), dispatch};
// 	};
// }
	

