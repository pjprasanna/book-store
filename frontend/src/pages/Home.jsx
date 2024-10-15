import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://book-store-ei1l.onrender.com/books')
      .then((response) => {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filtering based on search term
  useEffect(() => {
    const filteredData = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publishYear.toString().includes(searchTerm)
    );
    setFilteredBooks(filteredData);
  }, [searchTerm, books]);

  // Sorting based on column header
  const sortBooks = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredBooks].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredBooks(sortedData);
  };

  return (
    <div className='p-4'>
    <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
  <h1 className='text-3xl text-center flex-1'>BOOKS LIST</h1>
  <div className='flex items-center gap-4 mt-4 md:mt-0'>
    <input
      type='text'
      placeholder='Search by Title, Author, or Year...'
      className='border p-2 rounded w-full md:w-64 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-300'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Link to='/books/create' className='text-sky-800 text-4xl'>
      <MdOutlineAddBox />
    </Link>
  </div>
</div>


      {loading ? (
        <Spinner />
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md cursor-pointer' onClick={() => sortBooks('index')}>S.No</th>
                <th className='border border-slate-600 rounded-md cursor-pointer' onClick={() => sortBooks('title')}>Title</th>
                <th className='border border-slate-600 rounded-md hidden md:table-cell cursor-pointer' onClick={() => sortBooks('author')}>Author</th>
                <th className='border border-slate-600 rounded-md hidden md:table-cell cursor-pointer' onClick={() => sortBooks('publishYear')}>Publish Year</th>
                <th className='border border-slate-600 rounded-md'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                  <td className='border border-slate-700 rounded-md text-center hidden md:table-cell'>{book.author}</td>
                  <td className='border border-slate-700 rounded-md text-center hidden md:table-cell'>{book.publishYear}</td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/detail/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-800' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-800' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
