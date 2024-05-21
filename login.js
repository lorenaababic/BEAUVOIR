document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Spriječava podnošenje obrasca

    var username = document.getElementById('txtLogIn').value;
    var password = document.getElementById('txtPassword').value;

    // Provjera da li su polja za korisničko ime i lozinku popunjena
    if (username && password) {
        // Dohvaćanje spremljenih korisničkih podataka iz lokalne pohrane
        var storedUsers = JSON.parse(localStorage.getItem('usersData')) || [];
        
        // Pronalaženje korisnika s unesenim korisničkim imenom i lozinkom
        var validUser = storedUsers.find(function(user) {
            return user.username === username && user.password === password;
        });

        if (validUser) {
            // Uspješna prijava
            window.location.href = '3d.html';
        }else {
            // Neuspješna prijava
            alert('Neispravno korisničko ime ili lozinka');
        }
    } else {
        // Polja za korisničko ime ili lozinku nisu popunjena
        alert('Molimo unesite korisničko ime i lozinku.');
    }
});