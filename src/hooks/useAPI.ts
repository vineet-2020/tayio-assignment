import { useQuery } from 'react-query';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const useFetchCountryData = (country: string) => {
  return useQuery(['country', country], async () => {
    const response = await fetch(`${BASE_URL}/countries/${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country data');
    }
    return response.json();
  });
};

export const useFetchGlobalData = () => {
  return useQuery('global', async () => {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch global data');
    }
    return response.json();
  });
};

export const useFetchHistoricalData = () => {
  return useQuery('historical', async () => {
    const response = await fetch(`${BASE_URL}/historical/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }
    return response.json();
  });
};
