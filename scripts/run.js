const EXAMPLE_SKETCH = "#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#aaffff#aaffff#aaffff#aaffff#aaffff#aaffff#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00"
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const sketchContractFactory = await hre.ethers.getContractFactory('SketchPortal');
  const sketchContract = await sketchContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await sketchContract.deployed();

  console.log("Contract deployed to:", sketchContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    sketchContract.address
  );
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));


  let sketchCount;
  sketchCount = await sketchContract.getNumberOfSketches();
  
  let sketchTxn = await sketchContract.sendSketch(EXAMPLE_SKETCH, 'Title');
  await sketchTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    sketchContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  sketchCount = await sketchContract.getNumberOfSketches();

  sketchTxn = await sketchContract.connect(randomPerson).sendSketch(EXAMPLE_SKETCH, 'Title');
  await sketchTxn.wait();

  sketchCount = await sketchContract.getNumberOfSketches();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();