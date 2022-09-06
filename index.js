const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://few-intensive-model.bsc-testnet.discover.quiknode.pro/bfa08ed2c971a29efdd374c8f8522b01ac86e68e/")

const addressReceiver = '0x30154562b81788b2a4FD126682795A49A02CCaE1'

const privateKeys = ["21ac83c5737e54f0e2d777db3eae2490e65de967c28a94ed3d97801b4f0a8a1e"]


const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.005");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();