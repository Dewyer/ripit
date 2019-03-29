import React, { Component } from "react";
import styled from 'styled-components'
import InputField from "components/InputField";

export default class UsernameBox extends Component {

	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
	}

	onChangeUsername(val)
	{
		//console.log(val);
		this.setState({username:val});
		this.props.onChangeUsername(val);
	}

	render() {
		return (
			<Container>
				<h2>Pick a username:</h2>
				<InputField placeholder={"Username"} height={40} width={200} onChange={this.onChangeUsername}/>	
			</Container>
		);
	}
}

const Container = styled.div`
	display:flex;
	justify-content:space-around;
	align-items:center;
	text-align:center;
	flex-direction:column;
	width:220px;
	height:100px;
`