let isLoading = false;
let page = 1;
let lastPageReached = false;
const url = window.location.href;
const match = url.match(/[?&]search=([^&]+)/);
const animeName = match ? decodeURIComponent(match[1]) : null; // Decode the search term

console.log(animeName);

function createAnimeCard(anime) {
    return `
    <div class="anime-card bg-gray-800 rounded-lg shadow-md overflow-hidden w-30 h-30 relative group cursor-pointer" anime-data="${anime.id}">
        <div class="relative z-10">
            <img src="${anime.image}" alt="${anime.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2 text-white">
                    <a href="../pages/details.html?id=${anime.id}" class="hover:text-blue-600">
                        ${anime.name}
                    </a>
                </h2>
                <p class="text-gray-600">${anime.genres.join(', ')}</p>
            </div>
        </div>
    </div>
    `;
}


async function RenderSearches() {
    if (isLoading || lastPageReached) return;  // Prevent further calls if loading or last page reached
    isLoading = true;

    try {
        const response = await fetch(`http://localhost:3000/api/searchAnime?name=${animeName}`); // Fetch data from the local server
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const { animeinfo, lastPage } = await response.json(); // Destructure the response

        const animeList = document.getElementById('animeList');
        for (const animeDetails of animeinfo) {
            const animeCard = createAnimeCard(animeDetails); // Ensure createAnimeCard is defined correctly
            animeList.insertAdjacentHTML('beforeend', animeCard);
        }

        console.log(`Fetched page ${page} of ${lastPage}`); // Log current page and last page
        isLoading = false;

        if (page < lastPage) {
            page++;
        } else {
            console.log("You've reached the last page");
            lastPageReached = true
        }

    } catch (error) {
        console.error('Error fetching anime data:', error);
        document.getElementById('animeList').insertAdjacentHTML('beforeend', '<p class="text-red-500">Error loading anime data. Please try again later.</p>');
        isLoading = false;
    }
}

// Function to check if scrolled to bottom
function isScrolledToBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
}

function handleScroll() {
    if (isScrolledToBottom()) {
        console.log("Reached the bottom of the page!");
        RenderSearches();
    }
}

// Call the function when the page loads
window.addEventListener('load', RenderSearches);

// Add scroll event listener
window.addEventListener('scroll', handleScroll);