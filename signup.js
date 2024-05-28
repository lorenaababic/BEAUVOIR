document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var firstName = document.getElementById('txtFirstName').value;
    var lastName = document.getElementById('txtLastName').value;
    var username = document.getElementById('txtUsername').value;
    var password = document.getElementById('txtPassword').value;

    if (firstName && lastName && username && password) {
        var storedUsers = JSON.parse(localStorage.getItem('usersData')) || [];

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

            storedUsers.push(userData);

            localStorage.setItem('usersData', JSON.stringify(storedUsers));
            localStorage.setItem('loggedInUser', username); // Dodano - postavljanje prijavljenog korisnika u localStorage
            localStorage.setItem('firstName', firstName); // Dodano - postavljanje imena u localStorage
            localStorage.setItem('lastName', lastName); // Dodano - postavljanje prezimena u localStorage

            window.location.href = '3d.html';
        }
    } else {
        alert('Molimo unesite sve podatke.');
    }
});
