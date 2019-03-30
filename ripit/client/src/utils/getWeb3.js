import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        console.log("Injected wwww detected.");

        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          console.log("inject enabled");

          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          console.log("inject error");
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        console.log("Injected web3 detected.");
        const web3 = window.web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        console.log("No web3 instance injected, using Local web3.");
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });

export default getWeb3;
