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
  const dist={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}

  return (
    <div className="sales_summary_container">

<h2 className="sales_heading">Sales Summary for { selectedMonth ? dist[selectedMonth] : 'All Time' }</h2>


      <div className="sub_heading">Total Sold Items: {totalSoldItems}</div>
      <div className="sub_heading">Total Unsold Items: {totalUnsoldItems}</div>
    </div>
  );
}

export default SalesSummary;
