import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './App.css';


function MainContent(props) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [userIP, setUserIP] = useState('Fetching...');
    const [fileCount, setFileCount] = useState(0);
    const [pdfList, setPdfList] = useState([]);


    const serverURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/'  
    : 'http://76.103.38.215:5000/';

    useEffect(() => {
        document.title = 'File uploader';
        // Change the favicon
        const link = document.createElement('link');
        const oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = '/icon.png'; // Change this to your favicon's path
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);

    
        // Fetch the file count when the component is mounted
        axios.get(`${serverURL}file-count`)
            .then(response => {
                setFileCount(response.data.fileCount);
            })
            .catch(error => {
                console.error("Error fetching file count:", error);
            });
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                setUserIP(response.data.ip);
            })
            .catch(error => {
                console.error("Error fetching user IP:", error);
                setUserIP('Unable to fetch IP');
            });
        axios.get(`${serverURL}pdf-list`)
            .then(response => {
                setPdfList(response.data.pdfFiles);
            })
            .catch(error => {
                console.error("Error fetching PDF list:", error);
            });
            
    }, []);


    // get the server's address
    const serverIPAddress = serverURL.split('/')[2].split(':')[0];
    let encodedPdfList = pdfList.map(fileName => encodeURIComponent(fileName));
    // Callback for handling file uploads
    const onFileChange = async (event) => {
        const files = event.target.files;

        // Set the file count from the response
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', files[0]);
        // encode url incase of # in file name
        
        

        try {
            // Send the file to the server
            const response = await axios.post(`${serverURL}upload`, formData);
            console.log(response.data);


            // After uploading the file:
            setIsUploaded(true);
            setTimeout(() => {
                setIsUploaded(false);
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                {/* File Upload Input */}
                <input 
                    type="file" 
                    onChange={onFileChange} 
                    style={{ display: 'none' }} 
                    id="fileInput"
                />
                {/* Clickable Area */}
                <label htmlFor="fileInput" className="inputbtn">
                    发送文件
                </label>
                <div className="info">
                    {isUploaded && <div className="hint">File receievd</div>}
                    <p className='filesCt'>Number of files in server: {fileCount}</p>
                </div>
                
                <div className="pdf-list">
                    <h3>Download PDF Files:</h3>
                    <ul>
                        {encodedPdfList.map((pdfFile, index) => (
                            <li key={index}>
                                
                                <a href={`${serverURL}saved/pdf/${pdfFile}`} target="_blank" rel="noopener noreferrer">
                                    {pdfFile}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className='IPAddress'>Server IP Address: {serverIPAddress}<br />Your IP Address: {userIP}</p>


            </header>
        </div>
    );
}

export default MainContent;