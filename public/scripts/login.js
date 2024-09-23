import navBar from "../components/navBar.js";
import footer from "../components/footer.js";
import showSnackbar from "../components/snackBar.js";

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navBar());
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', footer());
});


document.getElementById('loginForm').addEventListener('submit', async function login(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 
    console.log('in login() ', username, password);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: username,
                password: password
            })
        });

        if (!response.ok) {
            const errorMessage = await response.json()
            alert(errorMessage.message);
            return;
        }

        const data = await response.json();
        console.log('Success:', data);
        localStorage .setItem("token", data.token)
        showSnackbar("You have successfully logged in!")
        setTimeout(() => {
            window.location.href = '../pages/landing.html';
        }, 2000)
    } catch (error) {
        console.error('Error:', error);
        alert("Unexpected error. Please try again later.") 
    }
});