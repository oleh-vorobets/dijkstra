import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import City, {ICity} from '../src/City';
import dijkstra from './dijkstra';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/cities', async(req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json({cities});
    } catch(error) {
        console.log('Error fetching cities: ' + error.message);
        res.status(500).json({error: 'Fail to fetch data'});
    }
});

interface Neighbors {
    [name: string]: number;
} 

app.post('/calculate-path', async (req, res) => {
    const {startCity, endCity} = req.body;
    const cities: ICity[] = await City.find();
    const graph: Record<string, Neighbors> = {};

    cities.forEach((city) => {
        graph[city.name] = {};
        city.neighbors.forEach((neighbor) => {
            graph[city.name][neighbor.name] = neighbor.distance;
        });
    });

    const shortestPath = dijkstra(graph, startCity, endCity);

    res.status(200).json({shortestPath});
});

db.once('open', () => {
    app.listen(PORT, () =>{
        console.log(`Server is running in port ${PORT}...`);
    });
});