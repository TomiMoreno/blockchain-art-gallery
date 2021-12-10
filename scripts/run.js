const EXAMPLE_SKETCH = "#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#aaffff#aaffff#aaffff#aaffff#aaffff#aaffff#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00#00ff00"
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const sketchContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const sketchContract = await sketchContractFactory.deploy();
  await sketchContract.deployed();

  console.log("Contract deployed to:", sketchContract.address);
  console.log("Contract deployed by:", owner.address);

  let sketchCount;
  sketchCount = await sketchContract.getTotalWaves();
  
  let sketchTxn = await sketchContract.wave(EXAMPLE_SKETCH);
  await sketchTxn.wait();

  sketchCount = await sketchContract.getTotalWaves();

  sketchTxn = await sketchContract.connect(randomPerson).wave(EXAMPLE_SKETCH);
  await sketchTxn.wait();

  sketchCount = await sketchContract.getTotalWaves();
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