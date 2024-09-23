// Function to create an anime card
export function createAnimeCard(anime) {
    return `
    <div class="anime-card bg-gray-800 rounded-lg shadow-md overflow-hidden w-30 h-30 relative group  hover:bg-white" anime-data="${anime.id}">
        <div>
            <img src="${anime.image}" alt="${anime.name}" class="w-full h-48 object-cover">
            <div class='anime-container flex justify-between items-start p-4'> 
                <div class="flex-grow"> 
                    <h2 class="text-xl font-semibold mb-2 text-white group-hover:text-black">
                        <a href="../pages/details.html?id=${anime.id}" class="hover:text-blue-600">
                            ${anime.name}
                        </a>
                    </h2>
                    <p class="text-gray-600">${anime.genres.join(', ')}</p>
                </div>
                <div class="ml-4 "> 
                    <label for "animeForm" class=" cursor-pointer bg-blue-700 text-white px-4 py-2 rounded" onclick="openPopup('${anime.name}', '${anime.id}', '${anime.image}')">Add</label>
                    <!-- Popup -->
                    ${createPopup()}
                </div>
            </div>
        </div>
    </div>

    `;
}

export function createPopup(){
    return `
        <div id="popup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden" style="z-index:50;">
            <div class="bg-white p-6 rounded shadow-lg w-96" style="z-index:51;"> 
                <h2 id="popupTitle" class="text-xl font-semibold mb-4"></h2>
                <div class="mb-4">
                    <label for="status" class="block text-gray-700">Status:</label>
                    <select id="status" class="border rounded w-full p-2">
                        <option value="Watching">Currently Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                        <option value="Hold">On Hold</option>
                        <option value="Planned">Plan to Watch</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="episodesWatched" class="block text-gray-700">Episodes Watched:</label>
                    <input type="number" id="episodesWatched" class="border rounded w-full p-2" min="0" max="65"/>
                </div>
                <div class="mb-4">
                    <label for="Rating" class="block text-gray-700">Rating</label>
                    <input type="number" id="Rating" class="border rounded w-full p-2" min="0" />
                </div>
                <button type="submit" class="submitBtn bg-blue-700 text-white px-4 py-2 rounded" onclick="sendData()">Submit</button>
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded ml-2" onclick="closePopup()">Close</button>
            </div>
        </div>
    `
}



export function openPopup(animeName, animeId, animeImg) {
    if(localStorage.getItem('token')){
        document.getElementById('popupTitle').innerHTML = 
        `
            <h1>${animeName}</h1>
            <input value=${animeId} type="hidden">
            <img src="${animeImg}" style="display:none;">
        `;
        document.getElementById('popup').classList.remove('hidden'); 
        document.getElementById('popup').classList.add('show');
    } else{
        alert("Please log in to add items to your list.")
    }
}

export function closePopup() {
    document.getElementById('popup').classList.remove('show'); 
    document.getElementById('popup').classList.add('hidden'); 
}

export function sendData(event) {
    
    const status = document.getElementById('status').value;
    const episodesWatched = document.getElementById('episodesWatched').value;
    const rating = document.getElementById('Rating').value;
    const anime = document.getElementById('popupTitle');
    const name = anime.querySelector('h1').innerText;
    const id = Number(anime.querySelector('input').value);
    const animeImg = anime.querySelector('img').src;
    const token = localStorage.getItem('token');
    // Create the data object to send
    const data = {
        name: name,
        img: animeImg,
        id: id,
        status: status,
        episodesWatched: episodesWatched,
        rating: rating
    };
    console.log(data)
    // Send the data to the server
    fetch('http://localhost:3000/api/sendData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Success:', data);
        
        document.getElementById('status').value = 'Watching';
        document.getElementById('episodesWatched').value = '';
        document.getElementById('Rating').value = '';
        closePopup(); 
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
    });
}


export default { createAnimeCard, sendData, openPopup, createPopup, closePopup}