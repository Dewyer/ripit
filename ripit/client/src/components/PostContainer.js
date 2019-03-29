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
        let content =<BodyParagraph>{post.body}</BodyParagraph>;
        if (post.body.split("#img ").length == 2)
        {
            content = <Himg src={post.body.split("#img ")[1]}/>;
        }
        return(
            <li key={post.index}>
                <PostCont>
                    <PostHeader><UserName>{post.username}</UserName><h4 style={{color:"white"}}>{post.time}</h4></PostHeader>
                    {content}
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
    padding:0;
    width:100%;
`
const PostCont = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    background-color: #FF420E;
    margin-bottom:15px;
    width:100%;
    border-radius:15px;
`

const PostHeader = styled.div`
    display:flex;
    justify-content:space-between;
    width:80%;
    align-items:center;
    flex-direction:row;
`

const BodyParagraph = styled.p`
    text-align:left;
    width:80%;
    color:white;
    font-size:20px;
    word-wrap: break-word;
`

const UserName = styled.h1`
    text-align:left;
    width:80%;
    color:white;
    font-size: 26px;

`

const Himg = styled.img`
    padding:10px;
    display: block;
    max-width:300px;
    max-height:300px;
    width: auto;
    height: auto;

`
