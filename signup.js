document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var firstName = document.getElementById('txtFirstName').value;
    var lastName = document.getElementById('txtLastName').value;
    var username = document.getElementById('txtUsername').value;
    var password = document.getElementById('txtPassword').value;

    // Provjera da li su svi podaci uneseni
    if (firstName && lastName && username && password) {
        // Dohvaćanje postojećih korisničkih podataka iz lokalne pohrane
        var storedUsers = JSON.parse(localStorage.getItem('usersData')) || [];

        // Provjera da li korisničko ime već postoji
        var userExists = storedUsers.some(function(user) {
            return user.username === username;
        });

        if (userExists) {
            alert('Username already exists. Please choose another username.');
        } else {
            var userData = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password
            };

            // Dodavanje novog korisnika u niz postojećih korisnika
            storedUsers.push(userData);

            // Spremanje ažuriranog niza korisničkih podataka u lokalnu pohranu
            localStorage.setItem('usersData', JSON.stringify(storedUsers));

            // Preusmjeravanje na stranicu nakon registracije
            window.location.href = '3d.html';
        }
    } else {
        alert('Molimo unesite sve podatke.');
    }
});