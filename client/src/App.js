import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import TipGameContract from "./contracts/TipGame.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
	state = { storageValue: "-", web3: null, accounts: null, contract: null, currentTip: "" };

	componentDidMount = async () => {
		this.makeTip = this.makeTip.bind(this);
		this.onChangeTip = this.onChangeTip.bind(this);

		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = TipGameContract.networks[networkId];
			const instance = new web3.eth.Contract(
				TipGameContract.abi,
				deployedNetwork && deployedNetwork.address,
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance }, this.runExample);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};

	runExample = async () => {
	};

	onChangeTip(value) {
		console.log(JSON.stringify(value.target.value))
		this.setState({currentTip:value.target.value});
	}

	async makeTip()
	{
		const { accounts, contract } = this.state;
		// Stores a given value, 5 by default.
		let res = await contract.methods.makeATip(this.state.currentTip).call({ from: accounts[0] });
		console.log(JSON.stringify(res));
		// Get the value from the contract to prove it worked.

		// Update state with the result.
		this.setState({ storageValue: res? "You nyertél":"You are a looser" });

	}

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h2>Tippeld meg te kuki!</h2>
				<input type="text" value={this.state.currentTip} onChange={this.onChangeTip} />
				<button onClick={this.makeTip}>Ok</button>
				<div>Nyerési állapotod : {this.state.storageValue}</div>
			</div>
		);
	}
}

export default App;
