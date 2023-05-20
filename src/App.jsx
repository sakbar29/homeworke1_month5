
import './App.css'
import { Routes, Route, Link, NavLink} from 'react-router-dom';
import Postlist from './pages/Postlist/Postlist';
import layout from './components/layout/layout'




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header>Меню</header>
      <div>
        <p className='p_form'>Создание поста</p>
        <form onSubmit={createPost}>
          <input className='form_input'
            type="text"
            name="title"
            placeholder="Заголовок"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <textarea 
            name="body"
            placeholder="Текст поста"
            value={newPost.body}
            onChange={handleInputChange}
          />
          <button className='btn-form' type="submit">Создать пост</button>
        </form>
      </div>
      <div>
        <h1>Посты</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <footer>Подвал</footer>
    </div>
  );
};

export default App;



