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
					toRender:this.renderWeather({
								err : {
									  message: err.response.data.message,
								      status: err.response.status
							        }
								})
				});
			})
	}
	renderTwo(response) {
		let style = {display: '-webkit-inline-box'}
		let result = <div style={style}>	
						{this.renderWeather({
							city :response.firstData.name, 
							country : response.firstData.sys.country,
						    main : response.firstData.main,
						    weather : response.firstData.weather,
						    err : response.firstData.err
							})
						}
						{this.renderWeather({
							city :response.secondData.name, 
							country : response.secondData.sys.country,
						    main : response.secondData.main,
						    weather : response.secondData.weather,
						    err : response.secondData.err
							})}
					 </div>
		this.setState({
			toRender: result
		})
 	}
 	renderWeather(props) {
 		return <Weather {...props}
			    />
 	}
	getData(response) {
		if (response.data && response.data.multiple)
			this.renderTwo(response.data)
		else {
			let result = this.renderWeather({
				city :response.name, 
				country : response.sys.country,
			    main : response.main,
			    weather : response.weather,
			    err : response.undefined
			});
			this.setState({
				toRender:result
			})
		}
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

 