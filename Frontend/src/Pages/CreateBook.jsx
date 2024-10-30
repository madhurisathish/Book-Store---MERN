import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleSaveBook = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const data = {
      title,
      author,
      publishYear: Number(publishYear), // Convert to a number
    };
    setLoading(true);
    setError(''); // Reset error state before making request

    try {
      await axios.post('http://localhost:5555/books', data);
      navigate('/'); // Redirect after successful creation
    } catch (error) {
      setLoading(false);
      setError('An error occurred while creating the book. Please check the console.');
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading is stopped in both success and error cases
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading && <Spinner />}
      {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSaveBook} className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <button type='submit' className='p-2 bg-sky-300 m-8'>
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateBooks;
