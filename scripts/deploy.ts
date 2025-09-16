import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const StudentVoting = await ethers.getContractFactory("StudentVoting");
  
  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const studentVoting = await StudentVoting.deploy(verifierAddress);
  
  await studentVoting.waitForDeployment();
  
  const contractAddress = await studentVoting.getAddress();
  
  console.log("StudentVoting contract deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    verifier: verifierAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    './src/contracts/contract-info.json',
    JSON.stringify(contractInfo, null, 2)
  );
  
  console.log("Contract info saved to src/contracts/contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
