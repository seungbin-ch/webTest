//Photo.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Photo() {
  const [photos, setPhotos] = useState(null);

  function searchapi() {
    const url = "https://jsonplaceholder.typicode.com/photos";
    axios.get(url)
      .then((response) => {
        setPhotos(response.data);
        console.log('Photo data fetched successfully');
      })
      .catch((error) => {
        console.error("Error fetching photo:", error);
      });
  }

  if (photos && photos.length > 0) {
    return (
      <div>
        <h1>Photos</h1>
        {photos.map((photo) =>
          photo.id <= 10 ? (
            <div key={photo.id}>
              <h3>{photo.title}</h3>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ) : null
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Photo Gallery</h1>
        <button onClick={searchapi}>Fetch Photos</button>
      </div>
    );
  }
}
