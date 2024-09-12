const axios = require('axios')
async function getTopAnime(page = 1) {
    const extracted_anime = [];
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
        const animeList = res.data.data; // The actual array of anime objects
        animeList.forEach(anime => {
            const id = anime.mal_id;
            const name = anime.title;
            const image = anime.images.webp.large_image_url;
            const genres = anime.genres.map(genre => genre.name);
            const url = anime.url;

            extracted_anime.push({name: name, image: image, genres: genres, url: url, id: id});
        });
        return { animeinfo: extracted_anime, lastPage: res.data.pagination.last_visible_page }; // Return lastPage for further requests

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

async function searchAnime(name){
    const extracted_anime = []
    try{
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${name}`)
        const searchResults = response.data.data;
        searchResults.forEach(anime => {
            const id = anime.mal_id;
            const name = anime.title;
            const image = anime.images.webp.large_image_url;
            const genres = anime.genres.map(genre => genre.name);
            const url = anime.url;

            extracted_anime.push({name: name, image: image, genres: genres, url: url, id: id});
        });
        return { animeinfo: extracted_anime, lastPage: response.data.pagination.last_visible_page }; // Return lastPage for further requests

    } catch (error) {
        console.error('Error fetching top anime:', error);
        return null;
    }
}


module.exports = {
    getTopAnime,
    getSynopsis,
    searchAnime
  };