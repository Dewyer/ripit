import React, { Component } from "react";
import styled from 'styled-components'
import InputField from "components/InputField";

export default class Poster extends Component {

	constructor(props) {
		super(props);
        this.state = 
        {
            text:""
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onPost = this.onPost.bind(this);
	}

	onChangeText(txt)
	{
        //console.log(txt.target.value);
        this.setState({text:txt});
        //this.props.onChange(txt.target.value);
    }
    
    onPost()
    {
        this.props.onPost(this.state.text);
    }

	render() {
		return (
            <Container>
                <InputField multilined={true} placeholder={"Your post body goes here."} height={100} width={400}  value={this.state.text} onChange={this.onChangeText}/>
                <Button onClick={this.onPost}>Post</Button>
            </Container>

        );
	}
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:baseline;
    flex-direction:column;
`
const Button = styled.a`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:15px;
    height:30px;
    width:100px;
    background-color:#89DA59;
    cursor: pointer;
    border-radius:15px;
    margin-bottom:15px;

    &:hover
    {
        background-color:#a0ff68;
    }
`