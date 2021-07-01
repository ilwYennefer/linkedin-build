import { useRef } from "react";
import { auth } from "../firebase";

function Login() {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const profilePic = useRef(null);

  const register = () => {
    if (!name.current.value) {
      return alert("Please enter a full name!");
    }

    auth
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((userAuth) => {
        userAuth.user.updateProfile({
          displayName: name.current.value,
          photoURL: profilePic.current.value,
        });
      })
      .catch((error) => alert(error.message));
  };

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        src="https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2003.png"
        alt=""
      />

      <form>
        <input
          type="text"
          placeholder="Full name (required if registering)"
          ref={name}
        />
        <input
          type="text"
          placeholder="Profile pic URL (optional)"
          ref={profilePic}
        />
        <input type="email" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>{" "}
      </p>
    </div>
  );
}

export default Login;
