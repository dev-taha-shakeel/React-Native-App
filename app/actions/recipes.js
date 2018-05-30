import * as types from './types';
import Api from '../lib/api';

export function addRecipe(){
	return{
		type: types.ADD_RECIPE

	}
}

export function fetchedRecipes(ingredients){
	return(dispatch, getState) => {
		//console.log(ingredients);
		//console.log(getState());
		//make ASYN Call to webservice
		const params = [
		`i=${encodeURIComponent(ingredients)}`,
		'p=1'
		].join('&');
		return Api.get(`/api/?${params}`).then(resp => {
			console.log(resp);
			dispatch(setSearchedRecipes({recipes:resp}));
		}).catch((ex) => {
			console.log(ex);
		});
		
	}
}

export function setSearchedRecipes({recipes}) {
	return{
		type: types.SET_SEARCHED_RECIPES,
		recipes
	}
}

export function deleteRecipe(){
	return{
		type: types.DELETE_RECIPE
	}
}