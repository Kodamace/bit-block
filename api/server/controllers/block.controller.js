const bent = require("bent");

const fetch = bent("json");

const getBlocks = async (req, res) => {
  let d = new Date();
  let time_in_milliseconds = d.getTime();
  var url = `https://blockchain.info/blocks/${time_in_milliseconds}?format=json`;

  console.log(req.params);
  try {
    var obj = await fetch(url);

    return res.send(obj);
  } catch (e) {
    return console.error(e);
  }
};

const getSingleBlock = async (req, res) => {
  const { block_hash } = req.params;
  const url = `https://blockchain.info/rawblock/${block_hash}`;
  const id = req.params.id;
};

const searchBlocks = async (req, res) => {
  // console.log(req.params);
};

module.exports = {
  getBlocks,
  getSingleBlock,
  searchBlocks,
};
