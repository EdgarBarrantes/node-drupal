// API URL
const apiURL = "http://drupalvm.test";

// Global conf for get methods.
const globalConf = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  cache: "default",
  credentials: "include"
};

// Returns drupal's X-CSRF-Token
const getTokenData = async () => {
  const url = `${apiURL}/rest/session/token`;
  const data = await fetch(url, globalConf);
  return data.text();
};

// Returns the config necessary to make a patch request.
const patchConf = (body, token) => {
  const conf = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": token
    },
    credentials: "include",
    exposedHeaders: true,
    referrer: "no-referrer",
    body: JSON.stringify(body)
  };
  return conf;
};

module.exports = { globalConf, apiURL, getTokenData, patchConf };
