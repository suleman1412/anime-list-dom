// Function to create an anime card
function createAnimeCard(anime) {
    return `
    <div class="anime-card bg-gray-800 rounded-lg shadow-md overflow-hidden w-30 h-30 relative group cursor-pointer" anime-data="${anime[4]}>
        <div class="relative z-10">
            <img src="${anime[1]}" alt="${anime[0]}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2 text-white">
                    <a href="./anime-details/anime-details.html?id=${anime[4]}" class="hover:text-blue-600">
                        ${anime[0]}
                    </a>
                </h2>
                <p class="text-gray-600">${anime[2].join(', ')}</p>
            </div>
        </div>
    </div>
`;
}

// Function to fetch anime data and render cards
let isLoading = false;
let page = 1;
async function fetchAndRenderAnime() {
    if (isLoading) return;
    isLoading = true;

    try {
        const animeData = await fetch(`http://localhost:3000/api/topAnime?page=${page}`).then(response => response.json())
        
        const animeList = document.getElementById('animeList');

        for (const [id, animeInfo] of Object.entries(animeData)) {
            const animeCard = createAnimeCard(animeInfo);
            animeList.insertAdjacentHTML('beforeend', animeCard);
        }

        page++;
        isLoading = false;
    } catch (error) {
        console.error('Error fetching anime data:', error);
        document.getElementById('animeList').insertAdjacentHTML('beforeend', '<p class="text-red-500">Error loading anime data. Please try again later.</p>');
        isLoading = false;
    }
}

function scrollToHalf(){
    const oldHeight = document.body.scrollHeight;
    const newHeight = document.body.scrollHeight;
    const heightDifference = newHeight - oldHeight;
    const scrollToPosition = window.scrollY + (heightDifference / 2);
    
    window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
    });
}

// Function to check if scrolled to bottom
function isScrolledToBottom() {
    scrollToHalf()
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
}

function handleScroll() {
    if (isScrolledToBottom()) {
        console.log("Reached the bottom of the page!");
        fetchAndRenderAnime();
    }
}

// Call the function when the page loads
window.addEventListener('load', fetchAndRenderAnime);


const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showImage(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});


// Add scroll event listener
window.addEventListener('scroll', handleScroll);
