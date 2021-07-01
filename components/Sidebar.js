/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Sidebar() {
  const [user] = useAuthState(auth);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://pbs.twimg.com/profile_banners/44196397/1576183471/1080x360"
          alt=""
        />
        <Avatar src={user.photoURL} className="sidebar__avatar">
          {user.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">2,448</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent </p>
        {recentItem("spacex")}
        {recentItem("tesla")}
        {recentItem("dogecoin")}
        {recentItem("spacex")}
        {recentItem("spacex")}
        {recentItem("spacex")}
      </div>
    </div>
  );
}

export default Sidebar;
