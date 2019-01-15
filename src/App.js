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
			main:undefined,
			city:undefined,
			weather:undefined,
			country: undefined,
			coord:undefined,
			err: undefined,
			renderOne: false,
			toRender: undefined
		}
		this.onClick = this.onClick.bind(this);
		this.renderTwo = this.renderTwo.bind(this);
	}
	onClick(e) {
		e.preventDefault();
		let city = e.target.elements.city.value;
		let country = e.target.elements.country.value;
		axios.get(`/weather?city=${city}&country=${country}`)
			.then(response => this.getData(response.data))
			.catch(err => {
				this.setState({
					err: {
						message: err.response.data.message,
						status: err.response.status
					},
					main:undefined,
					city:undefined,
					weather:undefined,
					country:undefined,
					coord:undefined,
					renderOne:true
				});
			})
	}
	renderTwo(response) {
		let first = <Weather />
		let second = <Weather />
		let result = <div>	
						<Weather main={response.firstData.main}
					    		 city = {response.firstData.city}
					    		 country = {response.firstData.country}
					    		 err = {response.firstData.err}
					    		 weather = {response.firstData.weather}
					    />
						<Weather main={response.secondData.main}
					    		 city = {response.secondData.city}
					    		 country = {response.secondData.country}
					    		 err = {response.secondData.err}
					    		 weather = {response.secondData.weather}
					    />
					 </div>
		this.setState({
			toRender: result,
			renderOne: false
		})
 	}
	getData(response) {
		if (response.data && response.data.multiple)
			this.renderTwo(response.data)
		else {
			let main = response.main,
			city = response.name,
			weather = response.weather,
			coord = response.coord,
			country =response.sys.country;
			this.setState({
				main: main,
				city: city,
				weather: weather,
				coord: coord,
				err:undefined,
				country: country,
				render: true
			})
		}
	}
	render() {
		let renderWeather = this.state.render?<Weather main={this.state.main}
											    		city = {this.state.city}
											    		country = {this.state.country}
											    		err = {this.state.err}
											    		weather = {this.state.weather}
											    	/>:this.state.toRender?this.state.toRender:'';							    	
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

 