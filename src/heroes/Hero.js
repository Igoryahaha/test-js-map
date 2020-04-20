import L from 'leaflet';

export class Hero {
    constructor(props) {
        this.props = props;
        const { startPosition, name, house } = this.props;
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.name = name;

        this.heroIcon = L.icon({
            iconUrl: require(`../images/coat-of-arms/${house}.png`),

            iconSize: [36, 40],
            iconAnchor: [18, 40],
            popupAnchor: [0, -20]
        });
        this.tileWidth = 256 * Math.pow(2, 3);
        this.radius = this.tileWidth / 2 / Math.PI;
        this.height = 890;
        this.marker = this.createMarker();
    }

    createMarker() {
        const { x, y, name } = this;
        const { map } = this.props;
        return L.marker([this.getY(y), this.getX(x)], { icon: this.heroIcon })
            .addTo(map)
            .bindPopup(name);
    }

    setNewPosition(x, y) {
        this.marker.setLatLng([this.getY(y), this.getX(x)]);
    }

    getX(x) {
        return (180 / Math.PI) * ((x - this.tileWidth / 2) / this.radius);
    }

    getY(y) {
        return (
            (360 / Math.PI) *
            (Math.atan(
                Math.exp((y - this.height + this.tileWidth / 2) / this.radius)
            ) -
                Math.PI / 4)
        );
    }
}
