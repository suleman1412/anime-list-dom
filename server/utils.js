const axios = require('axios')
async function getTopAnime(page) {
    const extracted_anime = {};
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/top/anime/?page=${page}`);
        const animeList = res.data.data; // The actual array of anime objects

        animeList.forEach(anime => {
            const id = anime.mal_id;
            const name = anime.title;
            const image = anime.images.webp.large_image_url;
            const genres = anime.genres.map(genre => genre.name);
            const url = anime.url

            extracted_anime[id] = [name, image, genres, url, id];
        });

        await new Promise(res => setTimeout(res, 3000))

        return extracted_anime;
        
    } catch (error) {
        console.error('Error fetching top anime:', error);
        return null;
    }
}


async function getSynopsis(id){
    try{
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        const fullAnimeData = response.data.data;

        // console.log(fullAnimeData)

        const detailAnime = {
            large_image_webp: fullAnimeData.images.webp.large_image_url,
            trailer: fullAnimeData.trailer.embed_url,
            animeName: fullAnimeData.title,
            episodes: fullAnimeData.episodes,
            status: fullAnimeData.status,
            score: fullAnimeData.score,
            rank: fullAnimeData.rank,
            synopsis: fullAnimeData.synopsis,
            genres: [...fullAnimeData.genres, ...fullAnimeData.explicit_genres].map(genre => genre.name),
            streaming: fullAnimeData.streaming
        };
        return detailAnime;
    }catch(e){
        console.log(e)
        return 'Could not fetch anime details'
    }

}

module.exports = {
    getTopAnime,
    getSynopsis
  };