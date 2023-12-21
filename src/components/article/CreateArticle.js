import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CreateArticle.css';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const CreateArticle = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const { token } = useAuth();
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a POST request to the specified endpoint
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, formData,  {
            headers: {
              Authorization: `JWT ${token}`,
            },
          });
  
        // Handle the response as needed (e.g., show a success message)
        console.log('Server Response:', response.data);
  
        // Reset the form
        setFormData({
          title: '',
          content: '',
          image: null,
        });
  
        // Close the modal
        setIsModalOpen(false);
      } catch (error) {
        // Handle any errors that occur during the request
        alert(error.message)
        console.error('Error:', error.message);
      }
   

    // Reset the form
    setFormData({
      title: '',
      content: '',
      image: null,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content p-4">
        <button
          className="close-btn absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Create Article</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <br />

          <label htmlFor="content" className="block mb-2 mt-4">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          <br />

          <label htmlFor="image" className="block mb-2 mt-4">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <br />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
