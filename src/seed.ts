import City from './City';
import db from './db';

import { promises as fsPromises } from 'fs';
import path from 'path';

const citiesPath = path.resolve(__dirname, '../data/cities.json');

db.once('open', async () => {
    try {
        await City.deleteMany();
        const cities: string = await fsPromises.readFile(citiesPath, 'utf-8');
        const parsedCities = JSON.parse(cities);
        await City.insertMany(parsedCities);
    } catch(err) {
        console.log(err);
    } finally {
        console.log('Data has been inserted');
        process.exit();
    }
});