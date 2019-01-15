import React, { Component } from 'react';
export default class form extends Component {

	render() {
	    return (
	      <form onSubmit = {this.props.onClick}>
	      	<input name ="city" type = "text" placeholder= "your city"/>
	      	<input name = "country" type = "text" placeholder= "your country"/>
	      	<button>get weather</button>
	      </form>
	    )
	  }
}