import React, { Component } from 'react';
//import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import Home from './Home';
/*const {
	View,
	Text,
	TouchableHighlight,
} = ReactNative;*/

class AppContainer extends Component {
	/*constructor(props) {
	  super(props);
	
	  
	}*/
	/*incrementRecipeCount(){
		this.setState({recipeCount: this.state.recipeCount+1});
	}*/



	/*addRecipe(){
		this.props.addRecipe();
	}
	deleteRecipe(){
		this.props.deleteRecipe();
	}*/
	render(){
		return (
				<Home {...this.props}/>
				)
	}
}

function mapStateToProps(state){
	return{}; //recipeCount is a local prop being updated by the Global state.
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer);
/*
export default connect(() => {return{}}, mapDispatchToProps)(AppContainer);*/