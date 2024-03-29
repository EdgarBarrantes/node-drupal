const read = require("read");
// We need this in order to store cookies.
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);

// Constants.
const consts = require("./consts");
// Removes node and command.
var args = process.argv.slice(2);

// Read password.
async function loginToDrupal() {
  read(
    {
      prompt: "The username should be the first argument. \nPassword: ",
      silent: true
    },
    (er, password) => {
      // Login to drupaal.
      return postLoginData(`${consts.apiURL}/user/login`, args[0], password);
    }
  );
}

// Function that makes a POST request to get an auth cookie.
async function postLoginData(url, user, pass) {
  // Yeah, Drupal likes it that way.
  const loginPromise = fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "name=" + user + "&pass=" + pass + "&form_id=" + "user_login_form"
  });
  // Yeah not the most awesome we to do it but hey...
  const loginData = await loginPromise;
  const urlFromResponse = loginData.url;
  const splitUrl = urlFromResponse.split("/");
  const userId = splitUrl[splitUrl.length - 1];
  // Prints User ID.
  // console.log("User ID: ", userId);
  const userInfoPromise = fetch(
    `${consts.apiURL}/jsonapi/user/user?filter[uid]=${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      cache: "default",
      credentials: "include"
    }
  );
  let userInfo = await userInfoPromise;
  // Use console.dir to print an object if needed.
  // Shorthand for console.log(util.inspect(obj, {depth: null}));
  // Prints user data.
  // userInfo = await userInfo.json();
  // console.log("User data: ", await userInfo.data);
  return loginPromise;
}

module.exports = loginToDrupal;
