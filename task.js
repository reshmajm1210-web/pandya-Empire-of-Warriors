// ==========================================
// PANDYA EMPIRE - TASK BOARD
// task.js
// ==========================================

// Default Coins & Pearls
let coins = Number(localStorage.getItem("pandyaCoins")) || 100;
let pearls = Number(localStorage.getItem("pandyaPearls")) || 50;

// Default Task Unlock (Task 1 only)
let unlockedTask = Number(localStorage.getItem("pandyaUnlockedTask")) || 1;

// Update Coins & Pearls on Page Load
window.onload = function () {
    updateStats();
    updateTasks();
};

// ================= UPDATE COINS & PEARLS =================

function updateStats() {
    document.getElementById("coins").innerText = coins;
    document.getElementById("pearls").innerText = pearls;
}

// ================= UPDATE TASKS =================

function updateTasks() {

    const cards = document.querySelectorAll(".task-card");

    cards.forEach((card, index) => {

        const taskNumber = index + 1;
        const lock = card.querySelector(".lock-circle");

        if (taskNumber <= unlockedTask) {

            // Unlock
            if(lock) lock.style.display = "none";

            card.classList.add("unlocked");
            card.classList.remove("locked");

        } else {

            // Lock
            if(lock) lock.style.display = "flex";

            card.classList.add("locked");
            card.classList.remove("unlocked");
        }

    });

}

// ================= OPEN TASK =================

function openTask(taskNumber) {

    if (taskNumber > unlockedTask) {

        alert("🔒 Complete the previous task first!");
        return;

    }

    // Open task pages
    window.location.href = "task" + taskNumber + ".html";
}

// ================= COMPLETE TASK =================
// Use this inside task1.html, task2.html...

function completeTask(taskNumber) {

    // Give rewards
    coins += 50;
    pearls += 10;

    localStorage.setItem("pandyaCoins", coins);
    localStorage.setItem("pandyaPearls", pearls);

    // Unlock next task
    if (taskNumber === unlockedTask && taskNumber < 6) {

        unlockedTask = taskNumber + 1;
        localStorage.setItem("pandyaUnlockedTask", unlockedTask);

    }

    alert("🏆 Task " + taskNumber + " Completed!\n✨ Next Task Unlocked!");

    // Return to Task Board
    window.location.href = "task.html";
}

// ================= RESET TASK BOARD =================
// Type resetTasks() in browser console if needed.

function resetTasks() {

    coins = 100;
    pearls = 50;
    unlockedTask = 1;

    localStorage.setItem("pandyaCoins", coins);
    localStorage.setItem("pandyaPearls", pearls);
    localStorage.setItem("pandyaUnlockedTask", unlockedTask);

    updateStats();
    updateTasks();

    alert("Task Board Reset Successfully!");
}