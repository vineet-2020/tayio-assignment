import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

interface CasesData {
  [date: string]: number;
}

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [casesData, setCasesData] = useState<CasesData>({});

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

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const dates = Object.keys(casesData);
      const values = Object.values(casesData);

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
            type: 'line',
            data: values,
          },
        ],
      };

      chartInstance.setOption(options);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [casesData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
