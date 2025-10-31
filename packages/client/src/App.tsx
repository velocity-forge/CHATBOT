import { useState, useEffect } from 'react';
import ChatBot from './components/ChatBot';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="p-4">
         <ChatBot />
      </div>
   );
}

export default App;
