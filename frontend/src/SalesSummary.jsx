import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SalesSummary({ selectedMonth }) {
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sales-summary?month=${selectedMonth}`)
      .then(response => {
        const { soldCount, unsoldCount } = response.data;
        setTotalSoldItems(soldCount);
        setTotalUnsoldItems(unsoldCount);
      })
      .catch(error => {
        console.error('Error fetching sales summary:', error);
      });
  }, [selectedMonth]);

  return (
    <div>
      <h2>Sales Summary for {selectedMonth ? `Month ${selectedMonth}` : 'All Time'}</h2>
      <div>Total Sold Items: {totalSoldItems}</div>
      <div>Total Unsold Items: {totalUnsoldItems}</div>
    </div>
  );
}

export default SalesSummary;
