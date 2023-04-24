
const contractABI_ = [
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

const contractABI = contractABI_;
const contractAddress = "0x5FD14D4BC74Deb3C52b62C9238F5e3ff50fde2d5";

const cryptoSender = new web3.eth.Contract(contractABI, contractAddress);

const toAddressInput = document.getElementById("toAddress");
const amountInput = document.getElementById("amount");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", function() {
    const toAddress = toAddressInput.value;
    const amount = amountInput.value;

    if (toAddress === "" || amount === "") {
        alert("Please enter valid recipient address and amount");
        return;
    }

    const amountWei = web3.utils.toWei(amount, "ether");

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
