import React, { Component } from 'react';
import Form from './components/Form.js';
import Title from './components/Title.js';
import Weather from './components/Weather.js';
import axios from 'axios';
import './App.css';

export default class App extends Component {
	constructor () {
		super();
		this.state = {
			toRender: undefined
		}
		this.onClick = this.onClick.bind(this);
		this.getData = this.getData.bind(this);
	}
	onClick(e) {
		e.preventDefault();
		let city = e.target.elements.city.value;
		let country = e.target.elements.country.value;
		axios.get(`/weather?city=${city}&country=${country}`)
			.then(response => this.getData(response.data))
			.catch(err => {
				this.setState({
					toRender:this.renderWeather([
							undefined,
							undefined,
							undefined,
							undefined,
							undefined,
							{
							  message: "There has been an error while retrieving the weather: " + (err.response && err.response.data ? err.response.data.message : ''),
						      status: err.response && err.response.status
					        }
						])
				});
			})
	}
 	renderWeather(props) {
 		return <Weather city = {props[0]}
			    		country = {props[1]}
			    		main={props[2]}
			    		weather = {props[3]}
			    		local = {props[4]}
			    		err = {props[5]}
			    />
 	}
	getData(response) {
		let result = this.renderWeather([
			response.name, 
			response.country,
		    response.main,
		    response.weather,
		    response.local,
		    undefined
		]);
		this.setState({
		 	toRender:result
		})
	}
	render() {
		let renderWeather = this.state.toRender	
	    return (
	    	<div>
	    		<div className = 'wrapper'>
	    			<div className = 'main'>
	    				<div className="container">
	    					<div className='row'>
		    					<div className = "col-xs-5 title-container" >
		    						<Title />
		    					</div>
		    					<div className='col-xs-7 form-container'>
		    						<Form onClick={this.onClick}/>
		    						{renderWeather} 
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    )
	}
}

 