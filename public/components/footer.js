export function footer(){
    return `
    <footer class="w-full bg-gray-800 text-gray-300 py-4">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap justify-center">
                <div class="w-full md:w-1/4 mb-4 md:mb-0">
                    <h3 class="text-sm font-semibold mb-1">About Us</h3>
                    <p class="text-xs">Your go-to source for anime information and recommendations.</p>
                </div>
                <div class="w-full md:w-1/6  mb-4 md:mb-0">
                    <h3 class="text-sm font-semibold mb-1">Quick Links</h3>
                    <ul class="text-xs">
                        <li><a href="./browse.html" class="hover:text-white">Home</a></li>
                        <li><a href="#" class="hover:text-white">Top Anime</a></li>
                        <li><a href="#" class="hover:text-white">Genres</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </footer>
    `
};

export default footer