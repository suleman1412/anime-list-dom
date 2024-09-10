const express = require('express');
const cors = require('cors');
const { getTopAnime, getSynopsis } = require('./utils');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/topAnime', async (req, res) => { // Get top Anime, also the landing page
    try {
        const page = (req.query.page)
        // console.log('In server.js, Command passed to getTopAnime() in utils, page =', page)
        const animeData = await getTopAnime(page);
        res.send(animeData);
    } catch (error) {
        console.error('Error fetching anime data:', error);
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
        console.error(e)
        res.status(500).json({error: 'Internal Servar Error'})
    }

})




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});