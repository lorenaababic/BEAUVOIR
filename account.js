window.addEventListener('DOMContentLoaded', function() {
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername) {
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        const user = usersData.find(user => user.username === loggedInUsername);
        if (user) {
            document.getElementById('username').textContent = user.username;
            document.getElementById('full-name').textContent = `${user.firstName} ${user.lastName}`;
            const profilePicture = localStorage.getItem(`profilePicture_${loggedInUsername}`);
            if (profilePicture) {
                document.getElementById('profile-pic').src = profilePicture;
            }
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
            const loggedInUsername = localStorage.getItem('loggedInUser');
            if (loggedInUsername) {
                let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
                const userIndex = usersData.findIndex(user => user.username === loggedInUsername);
                if (userIndex !== -1) {
                    usersData[userIndex].profilePicture = imageDataUrl;
                    localStorage.setItem('usersData', JSON.stringify(usersData));
                    localStorage.setItem(`profilePicture_${loggedInUsername}`, imageDataUrl);
                }
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('back-to-3d-viewer').addEventListener('click', function() {
    window.location.href = '3d.html';
});
