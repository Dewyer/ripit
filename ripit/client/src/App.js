import React, { Component } from "react";
import RipitContract from "./contracts/Ripit.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
	state = {
		storageValue: 0, 
		web3: null, 
		accounts: null, 
		contract: null, 
		latestIndex: 0 
	};

	componentDidMount = async () => {
		this.newPostEvent = this.newPostEvent.bind(this);
		this.getPostByIndex = this.getPostByIndex.bind(this);

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

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.

			instance.events.NewPost().watch((index) => { this.newPostEvent(index) })
			let latest = await instance.methods.getLatestIndex().call({ from: accounts[0] });

			for(let ii = 0; ii < latest;ii++)
			{
				let post = await this.getPostByIndex(ii);
			}

			this.setState({ web3, accounts, contract: instance,latestIndex:latest }, this.runExample);

		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};

	async getPostByIndex(index)
	{
		let post = await this.state.contract.methods.getPost(index).call({ from: this.state.accounts[0] });
		console.log(JSON.stringify(post));
		return post;

	}

	async newPostEvent(index) {
		console.log("new post: " + index);
	}

	runExample = async () => {
		const { accounts, contract } = this.state;

		// Stores a given value, 5 by default.
		await contract.methods.set(5).send({ from: accounts[0] });

		// Get the value from the contract to prove it worked.
		const response = await contract.methods.get().call();

		// Update state with the result.
		this.setState({ storageValue: response });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Good to Go!</h1>
				<p>Your Truffle Box is installed and ready.</p>
				<h2>Smart Contract Example</h2>
				<p>
					If your contracts compiled and migrated successfully, below will show
					a stored value of 5 (by default).
        </p>
				<p>
					Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
				<div>The stored value is: {this.state.storageValue}</div>
			</div>
		);
	}
}

export default App;
