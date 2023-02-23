const hre = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");
const METADATA_URL = "https://nft-collection-sneh1999.vercel.app/api/";
const WHITELIST_CONTRACT_1="0xC8B2BE139c6Bb42601754B62a20aEC550F375e08"
const CRYPTO_DEVS_NFT_CONTRACT= "0x5309Cb5c40911fEF2d28a748F84d9f193F03663B"
const NFT_MARKETPLACE_CONTRACT =  "0x81d250bd5a17D0F828Cf1Dd2Ee93AFE083b9661b"
const  CRYPTO_DEVS_DAO_CONTRACT="0x6399c17cdc3A8c98819DCB21AA9AE3954c3B7cd3"

async function main() {

// //WHITELIST CONTRACT
//   const whitelistContract = await ethers.getContractFactory("Whitelist");
//   const deployedWhitelistContract = await whitelistContract.deploy(10);

//   await deployedWhitelistContract.deployed();

//   console.log("Whitelist Contract Address:", deployedWhitelistContract.address);

//NFT COLLECTION DEPLOYMENT FILE

  // const whitelistContractAddress = deployedWhitelistContract.address
  // const whitelistContractAddress = WHITELIST_CONTRACT_1
  // const metadataURL = METADATA_URL;

  // const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

  // // deploy the contract
  // const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
  //   metadataURL,
  //   whitelistContractAddress
  // );
  // await deployedCryptoDevsContract.deployed();

  // console.log(
  //   "Crypto Devs Contract Address:",
  //   deployedCryptoDevsContract.address
  // );


  // Deploy the FakeNFTMarketplace contract first
  // const FakeNFTMarketplace = await ethers.getContractFactory(
  //   "FakeNFTMarketplace"
  // );
  // const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  // await fakeNftMarketplace.deployed();

  // console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);
  const CRYPTODEVS_NFT_CONTRACT_ADDRESS = CRYPTO_DEVS_NFT_CONTRACT
  const NFT_MARKETPLACE_CONTRACT_ADDRESS= NFT_MARKETPLACE_CONTRACT
  // const CRYPTODEVS_NFT_CONTRACT_ADDRESS = deployedCryptoDevsContract.address
  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
  );
  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

// Async Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



//   const whitelistContract = await ethers.getContractFactory("Whitelist");
//   const deployedWhitelistContract = await whitelistContract.deploy(10);

//   await deployedWhitelistContract.deployed();

//   console.log("Whitelist Contract Address:", deployedWhitelistContract.address);


//NFT COLLECTION DEPLOYMENT FILE

//   const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
//   const whitelistContract = deployedWhitelistContract.address()
//   const metadataURL = METADATA_URL;

//   const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

//   // deploy the contract
//   const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
//     metadataURL,
//     whitelistContract
//   );
//   await deployedCryptoDevsContract.deployed();

//   console.log(
//     "Crypto Devs Contract Address:",
//     deployedCryptoDevsContract.address
//   );
// }
