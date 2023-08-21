import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import the echarts library
import axios from 'axios';

interface CasesData {
  [date: string]: number;
}

const BarChart: React.FC = () => {
  // Create a ref for the chart container element
  const chartRef = useRef<HTMLDivElement | null>(null);

  // State to store fetched cases data
  const [casesData, setCasesData] = useState<CasesData>({});

  // Fetch COVID-19 cases data using API and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all'); // Replace with your API URL
        const data = response.data.cases;
        setCasesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Initialize and update the ECharts chart instance
  useEffect(() => {
    if (chartRef.current) {
      // Initialize the ECharts instance
      const chartInstance = echarts.init(chartRef.current);

      // Extract dates and values from casesData
      const dates = Object.keys(casesData);
      const values = Object.values(casesData);

      // Configuration options for the chart
      const options: echarts.EChartsOption = {
        xAxis: {
          type: 'category',
          data: dates,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line', // Display data as a line chart
            data: values, // Use the values as the data points
          },
        ],
      };

      // Apply the options to the chart instance
      chartInstance.setOption(options);

      // Cleanup function to dispose the chart instance
      return () => {
        chartInstance.dispose();
      };
    }
  }, [casesData]);

  // Render the chart container element
  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
