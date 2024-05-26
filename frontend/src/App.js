import React, { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import SalesSummary from './SalesSummary';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('3'); // Default to March
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const dist={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
const navigate=useNavigate();
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const filteredData = data.filter(product => {
    const saleDate = new Date(product.dateOfSale);
    const matchesMonth = selectedMonth ? (saleDate.getMonth() + 1) === parseInt(selectedMonth) : true;
    const matchesSearch = searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesMonth && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
function handlebarclick()
{
  navigate(`/bar_graph?month=${selectedMonth}`);
}
function handlepieclick()
{
  navigate(`/pie_chart?month=${selectedMonth}`);
}
  return (
    <div>
      <h1>Product Table</h1>
      <div className="filters">
        <label htmlFor="monthFilter">Filter by Month:</label>
        <select id="monthFilter" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <label htmlFor="searchBox">Search:</label>
        <input
          type="text"
          id="searchBox"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="selected_routes">
      <SalesSummary selectedMonth={selectedMonth} />
      <div className="bar_graph" onClick={handlebarclick}>BarGraph for {dist[selectedMonth]}</div>
      <div className="bar_graph"  onClick={handlepieclick}>Pie Chart for {dist[selectedMonth]}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.sold ? 'Yes' : 'No'}</td>
              <td>{product.dateOfSale}</td>
              <td><img src={product.image} alt={product.title} style={{ width: '50px' }}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default App;
