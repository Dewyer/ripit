import React, { Component } from "react";
import styled from 'styled-components'
import InputField from "components/InputField";

export default class PostContainer extends Component {

	constructor(props) {
        super(props);
        this.getComponentForPost = this.getComponentForPost.bind(this);
	}

    getComponentForPost(post)
    {
        return(
            <li key={post.index}>
                <PostCont>
                    <PostHeader><h3>{post.username}</h3><h4>{post.time}</h4></PostHeader>
                    <p>{post.body}</p>
                </PostCont>
            </li>
        );
    }

	render() {
        const listOfPosts = this.props.posts.map(this.getComponentForPost);

		return (
			<Container>
                <Lister>
                    {listOfPosts}
                </Lister>
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
	width:620px;
    height:45%;
    margin-top:15px;
    margin-bottom:15px;
`


const Lister = styled.ul`
    margin:0px;
    height:auto;
    overflow-y:auto;
    list-style-type: none;
`
const PostCont = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    background-color: lightcoral;
    margin-bottom:15px;
    width:400px;
    border-radius:15px;
`

const PostHeader = styled.div`
    display:flex;
    justify-content:space-between;
    width:400px;
    align-items:center;
    flex-direction:row;
`
