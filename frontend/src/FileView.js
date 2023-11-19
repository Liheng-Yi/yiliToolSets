import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './App.css';


function fileView(props) {
    const [pdfList, setPdfList] = useState([]);


    const serverURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/'  
    : 'http://76.103.38.215:5000/';

    useEffect(() => {
        axios.get(`${serverURL}pdf-list`)
            .then(response => {
                setPdfList(response.data.pdfFiles);
            })
            .catch(error => {
                console.error("Error fetching PDF list:", error);
            });
            
    }, []);

    let encodedPdfList = pdfList.map(fileName => encodeURIComponent(fileName));
    // Callback for handling file uploads
    return (
        <div className="App">
            <header className="App-header">
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
            </header>
        </div>
    );
}

export default fileView;