import Cookies from "js-cookie";
import { flow, makeAutoObservable } from "mobx";

class AuthStore {
  username = "";
  password = "";
  nameErr = "";
  passErr = "";
  loginErr = "";
  accessToken = "";

  isUserLoggedIn = false;

  constructor() {
    makeAutoObservable(this, { onLogin: flow.bound }, { autoBind: true });
  }

  *onLogin(): Generator<any, any, any> {
    const { username, password } = this;
    const userDetails = { username, password };
    const URL = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = yield fetch(URL, options);
    const data = yield response.json();
    if (response.ok) {
      this.saveTokenAndGoHome(data.jwt_token);
    } else {
      this.loginErr = `*${data.error_msg}`;
    }
  }

  onLogout() {
    Cookies.remove("jwt_token");
    this.isUserLoggedIn = false;
  }

  saveTokenAndGoHome(token: string) {
    Cookies.set("jwt_token", token, { expires: 3 });
    console.log("saving token...", token);
    this.isUserLoggedIn = true;
  }
}

export default AuthStore;
