import navBar from "../components/navBar.js";
import footer from "../components/footer.js";


document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navBar());
})

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', footer());
})

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchbox(); // Call the function only on Enter key press
    }
});

function searchbox() {
    const searchedItem = document.getElementById('searchInput').value.trim();
    if (searchedItem) {
        // Redirect to searchresults.html with the search term as a query parameter
        window.location.href = `./searchresults.html?search=${searchedItem}`;
    }
}