import React, { useEffect } from 'react';
import { createMap } from './map';
import './App.css';

function App() {
    const ws = new WebSocket('ws://localhost:8080/ws');

    useEffect(() => {
        const map = createMap();

        ws.onmessage = ({ data }) => {
            const { hero, x, y } = JSON.parse(data);
            map[hero].setNewPosition(x, y);
        };
    });

    return <div className="App" id="map"></div>;
}

export default App;
