export function navBar() {
    const token = localStorage.getItem('token'); // Check for the token in localStorage

    return `
        <nav class="bg-gray-800 p-2">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center">
                    <img src="../kuromi.png" alt="Logo" class="h-10 w-10 mr-2">
                    <a href="./landing.html" class="text-2xl font-bold text-white hover:text-gray-300">Anime List</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="./browse.html" class="text-gray-300 hover:text-white hover:underline underline-offset-8">Browse</a>
                    <a href="./list.html" class="text-gray-300 hover:text-white hover:underline underline-offset-8">My List</a>
                    ${token ? `
                        <a id="logout" class="bg-red-700 text-white hover:bg-blue-500/50 font-semibold py-2 px-4 rounded-lg hover:underline underline-offset-8" 
                        onclick="localStorage.removeItem('token'); window.location.href='./landing.html';">Logout</a>
                    ` : `
                        <a href="./login.html" class="bg-blue-700 text-white hover:bg-blue-500/50 font-semibold py-2 px-4 rounded-lg hover:underline underline-offset-8">Login</a>
                    `}
                </div>
            </div>
        </nav>
    `;
}

export default navBar