document.getElementById('change-profile-btn').addEventListener('click', function() {
    document.getElementById('profile-picture-input').click();
});

document.getElementById('profile-picture-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            const imageDataUrl = reader.result;
            document.getElementById('profile-pic').src = imageDataUrl;
            localStorage.setItem('profilePicture', imageDataUrl);
            // Ovdje možete dodati logiku za spremanje slike na server
        };

        reader.readAsDataURL(file);
    }
});

// Provjera prilikom učitavanja stranice da li postoji spremljena slika profila
window.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('loggedInUser');
    const firstName = localStorage.getItem('firstName'); // Promijenjeno - dohvaćanje imena iz localStorage-a
    const lastName = localStorage.getItem('lastName'); // Promijenjeno - dohvaćanje prezimena iz localStorage-a

    if (username) {
        document.getElementById('username').textContent = username;
        document.getElementById('full-name').textContent = `${firstName} ${lastName}`; // Promijenjeno - prikaz punog imena i prezimena
    } else {
        document.getElementById('username').textContent = 'Guest';
    }

    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
        document.getElementById('profile-pic').src = savedProfilePicture;
    }
});

document.getElementById('back-to-3d-viewer').addEventListener('click', function() {
    window.location.href = '3d.html';
});
