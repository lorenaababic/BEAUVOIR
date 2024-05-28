window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        const user = usersData.find(user => user.username === loggedInUser);

        if (user) {
            document.getElementById('username').textContent = user.username; // Koristi samo korisničko ime
            document.getElementById('full-name').textContent = `${user.firstName} ${user.lastName}`;
        }

        // Provjeri postoji li spremljena slika za ovog korisnika
        const savedProfilePicture = localStorage.getItem(`profilePicture_${loggedInUser}`);
        if (savedProfilePicture) {
            document.getElementById('profile-pic').src = savedProfilePicture;
        }
    } else {
        document.getElementById('username').textContent = 'Guest';
    }
});

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

            const loggedInUser = localStorage.getItem('loggedInUser');
            localStorage.setItem(`profilePicture_${loggedInUser}`, imageDataUrl);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('back-to-3d-viewer').addEventListener('click', function() {
    window.location.href = '3d.html';
});
