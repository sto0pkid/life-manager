import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Travel: React.FC = () => {
    const position : [number, number] = [51.505, -0.09]

    return (
        
        <div className="w-full h-full">
            <MapContainer className="w-full h-full" center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Travel;