const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);

const consts = require("./consts");
const drupalLogin = require("./login");

async function getFlags() {
  const userData = drupalLogin();
  Promise.all([userData]).then(() => {
    const voteInfo = fetch(
      `${consts.apiURL}/jsonapi/vote/vote`,
      consts.globalConf
    );
    voteInfo.then(r => {
      // At the moment, this is printing a response before
      // actually loging in.
      console.log(r);
    });
  });
}

getFlags();
// http://drupalvm.test/jsonapi/vote/vote
