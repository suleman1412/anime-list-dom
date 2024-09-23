export function showSnackbar(message) {
    const snackbar = document.createElement('div');
    snackbar.className = " absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-blue-600 text-white px-4 py-2 rounded";
    snackbar.textContent = message; 

    document.body.appendChild(snackbar);

    snackbar.classList.remove('hidden');

    setTimeout(() => {
        snackbar.classList.add('hidden'); 
        document.body.removeChild(snackbar); 
    }, 2000); 
}

export default showSnackbar;