require('dotenv').config();
const bip39 = require('bip39')
const HDWallet = require('ethereum-hdwallet');
// 获取助记词
const mnemonic = process.env.MNEMONIC;
// 需要生成的地址数
const genNum = process.env.GEN_NUM;

async function getAddresses(mnemonic) {
	const seed = await bip39.mnemonicToSeed(mnemonic); //生成种子
	const hdwallet = HDWallet.fromSeed(seed);
	for (var i = 0; i < genNum; i++) { // 用同一个种子生成多个地址
		const key = hdwallet.derive("m/44'/60'/0'/0/" + i); // 地址路径的最后一位设置为循环变量
		const address = '0x' + key.getAddress().toString('hex'); //地址
		console.log(address); // 地址
	}
}

getAddresses(mnemonic); //执行函数