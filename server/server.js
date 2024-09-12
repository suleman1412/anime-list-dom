const express = require('express');
const cors = require('cors');
const { getTopAnime, getSynopsis, searchAnime } = require('./utils');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/topAnime', async (req, res) => { // Get top Anime
    try {
        const page = req.query.page
        const animeData = await getTopAnime(page);
        console.log('In server.js, received data from getTopAnime() on page = ', animeData.currentpage)
        res.send(animeData);
    } catch (error) {
        console.log('Error in /api/topAnime endpoint');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/AnimeInfo/:id', async (req, res) => {
    try{
        const id = req.params.id;
        console.log('Command passed to getSynopsis() in utils')
        const synopsisData = await getSynopsis(id);
        res.send(synopsisData)
    }catch(e){
        console.log('Error in /api/AnimeInfo endpoint')
        res.status(500).json({error: e})
    }
})

app.get('/api/searchAnime', async(req, res) => {
    try{
        const name = req.query.name;
        const animeData = await searchAnime(name);
        console.log('Sending over search results to frontend')
        const isNamePresent = animeData.animeinfo.filter(anime => anime.name.toLowerCase() == name.toLowerCase());
        console.log('Sending over search results to frontend');

        res.send(animeData);
    } catch(e){
        console.log('Error in /api/searchAnime endpoint')
        res.status(500).json({error: e})
    }
})





const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});