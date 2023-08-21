import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import axios from 'axios';

// Interface to define the structure of country data
interface CountryData {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
}

const CovidMap: React.FC = () => {
    // State to store the retrieved countries' data
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
                setCountriesData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh' }}>
            {/* Display the base map using TileLayer */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Loop through countriesData to render CircleMarker for each country */}
            {countriesData.map(country => (
                <CircleMarker
                    pathOptions={{ color: 'purple' }}
                    radius={2}
                    key={country.countryInfo.lat + country.countryInfo.long}
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                >
                    {/* Display country information in a Tooltip */}
                    <Tooltip>
                        <div>
                            <h3>{country.country}</h3>
                            <p>Total Active Cases: {country.active}</p>
                            <p>Total Recovered: {country.recovered}</p>
                            <p>Total Deaths: {country.deaths}</p>
                        </div>
                    </Tooltip>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default CovidMap;
