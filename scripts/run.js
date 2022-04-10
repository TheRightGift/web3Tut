const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    let wavers = [];
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    let waveObj = {
        address: randomPerson.address,
        waveCount: 1
    }
    if(wavers.length < 1){//empty        
        wavers = [...wavers, waveObj];
        console.log(`User with address ${randomPerson.address} just waved for the first time`);
    } else {//!empty
        let existingWaver = wavers.find((waver) => {
            waver.address == randomPerson.address
        });

        if(existingWaver){//user has waved before
            existingWaver.waveCount += 1;

            console.log(`User with address ${existingWaver.address} has waved ${existingWaver.waveCount} times`);
        } else {//users initial wave
            wavers = [...wavers, waveObj];
            console.log(`User with address ${existingWaver.address} just waved for the first time`);
        }
    }

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();
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