// ==========================================
// PANDYA EMPIRE - TASK 1 PALACE MISSION
// task1.js
// ==========================================

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ================= PLAYER DATA =================

let coins = Number(localStorage.getItem("pandyaCoins")) || 100;
let pearls = Number(localStorage.getItem("pandyaPearls")) || 50;
let lives = 5;

document.getElementById("coinCount").innerText = coins;
document.getElementById("pearlCount").innerText = pearls;
document.getElementById("lives").innerText = lives;

// ================= LOADING SCREEN =================

const loadingScreen = document.getElementById("loadingScreen");
const progressBar = document.getElementById("progressBar");

let progress = 0;

const loading = setInterval(() => {

    progress += 4;
    progressBar.style.width = progress + "%";

    if(progress >= 100){

        clearInterval(loading);

        setTimeout(() => {
            loadingScreen.style.display = "none";
        },300);

    }

},120);

// ================= THREE JS SCENE =================

const scene = new THREE.Scene();

// Transparent canvas (bg.jpeg is behind)
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,7,18);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("gameCanvas"),
    antialias:true,
    alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// ================= LIGHTS =================

const ambient = new THREE.AmbientLight(0xffffff,1.5);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xfff2b5,3);
sun.position.set(20,25,10);
sun.castShadow = true;
scene.add(sun);

// ================= BUILD PLATFORM =================

const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(5,5,0.4,40),
    new THREE.MeshStandardMaterial({
        color:0x5b3b18,
        roughness:0.8
    })
);

platform.position.y = -0.2;
platform.receiveShadow = true;
scene.add(platform);

// ================= PALACE MODEL =================

const loader = new GLTFLoader();

let palace = null;

loader.load(

    "./pandyar3/assets/models/palace.glb",

    (gltf)=>{

        palace = gltf.scene;

        palace.scale.set(2.5,2.5,2.5);

        // Hidden under ground first
        palace.position.set(0,-8,0);

        palace.rotation.y = Math.PI;

        palace.visible = false;

        palace.traverse((child)=>{
            if(child.isMesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(palace);

        console.log("Palace Loaded Successfully");

    },

    undefined,

    (error)=>{
        console.error(error);
        alert("palace.glb file not found!");
    }

);

// ================= CAMERA CONTROL =================

const controls = new OrbitControls(camera,renderer.domElement);

controls.enablePan = false;
controls.enableZoom = true;
controls.enableRotate = true;

controls.minDistance = 10;
controls.maxDistance = 25;

controls.maxPolarAngle = Math.PI / 2.2;

controls.target.set(0,3,0);

controls.update();

// ================= BUILD PALACE =================

const buildBtn = document.getElementById("buildBtn");
const buildEffect = document.getElementById("buildEffect");
const completeBtn = document.getElementById("completeBtn");

buildBtn.onclick = ()=>{

    if(!palace){
        alert("Palace model is still loading...");
        return;
    }

    if(coins < 5000 || pearls < 100){

        alert("❌ Need 5000 Coins and 100 Pearls!");
        return;

    }

    coins -= 5000;
    pearls -= 100;

    document.getElementById("coinCount").innerText = coins;
    document.getElementById("pearlCount").innerText = pearls;

    localStorage.setItem("pandyaCoins",coins);
    localStorage.setItem("pandyaPearls",pearls);

    buildBtn.disabled = true;
    buildBtn.innerText = "BUILDING PALACE...";

    buildEffect.style.display = "flex";

    palace.visible = true;

    let y = -8;

    const buildAnimation = setInterval(()=>{

        y += 0.08;

        palace.position.y = y;

        palace.rotation.y += 0.01;

        if(y >= 0){

            clearInterval(buildAnimation);

            palace.position.y = 0;

            buildEffect.style.display = "none";

            buildBtn.style.display = "none";

            completeBtn.style.display = "inline-block";

        }

    },20);

};

// ================= COMPLETE MISSION =================

completeBtn.onclick = ()=>{

    coins += 5000;
    pearls += 100;

    document.getElementById("coinCount").innerText = coins;
    document.getElementById("pearlCount").innerText = pearls;

    localStorage.setItem("pandyaCoins",coins);
    localStorage.setItem("pandyaPearls",pearls);

    // Unlock Task 2
    localStorage.setItem("pandyaUnlockedTask",2);

    document.getElementById("missionPopup").style.display = "flex";

};

// ================= CONTINUE =================

document.getElementById("continueBtn").onclick = ()=>{

    window.location.href = "task.html";

};

// ================= RESIZE =================

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});

// ================= ANIMATION LOOP =================

function animate(){

    requestAnimationFrame(animate);

    renderer.render(scene,camera);

}

animate();