import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {useState} from "react";



const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Count of products',
    },
  ],
  series: [{ dataKey: 'seoul', label: 'Count of product', valueFormatter }],
  height: 400,
 
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function BarGraph() {
  const [tickPlacement, setTickPlacement] = React.useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');
  const[data,setdata]=React.useState([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedMonth = searchParams.get('month');
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

 
  console.log(priceRanges['0-100'],"price ranges")

  
   const[dataset2,setdataset2] =React.useState([{
   
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: priceRanges['0-100'],
    month: '0-100',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: '101-200',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: '201-300',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: '301-400',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: '401-500',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: '501-600',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: '601-700',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: '701-800',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: '801-900',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: '900 and above',
  },
 ])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/bar_chart?month=${selectedMonth}`)
      .then(response => {
        setdata(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
     
   } , []);

  React.useEffect(() => {
    // Check if data.prices is an object
    if (typeof data.prices === 'object' && data.prices !== null) {
      // Extract the prices from the object
      const prices = Object.values(data.prices);
      
      // Iterate through the prices array and update priceRanges state
      prices.forEach(price => {
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
    
    
  }, [data]); 

  React.useEffect(()=>{
    setdataset2(
      [{
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: priceRanges['0-100'],
      month: '0-100',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      month: '101-200',
      seoul: priceRanges['101-200'],
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
     
      seoul: priceRanges['201-300'],
      month: '201-300',
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
     
      seoul: priceRanges['301-400'],
      month: '301-400',
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      month: '401-500',
      seoul: priceRanges['401-500'],

    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      month: '501-600',
      seoul: priceRanges['501-600'],
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      month: '601-700',
      seoul: priceRanges['601-700'],
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      month: '701-800',
      seoul: priceRanges['701-800'],
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      month: '801-900',
      seoul: priceRanges['801-900'],
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      month: '900+',
      seoul: priceRanges['900+'],
    }])
  },[priceRanges])
  console.log(data)
  console.log(priceRanges,"hihihihi")
  console.log(selectedMonth)
  console.log(dataset2,"dataset2")
  return (
    <>
    <div style={{color:"white",fontSize:"3vw"}}>Bar Chart for the month {dist[selectedMonth]}</div>
    <div style={{ width: '100%' }}>
      {/* <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      /> */}
      <BarChart
        dataset={dataset2}
        xAxis={[
          { scaleType: 'band', dataKey: 'month'},
        ]}
        {...chartSetting}
      />
    </div>
    </>);
}
