import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import '../css/App.css';
import '../css/Text.css';



function TextBoxContent(props) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [userIP, setUserIP] = useState('Fetching...');
    const serverURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/'  
    : 'http://76.103.38.215:5000/';

    useEffect(() => {
        const newSocket = socketIOClient(serverURL);
        console.log("connected to socket")
        setSocket(newSocket);

        newSocket.on('loadMessages', (loadedMessages) => {
        setMessages(loadedMessages);
        });

    newSocket.on('messageReceived', (receivedMessage) => {
        setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, receivedMessage];
        return updatedMessages;
        });
    });
        // Fetch the ip
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                setUserIP(response.data.ip);
            })
            .catch(error => {
                console.error("Error fetching user IP:", error);
                setUserIP('Unable to fetch IP');
            });
        return () => {
            newSocket.close();
        };
  },  
  [setSocket]);

  const sendMessage = () => {
    if (message) {
      socket.emit('sendMessage', { ip: userIP, text: message });
      setMessage('');
    }
  };

    // get the server's address
    const serverIPAddress = serverURL.split('/')[2].split(':')[0];
    // Callback for handling file uploads
   

    return (
    <div className="App">
        <header className="App-header">
        {/* Message input area */}
        <div className="message-input">
            <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type a message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>

        {/* Messages display area */}
        <div className="message-box">
        {messages.map((msg, index) => (
            <div key={index} className="message">
            <strong className="ip-address">{msg.ip}:</strong>
            {msg.text}
            </div>
        ))}
        </div>
        
        <p className='IPAddress'>Server IP Address: {serverIPAddress}<br />Your IP Address: {userIP}</p>
        

        </header>
    </div>
    );

}

export default TextBoxContent;