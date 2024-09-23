const { Router } = require('express')
const { auth } = require('../public/auth/auth')
const { AnimeModel } = require('../public/db/db')
const { getTopAnime, getSynopsis, searchAnime } = require('./utils');
const mongoose = require('mongoose')
const dbConnect = process.env.DB_CONNECT;

mongoose.connect(dbConnect)


apiRouter = Router()

apiRouter.get('/yourAnime', auth, async(req,res) => {
    console.log(req.body.userId + "'s List")
    try {
        const response = await AnimeModel.find({ userId: req.body.userId });
        if (!response) {
            return res.status(403).json({
                message: "User doesn't exist, please sign up"
            });
        }

        let animeList = response.map(anime => ({
            name: anime.name,
            id: anime.id,
            image: anime.image,
            status: anime.status,
            episodesWatched: anime.episodesWatched,
            rating: anime.rating
        }));
        return res.json({
            animeList
        });
        
    } catch (e) {
        console.error('Error during login:', e); 
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

apiRouter.get('/topAnime', async (req, res) => { // Get top Anime
    try {
        const page = req.query.page
        const animeData = await getTopAnime(page);
        if(animeData){
            console.log('In server.js, received data from getTopAnime() on page = ', page)
            res.status(200).json(animeData);
        } else{
            res.status(400).json({
                message: 'Cannot find an anime with that name'
            })
        }
    } catch (error) {
        console.log('Error in /topAnime endpoint');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

apiRouter.get('/AnimeInfo/:id', async (req, res) => {
    try{
        const id = req.params.id;
        console.log('Command passed to getSynopsis() in utils')
        const synopsisData = await getSynopsis(id);
        res.send(synopsisData)
    }catch(e){
        console.log('Error in /AnimeInfo endpoint')
        res.status(500).json({error: e})
    }
})

apiRouter.get('/searchAnime', async(req, res) => {
    try{
        const name = req.query.name;
        const animeData = await searchAnime(name);
        if(animeData){
            const isNamePresent = animeData.animeinfo.filter(anime => anime.name.toLowerCase() == name.toLowerCase());
            console.log('Sending over search results to frontend');
            res.status(200).send(animeData)
        } else{
            res.status(400).json({
                message: 'Cannot find an anime with that name'
            })
        }

    } catch(e){
        console.log('Error in /searchAnime endpoint')
        res.status(500).json({error: e})
    }
})

apiRouter.post('/sendData', auth, async(req, res) => {
    console.log('Received data')
    await AnimeModel.create({
        userId: req.body.userId,
        name: req.body.name,
        image: req.body.img,
        id: req.body.id,
        status: req.body.status,
        episodesWatched: req.body.episodesWatched,
        rating: req.body.rating
    });
    res.json(req.body)
})

module.exports = {
    apiRouter: apiRouter
}