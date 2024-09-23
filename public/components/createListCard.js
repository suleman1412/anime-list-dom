export function createListCard(anime) {
    return `
    <div class="anime-card">
        <img src="${anime.image}" alt="${anime.name}" class="anime-image">
        <div class="anime-info">
            <div class="anime-name"><a href="../pages/details.html?id=${anime.id}">${anime.name}</a></div>
            <div class="anime-rating">Rating: ${anime.rating}</div>
            <div class="anime-episodes">Episodes: ${anime.episodesWatched}</div>
        </div>
    </div>
    `;
}

export default createListCard;

