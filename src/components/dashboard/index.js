import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateArticle from '../article/CreateArticle';
import MyDialog from '../../shared/Modal';
 
export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const { token } = useAuth();
  console.log(token)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  };
  useEffect(() => {
    axios.get('http://localhost:8000/articles', {
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      console.log(response.data);
      setArticles(response.data.articles);
    }).catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });

  }, [token]);

  return (
    <div>
      
      <div className='articles-outline'>
        <div className='articles-container'>
          {articles && articles.map((article, index) => (
            <Link to={`/article/${article._id}`} key={article._id} className='article-card'>
              <h1>{article.title}</h1>
              <p>{truncateText(article.content, 100)}</p>
              <img src={`http://localhost:8000/uploads/008f37add430450ba8cc9ef1a149e29a`} alt="React Image" />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <b>{article.author}</b>
                <small>{article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString()
                  : 'Invalid Date'}</small>

              </div>
            </Link>
          ))}
        </div>
      </div>
      <aside>
        <div className="sidebar-menu">
          <div className="menuBtn" onClick={() => setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </aside>

      {/* Render your modal component conditionally based on state */}
      {isModalOpen && (
        <CreateArticle
          setIsModalOpen={setIsModalOpen}
          // Add any other props you may need to pass to CreateArticle
        />
      )}
     
    </div>
  );
}
