import './index.css';
import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom';

const AddPost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);  
  const [password, setPassword] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = 'MyPortfolioJA20242002'; 
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);  

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/blog/create/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error adding post: ' + response.statusText);
      }

      const data = await response.json();
      console.log(data);  
      setCaption('');
      setImage(null);

      navigate.push('/mini-blog');
    } catch (error) {
      console.error(error);  
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='bg-red-300 flex w-[100vw] h-[100vh]'>
      {!isAuthenticated ? (
        <form className='w-[100%] h-[100%] p-20' onSubmit={handlePasswordSubmit}>
            <h1 className='text-[10rem]'>AUTHORISED PERSONNEL ONLY</h1>
          <div>

            <label className='mx-auto p-1' htmlFor='password'>Password:</label>
            <input
              type='password'
              className='mx-auto p-1'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
          className='border mx-auto p-1' type='submit'>Submit Password</button>
        </form>
      ) : (
        <form className='w-[100%] h-[100%] p-20' onSubmit={handleSubmit}>
            <h1 className='text-[10rem]'>AUTHORISED PERSONNEL ONLY</h1>
          <div className='mx-auto p-1'>
            <label className='mx-auto p-1' htmlFor='caption'>Caption:</label>
            <textarea
            className='mx-auto p-1'
              id='caption'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>

          <div className='mx-auto p-1'>
            <label className='mx-auto p-1' htmlFor='image'>Image:</label>
            <input
                className='mx-auto p-1'
              type='file'
              id='image'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className='border mx-auto p-1' type='submit'>Add Post</button>
        </form>
      )}
    </div>
  );
}

export default AddPost;
