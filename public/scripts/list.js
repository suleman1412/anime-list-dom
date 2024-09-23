import navBar from "../components/navBar.js";
import footer from "../components/footer.js";
import createListCard from "../components/createListCard.js";


document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navBar());
})

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', footer());
})

document.addEventListener('DOMContentLoaded', fetchAndRenderAnime)

async function fetchAndRenderAnime() {
    // if (isLoading) return;
    // isLoading = true;
    try {
        const response = await fetch(`http://localhost:3000/api/yourAnime`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }); 

        if (!response.ok) {
            const errorMessage = await response.json()
            alert(errorMessage.message);
            return;
        }
        const animeList = await response.json();
        const animeListContainer = document.getElementById('anime-list');

        // Iterate over the animeList object and render each anime
        Object.values(animeList.animeList).forEach(animeDetails => {
            const animeCard = animeDetails;
            console.log(animeCard)
            const card = createListCard(animeCard)
    
            animeListContainer.insertAdjacentHTML('beforeend',card);
        });

    } catch (error) {
        console.error('Error fetching anime data:', error);
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