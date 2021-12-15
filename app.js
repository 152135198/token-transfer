const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')

const SecretTest = "" // Seed
const RPCtestnet = "https://data-seed-prebsc-1-s1.binance.org:8545/" // Testnet BSC

const RPC = "https://binance.ankr.com/" // BSC main net
const Secret = "" // Seed
const Wallettest = new Provider(SecretTest, RPCtestnet)
const Wallet = new Provider(Secret, RPC)
const web3 = new Web3(Wallettest)


let gas = 100000 // gas limit
let gasPrice = web3.utils.toWei('0.00000001'); // gas price in BNB
let tokenAddress = "0x"; // token contract address  
let sender = "0x"; //  sender adr
let receiver = "0x"; // receiver adr
let Sent = false

const config = {
    from: sender,
    gas,
    gasPrice
  };

// Function (transfer, balanceOf)
let ABI = [{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"name": "","type": "bool"}],"type": "function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
// 
let contract = new web3.eth.Contract(ABI,tokenAddress);

const transferToken = async () => {
    // Loop Checking balance if detected then send token to new wallet instantly
    while(true){
        try { 

            var balanceWei = await contract.methods.balanceOf(sender).call()
            var balance = web3.utils.fromWei(balanceWei)
            // Detect Balance
            if(balance > 0 ){

                if(Sent == false){
                    //Transfer All
                    await contract.methods.transfer(receiver, balanceWei).send(config, function (error, result){
                        if(!error){
                    
                            Sent = true
                            //console.log("sent 1")
                
                        } else{
                          
                        
                        }
                    })
                }
            
            }else if(balance == 0) {

                //console.log("now 0")
                Sent = false
            }

        }catch(e){}
        
    }
    
}
transferToken()



