import Cookies from "js-cookie";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { Redirect, useHistory } from "react-router-dom";
import { useStores } from "../../Hooks/useStores";
import "./index.css";

const Login = () => {
  const { authStore } = useStores();
  const history = useHistory();

  const onChangeName = (e: any) => {
    runInAction(() => {
      authStore.username = e.target.value;
    });
  };
  const onPasswordChange = (e: any) => {
    runInAction(() => {
      authStore.password = e.target.value;
    });
  };

  const onLogin = async (e: any) => {
    e.preventDefault();
    await authStore.onLogin();
    history.replace("/");
  };

  const renderForm = () => (
    <form className="login-form-container" onSubmit={onLogin}>
      <img
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        className="login-website-logo"
      />
      <label htmlFor="usernameInput">USERNAME</label>
      <input
        id="usernameInput"
        value={authStore.username}
        className="input-field"
        placeholder="Username"
        // onBlur={}
        onChange={onChangeName}
      />
      <p className="error-message">{authStore.nameErr}</p>
      <label htmlFor="passwordInput">PASSWORD</label>
      <input
        id="passwordInput"
        type="password"
        value={authStore.password}
        className="input-field"
        placeholder="Password"
        // onBlur={this.onPasswordInputChange}
        onChange={onPasswordChange}
      />
      <p className="error-message">{authStore.passErr}</p>
      <button type="submit" className="login-btn">
        Login
      </button>
      <p className="error-message">{authStore.loginErr}</p>
    </form>
  );

  const accessToken = Cookies.get("jwt_token");
  if (accessToken !== undefined) return <Redirect to="/" />;
  return <div className="login-route-container">{renderForm()}</div>;
};

export default observer(Login);
