import React, {Component} from 'react';
import ReactNative from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from 'react-native-smart-button';
import {connect} from 'react-redux';
const{
	ScrollView,
	View,
	Text,
	Image,
	TouchableHighlight,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	NatigatorIOS,
	TextInput,
} = ReactNative;



class Home extends Component {

constructor(props) {
	  super(props);
	
	  this.state = {ingredientsInput: '', searching: false};
	}

searchPressed(){
		console.log("Pressed");
		this.setState({searching: true});
		this.props.fetchedRecipes(this.state.ingredientsInput).then( () =>
				this.setState({searching: false})
			);
	}	

recipes(){
	return Object.keys(this.props.searchedRecipes).map(
		key => this.props.searchedRecipes[key]);
}

getList(){
	const recipes = this.recipes();
	console.log('reciepes fetched', recipes);
	if(!this.state.searching && recipes.length){
		return recipes.map((recipe) =>{ 
		return (<View key={recipe.href}>
			<Image source={{uri: recipe.thumbnail}} style={styles.resultImage} />
			<Text style={styles.resultText}>{recipe.title}</Text>
		  </View>);
	})
	}
	
	return(<View style={{ flex: 1 }}>
        <Spinner visible={this.state.searching} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>)
	
} 

closeKeyboard(){
	Keyboard.dismiss();
}

callit(){
	Keyboard.dismiss();
	this.searchPressed()
}

	render(){
		return(
				<TouchableWithoutFeedback onPress={this.closeKeyboard}>
					<View style={styles.scene}>
						<View style={styles.navbar}>
							<Text style={styles.navbarText}>Food Recipe App</Text>
							<Text style={styles.navbarButton}>Menu</Text>
						</View>
						<View style={styles.searchSection}>
							<TextInput style={styles.searchInput}
								returnKeyType='search'
								placeholder='ingredients'
								onChangeText={(ingredientsInput) => this.setState({ingredientsInput})}
								value= {this.state.ingredientsInput}
							/>
							<TouchableHighlight style={styles.searchButton} onPress={this.callit.bind(this)} >
								<Text style={styles.searchButtonText}>
									Fetch
								</Text>
							</TouchableHighlight>
						</View>
						<ScrollView style={styles.scrollSection}>
							{this.getList()}
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			)
	}
}

//StyleSheet Component
const styles= StyleSheet.create({
	scene:{
		flex: 1,
		marginTop: 0,
	},

	searchSection:{
		height: 40,
		borderBottomColor: '#000',
		borderBottomWidth: 1,
		
		flexDirection: 'row'
	},
	searchButton:{
		flex: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#D3D3D3',
		borderWidth: 10,
		borderRadius: 20,
		borderColor: '#D3D3D3',
		padding: 5,
	},
	searchButtonText:{
		fontSize: 20,
	},
	searchBarText:{
		fontSize: 20,
		fontWeight: 'bold',
		
	},
	scrollSection:{
		flex: 0.8

	},
	resultText:{
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFF',
		backgroundColor: '#000'
	},
	resultImage:{
		height: 150,
	},
	searchInput:{
		flex: 0.7,
		height: 40,
		fontSize: 18,

	},
	navbar:{
		flexDirection: 'column',
		height: 60,
		justifyContent: 'center'
		
	},
	navbarText:{
		fontSize: 15,
		fontWeight: 'bold',
		backgroundColor: 'black',
		color: 'white',
		paddingLeft: 15,
		textAlign: 'center'
	},
	navbarButton:{
		fontSize: 15,
		color: 'white',
		backgroundColor: 'black',
		textAlign: 'left',
		paddingLeft: 10,
		paddingBottom: 10,
		justifyContent: 'center'
	}

});

function mapStateToProps(state){
	return{searchedRecipes: state.searchedRecipes}
}

export default connect(mapStateToProps)(Home);