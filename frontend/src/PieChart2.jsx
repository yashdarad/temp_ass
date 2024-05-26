import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import {useState,useEffect} from "react";

const size = {
  width: 800,
  height: 400,
};

export default function PieChart2() {
    const [data,setdataaaa] =useState([
        { value: 5, label: 'A' },
        { value: 10, label: 'B' },
        { value: 15, label: 'C' },
        { value: 20, label: 'D' },
      ]);
      
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedMonth = searchParams.get('month');
    const[data3,setdata3]=useState([])
    const[data2,setdata]=React.useState([])
    const dist={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}
    const [priceRanges, setPriceRanges] = useState({
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '900+': 0
      });


    useEffect(() => {
        axios.get(`http://localhost:5000/api/bar_chart?month=${selectedMonth}`)
          .then(response => {
            setdata(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
         
       } , []);

       React.useEffect(() => {
        // Check if data.prices is an object
        console.log(data,"hello bahiaia")
        console.log(data,"ye haa data")
        if (typeof data2.prices === 'object' && data2.prices !== null) {
          // Extract the prices from the object
          const prices = Object.values(data2.prices);
          
          // Iterate through the prices array and update priceRanges state
          prices.forEach(price => {
            console.log(price,"pricesk,dskdfs")
            if(price.price>40 )
            if (price.price <= 100) setPriceRanges(prevState => ({ ...prevState, '0-100': prevState['0-100'] + 1 }));
            else if (price.price <= 200) setPriceRanges(prevState => ({ ...prevState, '101-200': prevState['101-200'] + 1 }));
            else if (price.price <= 300) setPriceRanges(prevState => ({ ...prevState, '201-300': prevState['201-300'] + 1 }));
            else if (price.price <= 400) setPriceRanges(prevState => ({ ...prevState, '301-400': prevState['301-400'] + 1 }));
            else if (price.price <= 500) setPriceRanges(prevState => ({ ...prevState, '401-500': prevState['401-500'] + 1 }));
            else if (price.price <= 600) setPriceRanges(prevState => ({ ...prevState, '501-600': prevState['501-600'] + 1 }));
            else if (price.price <= 700) setPriceRanges(prevState => ({ ...prevState, '601-700': prevState['601-700'] + 1 }));
            else if (price.price <= 800) setPriceRanges(prevState => ({ ...prevState, '701-800': prevState['701-800'] + 1 }));
            else if (price.price <= 900) setPriceRanges(prevState => ({ ...prevState, '801-900': prevState['801-900'] + 1 }));
            else setPriceRanges(prevState => ({ ...prevState, '900+': prevState['900+'] + 1 }));
          });
        } else {
          console.error("Data is not in the expected format.");
        }
        console.log(priceRanges['0-100'],"lansd")
        
        
      }, [data2]); 

      useEffect(() => {
        const newArray = Object.entries(priceRanges)
        .filter(([key, value]) => value > 0) // Filter out entries with count 0
        .map(([key, value]) => ({ value, label: key })); // Map entries to objects with value and label keys
      
       setdataaaa(newArray) 
       } , [priceRanges]);

  return (
    <div className="pie_container">
        <div style={{color:"white",fontSize:"3vw"}}>Pie Chart for the month {dist[selectedMonth]}</div>
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    
    />
      </div>
  );
}
