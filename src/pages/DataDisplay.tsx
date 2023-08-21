import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface to define the structure of API data
interface ApiData {
  cases: number;
  deaths: number;
  recovered: number;
}

const DataDisplay: React.FC = () => {
  // State to store the retrieved API data
  const [apiData, setApiData] = useState<ApiData | null>(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiData>('https://disease.sh/v3/covid-19/all');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display the heading for the COVID-19 global data */}
      <h2 className='text-lg font-semibold'>COVID-19 Global Data</h2>
      
      {/* Display the API data or loading message */}
      {apiData ? (
        <div>
          <p>Total Cases: <span className='text-gray-700'>{apiData.cases}</span></p>
          <p>Total Deaths: <span className='text-gray-700'>{apiData.deaths}</span></p>
          <p>Total Recovered: <span className='text-gray-700'>{apiData.recovered}</span></p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataDisplay;
