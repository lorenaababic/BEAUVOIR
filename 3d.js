import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Dodajte slušatelja događaja na gumb "Choose File" koji će pokrenuti odabir datoteke
document.getElementById('choose-file-button').addEventListener('click', () => {
    document.getElementById('model-file').click();
});

// Dodajte slušatelja događaja na input element koji reagira kada se odabere datoteka
document.getElementById('model-file').addEventListener('change', async (event) => {
    const file = event.target.files[0]; // Dohvati odabranu datoteku

    if (file) {
        // Učitaj datoteku i prikaži model na stranici
        const modelPost = await uploadAndDisplayModel(file);
        document.getElementById('models-gallery').appendChild(modelPost);
    }
});

// Funkcija za učitavanje datoteke i prikazivanje modela
async function uploadAndDisplayModel(file) {
    const formData = new FormData();
    formData.append('name', 'Custom Model'); // Pretpostavimo naziv modela
    formData.append('description', 'Custom Model Description'); // Pretpostavimo opis modela
    formData.append('file', file);

    try {
        const response = await fetch('/upload-model', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const modelData = await response.json(); // Pretpostavimo da server vraća podatke o novom modelu
            return createModelPost(modelData); // Kreiraj HTML element za prikaz novog modela
        } else {
            console.error('Error uploading model:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading model:', error);
        return null;
    }
}

// Funkcija za stvaranje HTML elementa koji prikazuje model post
function createModelPost(modelData) {
    const modelPost = document.createElement('div');
    modelPost.classList.add('post');

    const modelContainer = document.createElement('div');
    modelContainer.classList.add('model-container');
    modelContainer.innerHTML = '<img src="' + modelData.thumbnailUrl + '" alt="' + modelData.name + '">'; // Pretpostavimo da server vraća URL sličice modela
    modelPost.appendChild(modelContainer);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.innerHTML = '<h3>' + modelData.name + '</h3><p>' + modelData.description + '</p>'; // Pretpostavimo da server vraća naziv i opis modela
    modelPost.appendChild(postContent);

    return modelPost;
}

document.getElementById('choose-file-button').addEventListener('click', () => {
    document.getElementById('model-file').click();
});

document.getElementById('model-file').addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        const modelPost = await uploadAndDisplayModel(file);
        document.getElementById('models-gallery').appendChild(modelPost);
    }
});

async function uploadAndDisplayModel(file) {
    const formData = new FormData();
    formData.append('name', 'Custom Model');
    formData.append('description', 'Custom Model Description');
    formData.append('file', file);

    try {
        const response = await fetch('/upload-model', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const modelData = await response.json();
            return createModelPost(modelData);
        } else {
            console.error('Error uploading model:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading model:', error);
        return null;
    }
}

function createModelPost(modelData) {
    const modelPost = document.createElement('div');
    modelPost.classList.add('post');

    const modelContainer = document.createElement('div');
    modelContainer.classList.add('model-container');
    modelContainer.innerHTML = '<img src="' + modelData.thumbnailUrl + '" alt="' + modelData.name + '">';
    modelPost.appendChild(modelContainer);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.innerHTML = '<h3>' + modelData.name + '</h3><p>' + modelData.description + '</p>';
    modelPost.appendChild(postContent);

    return modelPost;
}

function init(containerId, modelPath) {
    const container = document.getElementById(containerId);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(4, 5, 11);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.5;
    controls.autoRotate = false;
    controls.target = new THREE.Vector3(0, 1, 0);
    controls.update();

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.setPath(modelPath);
    loader.load(
        'scene.gltf',
        function (gltf) {
            const object = gltf.scene;
            object.scale.set(1, 1, 1);
            scene.add(object);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    function onResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener("resize", onResize);

    animate();
    onResize();
    
    // Add mouse movement functionality to the first model post


    
}

init('container3D-1', '/public/free_porsche_911_carrera_4s/');
init('container3D-2', '/public/ferrari_f1_2019/');
init('container3D-3', '/public/snake_dragon/')
init('container3D-4', '/public/ufo_flying_saucer_spaceship_ovni/')
init('container3D-5', '/public/la_night_city/')