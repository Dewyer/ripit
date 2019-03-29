import React, { Component } from "react";
import styled from 'styled-components'

export default class InputField extends Component {

	constructor(props) {
		super(props);
        this.state = 
        {
            text:""
        };

		this.onChangeText = this.onChangeText.bind(this);
	}

	onChangeText(txt)
	{
        //console.log(txt.target.value);
        this.setState({text:txt.target.value});
        this.props.onChange(txt.target.value);
	}

	render() {

        if (this.props.multilined)
        {
            return(
                <InputMulti typte="text" placeholder={this.props.placeholder} height={this.props.height || 40} width={this.props.width || 200}  value={this.state.text} onChange={this.onChangeText}/>
            );
        }
        else
		return (
            <Input typte="text" placeholder={this.props.placeholder} height={this.props.height || 40} width={this.props.width || 200}  value={this.state.text} onChange={this.onChangeText}/>
		);
	}
}

const Input = styled.input`
    border: 1px solid black;
    border-radius:20px;
    height:${props => props.height == undefined ? "40px" : props.height+"px"};
    width:${props => props.width == undefined ? "200px" : props.width+"px"};
    padding:5px;
    font-size:15pt;
    outline-style:none;
`
const InputMulti = styled.textarea`
    border: 1px solid black;
    border-radius:20px;
    height:${props => props.height == undefined ? "40px" : props.height+"px"};
    width:${props => props.width == undefined ? "200px" : props.width+"px"};
    padding:10px;
    font-size:15pt;
    outline-style:none;
`