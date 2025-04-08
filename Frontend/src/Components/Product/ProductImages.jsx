import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductImages = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setImages(res.data[0]?.images || []);
      })
      .catch(err => console.error(err));
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <div>Loading images...</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <img
        src={images[index]}
        alt={`Product ${index + 1}`}
        className="rounded shadow-md w-150 max-w-md"
      />
      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
