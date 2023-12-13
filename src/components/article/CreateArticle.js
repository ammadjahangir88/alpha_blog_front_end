// CreateArticle.js

import React, { useState } from 'react';
import "./CreateArticle.css"
const CreateArticle = ({ setIsModalOpen }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform any actions with formData (e.g., send to server)
        console.log('Form Data:', formData);

        // Reset the form
        setFormData({
            title: '',
            content: '',
            image: null,
        });
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                    Close
                </button>
                {/* Add your content here */}
                <h2>Create Article</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <br />

                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
                    <br />

                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    );
};

export default CreateArticle;
