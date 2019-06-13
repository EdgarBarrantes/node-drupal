const read = require("read");
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);

// API URL
const apiURL = "http://drupalvm.test";
var args = process.argv.slice(2);

// Read password.
read(
  {
    prompt: "The username should be the first argument. \nPassword: ",
    silent: true
  },
  function(er, password) {
    postLoginData(`${apiURL}/user/login`, args[0], password);
  }
);

// Function that makes a POST request to get an auth cookie.
function postLoginData(url, user, pass) {
  try {
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      crossDomain: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "name=" + user + "&pass=" + pass + "&form_id=" + "user_login_form"
    })
      .then(r => {
        console.log("Logged... Now printing user info: ");
        // Get User Drupal Id from response
        const urlFromResponse = r.url;
        const splitUrl = urlFromResponse.split("/");
        const userId = splitUrl[splitUrl.length - 1];
        console.log("User ID: ", userId);
        // Please forgive me for this future me.
        // This was done in quite a rush.
        // This should fetch the user name and set it to the state.
        // Afterwards it should be sent as prop to Navigation.
        fetch(`${apiURL}/jsonapi/user/user?filter[uid]=${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          cache: "default",
          credentials: "include"
        })
          .then(r => {
            // console.log(r);
            return r.json();
          })
          .then(r => console.dir(r))
          .catch(er => console.log(er));
        console.log("No cookie 4 you");
      })
      .catch(er => console.log(er));
  } catch (er) {
    console.log(er);
  }
}
