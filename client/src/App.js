import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";

function App() {

  const [data, setData] = useState(null)
  const [currentUser, setCurrentUser] = useState(document.cookie.userName)
  const [currentRoom, setCurrentRoom] = useState(document.cookie.roomName)
  const [currentURL, setCurrentURL] = useState(
    `/${currentUser}/${currentRoom}`
  );
  
  useEffect(() => {
    if (
      !currentURL.includes(currentUser) &&
      !currentURL.includes(currentRoom) &&
      currentUser !== undefined &&
      currentRoom !== undefined 
    ) {
      setCurrentUser(document.location.href.split("/")[3]);
      setCurrentURL(`/${currentUser}/${currentRoom}`);
      
      fetch(currentURL)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
        });
    } else {
      return null
    }
  }, [currentRoom, currentURL, data]);

  console.log(data);
  if (data !== null) {
    return (
      <Chat data={data} setData={setData} currentUser={currentUser} setCurrentUser={setCurrentUser} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} currentURL={currentURL} setCurrentURL={setCurrentURL}></Chat>
    )
  } else {
    return null;
  }
}

export default App;
