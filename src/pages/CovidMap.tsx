import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, LayerGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

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
const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const fillRedOptions = { fillColor: 'red' }
const greenOptions = { color: 'green', fillColor: 'green' }
const purpleOptions = { color: 'purple' }

const CovidMap: React.FC = () => {
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);

    useEffect(() => {
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
           
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {countriesData.map(country => (
                 
                <CircleMarker
                pathOptions={{ color: 'purple' }}
                radius={2}
                    key={country.countryInfo.lat + country.countryInfo.long}
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                >
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
