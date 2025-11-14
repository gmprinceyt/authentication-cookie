import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comment,  setComment] = useState("");

  useEffect(()=> {
    axios.post("http://localhost:3000/home", {}, {withCredentials: true}).then((res)=> setComment(res.data))
  },[])
  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="Enter your email "
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="Enter your password"
      />
      <button
        type="submit"
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/signin",
              { email, password },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              alert(res.data);
            });
        }}
      >
        submit
      </button>
      <button
        type="button"
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/logout",
              { email, password },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              alert(res.data);
            });
        }}
      >
        logout
      </button>
      <span>{comment}</span>
    </div>
  );
}

export default App;
