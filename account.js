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
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
        document.getElementById('profile-pic').src = savedProfilePicture;
    }
});

document.getElementById('back-to-3d-viewer').addEventListener('click', function() {
    window.location.href = '3d.html';
});
