import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Article.css';

export default function Article() {
  const { id } = useParams();
  const { token } = useAuth();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/article/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.article);
        setArticle(response.data.article);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8000/comments/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
  
    axios.post(
      "http://localhost:8000/create-comment",
      { text: comment, article: id },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
      .then(() => {
        console.log('Comment submitted:', comment);
        setComment('');
        axios
        .get(`http://localhost:8000/comments/${id}`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setComments(response.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  

  if (!article) {
    // Handle the case where article is still undefined
    return <div>Loading...</div>;
  }

  return (
    <div className='article-container'>
      <h1 className='article-title'>{article.title}</h1>
      <p className='article-content'>{article.content}</p>
      <img
        className='article-image'
        src={`http://localhost:8000/uploads/008f37add430450ba8cc9ef1a149e29a`}
        alt='Article'
      />
      <div className='article-details'>
        <b className='article-author'>{article.author.fullName}</b>
        <small className='article-date'>
          {article.createdAt
            ? new Date(article.createdAt).toLocaleDateString()
            : 'Invalid Date'}
        </small>
      </div>
      <div className='mt-8'>
        <h1 className='text-3xl font-bold mb-4'>Add Comment</h1>
        {/* Add your comment form or input elements here */}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className='w-full p-2 border rounded'
            rows='2'
            placeholder='Type your comment here...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 mt-2 rounded'
          >
            Submit Comment
          </button>
        </form>
      </div>
      <br />
      {comments && comments.map((comment) => (
        <div key={comment._id} className="comment-container">
          <div className="comment-text">
            <h4>{comment.text}</h4>
          </div>
          <div className="comment-author">
            <h6>{comment.author.fullName}</h6>
          </div>
        </div>
      ))}

    </div>
  );
}
