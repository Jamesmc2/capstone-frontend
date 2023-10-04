import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useState, useEffect } from "react";
import axios from "axios";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  let authenticationLinks;
  const [user, setUser] = useState({});
  let welcomeMessage;

  const getUser = () => {
    axios.get("http://localhost:3000/current_user.json").then((response) => setUser(response.data));
  };
  useEffect(getUser, []);

  const signupLink = () => {
    console.log("signing up");
    setShowSignup(true);
  };
  const loginLink = () => {
    console.log("handling click");
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  if (localStorage.jwt === undefined) {
    welcomeMessage = "NFL Schedule";
    authenticationLinks = (
      <>
        <li className="nav-item">
          <button className="nav-link" onClick={signupLink}>
            Signup
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={loginLink}>
            Login
          </button>
        </li>
      </>
    );
  } else {
    welcomeMessage = `${user.name}`;
    authenticationLinks = (
      <>
        <li className="nav-item">
          <LogoutLink />
        </li>
      </>
    );
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark-subtle">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {welcomeMessage}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              {authenticationLinks}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Modal show={showLogin} onClose={closeLogin}>
        <Login />
      </Modal>
      <Modal show={showSignup} onClose={closeSignup}>
        <Signup />
      </Modal>
    </header>
  );
}
