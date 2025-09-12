import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <p>{message}</p>

}

export default App
