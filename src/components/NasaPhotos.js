import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from './Navbar';

const apikey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhotos() {

    const [photoData, setphotoData] = useState(null);

    useEffect(() => {

    fetchphoto();

    async function fetchphoto() {
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apikey}`
        );
    
    const data = await res.json();
    setphotoData(data)
    }
    }, []);

    if(!photoData) return <div />;

    return(
        <>
        <NavBar />
       

        <div className="nasa-photo">
            {photoData.media_type === "image" ? (
            <img src={photoData.url} alt={photoData.title} className="photo" />)
            : 
            (
                <iframe
                title='space-video'
                src={photoData.url}
                frameBorder="0"
                gesture='media'
                allow='encrypted-media'
                allowFullScreen
                className='photo'
                />
            )}

            <div> 
                <h1>{photoData.title}</h1>
                <p className="date">{photoData.date}</p>
                <p className="explanation">{photoData.explanation}</p>
            </div> 

        </div>
        </>
        
    );
}