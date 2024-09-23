import navBar from "../components/navBar.js";
import footer from "../components/footer.js";
import showSnackbar from "../components/snackBar.js";

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navBar());
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', footer());
});



document.getElementById('signupForm').addEventListener('submit', async function signup(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 
    console.log('in signup() ', username, password);

    try {
        const response = await fetch('http://localhost:3000/signup', {
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
            const errorMessage = await response.json();
            alert(errorMessage.message);
            return;
        }

        const data = await response.json();
        console.log('Success:', data);
        showSnackbar("You have successfully signed up!")
        setTimeout(() => {
            window.location.href = '../pages/login.html';
        }, 2000)
    } catch (error) {
        console.error('Error:', error);
        alert("Unexpected error. Please try again later.") 
    }
});