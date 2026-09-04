const popup = document.getElementById("popup");
const title = document.getElementById("levelTitle");
const text = document.getElementById("levelText");
const enterBtn = document.getElementById("enterBtn");

let currentLevel = 1;

// Default unlock Level 1
let unlockedLevel = Number(localStorage.getItem("pandyaUnlockedLevel")) || 1;

updateLevels();

function openLevel(level){

    if(level>unlockedLevel){
        alert("🔒 Complete the previous level first.");
        return;
    }

    currentLevel = level;

    title.innerHTML = "LEVEL " + level;

    text.innerHTML = "Battle of the First Fortress";

    popup.style.display = "flex";
}

function closePopup(){
    popup.style.display = "none";
}

enterBtn.addEventListener("click",()=>{

    window.location.href = "ch1le1.html";

});

function updateLevels(){

    for(let i=1;i<=9;i++){

        const btn = document.getElementById("level"+i);

        if(i<=unlockedLevel){

            btn.classList.remove("lock");
            btn.classList.add("unlock");

            btn.innerHTML = `
                ${i}
                <span class="label">LEVEL ${i}</span>
            `;

        }else{

            btn.classList.remove("unlock");
            btn.classList.add("lock");

            btn.innerHTML = `
                🔒
                <span class="label">LEVEL ${i}</span>
            `;

        }

    }

}

// Call this after winning Level 1
function unlockNextLevel(level){

    if(level>=unlockedLevel && level<9){

        unlockedLevel = level + 1;

        localStorage.setItem("pandyaUnlockedLevel",unlockedLevel);

        updateLevels();

    }

}