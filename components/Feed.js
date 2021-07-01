import {
  CalendarViewDay,
  Create,
  EventNote,
  Image,
  Subscriptions,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import InputOption from "./InputOption";
import Post from "./Post";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";

function Feed({ posts }) {
  // console.log(posts);
  const [user] = useAuthState(auth);
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  const inputRef = useRef(null);

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection("posts").add({
      message: inputRef.current.value,
      name: user.displayName,
      description: user.email,
      photoUrl: user.photoURL || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    inputRef.current.value = "";
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Create />
          <form>
            <input type="text" ref={inputRef} />
            <button type="submit" hidden onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={Image} title="Photo" color="#70B5F9" />
          <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* Posts */}
      <FlipMove>
        {realtimePosts
          ? realtimePosts?.docs.map((post) => (
              <Post
                key={post.id}
                name={post.data().name}
                description={post.data().description}
                message={post.data().message}
                timestamp={post.data().timestamp}
                photoUrl={post.data().photoUrl}
              />
            ))
          : posts.map((post) => (
              <Post
                key={post.id}
                name={post.name}
                description={post.description}
                message={post.message}
                timestamp={post.timestamp}
                photoUrl={post.photoUrl}
              />
            ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
