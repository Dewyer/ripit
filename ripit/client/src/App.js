import React, { Component } from "react";
import RipitContract from "./contracts/Ripit.json";
import getWeb3 from "./utils/getWeb3";
import styled from 'styled-components'
import UsernameBox from "components/UsernameBox";
import Poster from "components/Poster";
import PostContainer  from "components/PostContainer";

export default class App extends Component {
	state = {
		storageValue: 0, 
		web3: null, 
		accounts: null, 
		contract: null, 
		latestIndex: 0,
		username:"",
		posts: [ ]
	};

	componentDidMount = async () => {
		this.newPostEvent = this.newPostEvent.bind(this);
		this.getPostByIndex = this.getPostByIndex.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.doPost = this.doPost.bind(this);
		this.initPosts = this.initPosts.bind(this);
		this.getPostByTransaction = this.getPostByTransaction.bind(this);

		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = RipitContract.networks[networkId];
			const instance = new web3.eth.Contract(
				RipitContract.abi,
				deployedNetwork && deployedNetwork.address,
			);

			//add: 0x1145797DdA973a7EB1a9C503e08C4f7E1E8DFE08
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.

			//console.log(JSON.stringify(instance.events));
			instance.events.NewPost(null,(index) => { this.newPostEvent(index) })

			this.setState({ web3, accounts, contract: instance,posts: [ ] }, this.initPosts);

		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};

	getPostByTransaction(post)
	{
		let pp = {};
		pp.body = post.body;
		pp.username = post.username;
		//console.log(JSON.stringify(post));
		pp.time = (new Date(parseInt(post.timeStamp._hex))).toTimeString().split(" ")[0];
		return pp;
	}

	async initPosts()
	{
		let latest = await this.state.contract.methods.getLatestIndex().call({ from: this.state.accounts[0] });
		let initPosts =  [ ];
		for(let ii = 0; ii < latest;ii++)
		{
			let post =this.getPostByTransaction(await this.getPostByIndex(ii));
			post.index = ii;
			initPosts.push(post);
		}
		this.setState({latestIndex:latest,posts:initPosts});
	}

	async getPostByIndex(index)
	{
		let post = await this.state.contract.methods.getPost(index).call({ from: this.state.accounts[0] });
		//console.log(JSON.stringify(post));
		return post;

	}

	async newPostEvent(index) {
		setTimeout(async ()=> {
			console.log("now")
			let latest = await this.state.contract.methods.getLatestIndex().call({ from: this.state.accounts[0] });
			console.log("new post: " + this.state.latestIndex+" / "+latest);
			let latestPosts =  [ ];
			for(let ii = parseInt(this.state.latestIndex); ii < latest;ii++)
			{
				console.log("kkeeek "+ii);
				let post = this.getPostByTransaction(await this.getPostByIndex(ii));
				post.index = ii;
				latestPosts.push(post);
			}
			let allP = this.state.posts.concat(latestPosts);
			this.setState({posts:allP,latestIndex:latest});
		},1);
	}

	onChangeUsername(txt)
	{
		this.setState({username:txt});
	}

	async doPost(post)
	{
		//console.log(post);
		let r = await this.state.contract.methods.post(this.state.username,post,Date.now()).send({from:this.state.accounts[0]});
		console.log(JSON.stringify(r));
	}

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<Container>
				<HeadCont><Icon src="/ic.png"/><h1>RIPPIT</h1></HeadCont>
				<UsernameBox onChangeUsername={this.onChangeUsername}/>
				<PostContainer posts={this.state.posts}/>
				<Poster onPost={this.doPost}/>

			</Container>
		);
	}
}

const Container = styled.div`
	display:flex;
	justify-content:flex-start;
	align-items:center;
	text-align:center;
	flex-direction:column;
	width:100vw;
	height:100vh;
`
const HeadCont = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	text-align:center;
	flex-direction:row;
`
const Icon = styled.img`
	width:40px;
	height:40px;
	margin-right:15px;
`


