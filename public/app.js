// Create a new instance of the web3 library using the injected provider (e.g., MetaMask)
// const web3 = new Web3(window.ethereum);

const contractABI_ = [
    // Replace this with the actual ABI of your CryptoSender smart contract
    // Example ABI:
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        }
      ],
      "name": "sendCrypto",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ];

// Get the contract ABI and address
const contractABI = contractABI_;
const contractAddress = "0x5FD14D4BC74Deb3C52b62C9238F5e3ff50fde2d5";

// Create a new contract instance using the ABI and address
const cryptoSender = new web3.eth.Contract(contractABI, contractAddress);

// Get the UI elements
const toAddressInput = document.getElementById("toAddress");
const amountInput = document.getElementById("amount");
const sendButton = document.getElementById("sendButton");

// Add event listener to the send button
sendButton.addEventListener("click", function() {
    const toAddress = toAddressInput.value;
    const amount = amountInput.value;

    // Validate input
    if (toAddress === "" || amount === "") {
        alert("Please enter valid recipient address and amount");
        return;
    }

    // Convert amount to wei
    const amountWei = web3.utils.toWei(amount, "ether");

    // Send transaction to the smart contract
    cryptoSender.methods.sendCrypto(toAddress).send({value: amountWei})
    .on("transactionHash", function(hash) {
        console.log("Transaction hash: " + hash);
    })
    .on("receipt", function(receipt) {
        console.log("Transaction receipt: " + JSON.stringify(receipt));
        alert("Transaction sent successfully!");
    })
    .on("error", function(error) {
        console.error(error);
        alert("Failed to send transaction");
    });
});
