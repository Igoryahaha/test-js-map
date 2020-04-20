import { Hero } from './Hero';
import { heroesInfo } from './heroesInfo';

const heroes = {};

export const Heroes = (map) => {
    heroesInfo.map((hero) => (heroes[hero.name] = new Hero({ map, ...hero })));
    return heroes;
};
