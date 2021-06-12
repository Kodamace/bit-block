const bent = require("bent");

const fetch = bent("json");
const getaextraDataForBlock = async (hash) => {
  var url = `https://blockchain.info/rawblock/${hash}`;

  try {
    var extraDataForBlock = await fetch(url);

    return extraDataForBlock;
  } catch (error) {
    return console.error(error);
  }
};

const getBlocks = async (req, res) => {
  let d = new Date();
  let time_in_milliseconds = d.getTime();
  var url = `https://blockchain.info/blocks/${time_in_milliseconds}?format=json`;

  const miners = [
    "ViaBTC",
    "HuobiPool",
    "SlushPool",
    "BTCTOP",
    "EMCDPool",
    "Poolin",
    "AntPool",
    "F2Pool",
  ];

  const difficulty = await getDifficulty();

  try {
    var dataOfRecentBlocks = await fetch(url).then((blocks) => {
      const updatedData = blocks.map((block) => {
        const date = new Date(block.time * 1000);

        const timestamp = date.toLocaleDateString();
        const data = {
          ...block,
          difficulty: difficulty,
          miner: miners[Math.floor(Math.random() * 8)],
          timestamp: timestamp,
        };
        return data;
      });
      return updatedData;
    });

    return res.send(dataOfRecentBlocks);
  } catch (error) {
    return res.status(404).send({
      error: error,
      message: "Error getting blocks",
    });
  }
};

const getConfirmations = async (addr) => {
  var url = `https://blockchain.info/q/addressbalance/${addr}?confirmations=6`;

  try {
    var confirmations = await fetch(url);

    return confirmations;
  } catch (error) {
    return console.error(error);
  }
};

const getDifficulty = async () => {
  var url = `https://blockchain.info/q/getdifficulty`;

  try {
    var difficulty = await fetch(url);

    return difficulty;
  } catch (error) {
    return console.error(error);
  }
};

const getMiner = async () => {
  const miners = [
    "ViaBTC",
    "HuobiPool",
    "SlushPool",
    "BTCTOP",
    "EMCDPool",
    "Poolin",
    "AntPool",
    "F2Pool",
  ];

  var ourArray = [];

  miners.forEach((miner) => {
    var url = `https://blockchain.info/blocks/${miner}?format=json`;

    var blocksForMiner = [
      { hash: "kdskfjsldfjdklsjfkds", value: miner },
      { hash: "dfvdjdsiisjdfksdjkfss", value: miner },
      { hash: "jhdfuyttebbbhejsoosss", value: miner },
    ];
    // var blocksForMiner = await fetch(url)

    // function reduceBlocksToMiners(objectArray, property) {
    //   return objectArray.reduce(function (acc, obj) {
    //     let key = property;
    //     if (!acc[key]) {
    //       acc[key] = [];
    //     }
    //     acc[key].push(obj);
    //     return acc;
    //   }, {});
    // }

    // let data = reduceBlocksToMiners(blocksForMiner, miner);
    ourArray = [...ourArray, ...blocksForMiner];
  });
  const data = ourArray.find((obj) => obj.hash === "kdskfjsldfjdklsjfkds");

  return data.value;
};

const getSingleBlock = async (req, res) => {
  const { block_hash } = req.params;
  var url = `https://blockchain.info/rawblock/${block_hash}`;

  const miners = [
    "ViaBTC",
    "HuobiPool",
    "SlushPool",
    "BTCTOP",
    "EMCDPool",
    "Poolin",
    "AntPool",
    "F2Pool",
  ];

  try {
    var obj = await fetch(url);

    const {
      hash,
      time,
      height,
      n_tx,
      mrkl_root,
      ver,
      bits,
      weight,
      size,
      nonce,
      fee,
      tx,
    } = obj;

    const date = new Date(time);

    const timeStringStamp = date.toLocaleDateString().split("/");

    const timestamp = timeStringStamp.join("-");

    let transactionVolume = tx.reduce(function (accumulator, transaction) {
      return accumulator + transaction.vout_sz;
    }, 0);

    // const confirmationsAddr = tx[0].out[0].addr;

    // let txIds = tx.reduce((acc, curr) => {
    //   return [...acc, curr.hash];
    // }, []);

    const difficulty = await getDifficulty();

    // var confirmations = await getConfirmations(confirmationsAddr);

    const objectData = {
      hash: hash,
      confirmations: Math.floor(Math.random() * 5),
      timestamp: timestamp,
      height: height,
      miner: miners[Math.floor(Math.random() * 8)],
      numberOfTransactions: n_tx,
      difficulty: difficulty,
      mrkl_root: mrkl_root,
      ver: ver,
      bits: bits,
      weight: weight,
      size: size,
      nonce: nonce,
      transactionVolume: transactionVolume,
      reward: "unknown",
      fee: fee,
      tx: tx,
    };

    res.send(objectData);
  } catch (error) {
    res.status(404).send({
      error: error,
      message:
        "unable to get block data something went wrong getting a single block",
    });
  }
};

const searchBlocks = async (req, res) => {
  // console.log(req.params);
};

module.exports = {
  getBlocks,
  getSingleBlock,
  searchBlocks,
};
