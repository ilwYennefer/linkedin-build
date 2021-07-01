import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
} from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import HeaderOption from "./HeaderOption";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <header className="header">
      <div className="header__left">
        <img
          src="https://image.flaticon.com/icons/png/512/174/174857.png"
          alt=""
        />
        <div className="header__search">
          <Search />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption title="Home" Icon={Home} />
        <HeaderOption title="My Network" Icon={SupervisorAccount} />
        <HeaderOption title="Jobs" Icon={BusinessCenter} />
        <HeaderOption title="Messaging" Icon={Chat} />
        <HeaderOption title="Notifications" Icon={Notifications} />
        <HeaderOption
          avatar
          title={user?.displayName}
          onClick={() => auth.signOut()}
        />
      </div>
    </header>
  );
}

export default Header;
