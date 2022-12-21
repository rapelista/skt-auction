const hre = require("hardhat");

async function main() {
  const App = await hre.ethers.getContractFactory("App");
  const app = await App.deploy();

  await app.deployed();

  console.log(`Deployed!\nAddress: ${app.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
