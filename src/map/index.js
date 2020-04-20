import L from 'leaflet';
import { Heroes } from '../heroes/index';

export const createMap = () => {
    const mapProvider = {
        replace(str, target) {
            let curStr = '{z}-{x}-{y}';
            curStr = curStr.replace(str, target);
            const tile = require(`../images/map/${curStr}.jpg`);
            return tile;
        }
    };

    const width = 1288;
    const height = 890;
    const maxLevel = 5;
    const minLevel = 0;
    const orgLevel = 3;

    const tileWidth = 256 * Math.pow(2, orgLevel);
    const radius = tileWidth / 2 / Math.PI;
    const rx = width - tileWidth / 2;
    const ry = -height + tileWidth / 2;

    const west = -180;
    const east = (180 / Math.PI) * (rx / radius);
    const north = 85.05;
    const south =
        (360 / Math.PI) * (Math.atan(Math.exp(ry / radius)) - Math.PI / 4);
    const rc = (tileWidth / 2 + ry) / 2;
    const centerLat =
        (360 / Math.PI) * (Math.atan(Math.exp(rc / radius)) - Math.PI / 4);
    const centerLon = (west + east) / 2;
    const bounds = [
        [south, west],
        [north, east]
    ];

    const map = new L.Map('map', { maxBounds: bounds });

    L.tileLayer(mapProvider, {
        maxZoom: maxLevel,
        minZoom: minLevel,
        opacity: 1.0,
        zIndex: 1,
        noWrap: true,
        bounds: bounds,
        attribution: ''
    }).addTo(map);

    const zoom = map.getBoundsZoom(bounds);
    const center = new L.latLng(centerLat, centerLon);

    map.setView(center, zoom);

    return Heroes(map);
};
