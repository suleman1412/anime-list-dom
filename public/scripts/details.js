const url = window.location.href;
const match = url.match(/[?&]id=([^&]+)/);
const animeId = match ? match[1] : null;

console.log(animeId);

function createAnimeDetailsComponent(animeData) {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div class="md:col-span-1 space-y-6">
                <div class="bg-gray-800 p-4 rounded-lg h-auto flex items-center justify-center overflow-hidden">
                    <img src="${animeData.large_image_webp}" alt="${animeData.animeName}" class="w-full h-full object-cover">
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p><strong>Score:</strong> ${animeData.score}</p>
                    <p><strong>Status:</strong> ${animeData.status}</p>
                    <p><strong>Episodes:</strong> ${animeData.episodes}</p>
                    <p><strong>Rank:</strong> ${animeData.rank}</p>
                    <p><strong>Genre:</strong> ${animeData.genres.join(', ')}</p>
                </div>
            </div>
            <div class="md:col-span-2 bg-gray-800 p-4 rounded-lg">
                <h1 class="text-2xl font-bold mb-4">${animeData.animeName}</h1>
                <h2 class="text-xl font-bold mb-2">Synopsis</h2>
                <p class="mb-4">${animeData.synopsis}</p>
                ${createTrailerComponent(animeData.trailer)}
                ${createStreamingComponent(animeData.streaming)}
            </div>
        </div>
    `;
}

function createTrailerComponent(trailerUrl) {
    return trailerUrl ? `
        <h2 class="text-xl font-bold mb-2">Trailer</h2>
        <div class="mb-4">
            <iframe width="100%" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen class="rounded-lg"></iframe>
        </div>
    ` : '';
}

function createStreamingComponent(streamingData) {
    if (streamingData.length === 0) return '';
    
    const streamingLinks = streamingData.map(stream => `
        <li><a href="${stream.url}" target="_blank" class="text-blue-400 hover:text-blue-300">${stream.name}</a></li>
    `).join('');

    return `
        <h2 class="text-xl font-bold mb-2">Streaming Links</h2>
        <ul class="list-disc list-inside">${streamingLinks}</ul>
    `;
}

async function RenderAnimeDetails() {
    try {
        const animeDetails = await fetch(`http://localhost:3000/api/AnimeInfo/${animeId}`).then(response => response.json());
        const detailsHTML = createAnimeDetailsComponent(animeDetails);
        document.getElementById('animeDetails').innerHTML = detailsHTML;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        document.getElementById('animeDetails').innerHTML = '<p class="text-red-500">Error loading anime details. Please try again later.</p>';
    }
}
RenderAnimeDetails()