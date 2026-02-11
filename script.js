// Load stored data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

// Save functions
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveSubscribers() {
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
}

// INDEX PAGE
const taskInput = document.getElementById("task-desc");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const countPending = document.getElementById("count-pending");
const errorMsg = document.getElementById("task-error");

function renderTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";
    let pending = 0;

    tasks.forEach((task, index) => {

        const card = document.createElement("div");
        card.classList.add("task-card");

        if (task.completed) {
            card.classList.add("completed");
        } else {
            pending++;
        }

        card.innerHTML = `
            <h4>${task.description}</h4>
            <p>Category: ${task.category}</p>
            <p>Priority: ${task.priority}</p>
            <button onclick="toggleTask(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(card);
    });

    if (countPending) {
        countPending.textContent = pending;
    }
}

if (addBtn) {
    addBtn.addEventListener("click", () => {

        const description = taskInput.value.trim();

        if (description === "") {
            errorMsg.textContent = "Task description cannot be empty.";
            return;
        }

        errorMsg.textContent = "";

        const newTask = {
            description: description,
            category: categoryInput.value,
            priority: priorityInput.value,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        taskInput.value = "";
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();

// ABOUT PAGE STATS
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const pendingTasksEl = document.getElementById("pending-tasks");

if (totalTasksEl) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

// INFO PAGE
const subscribeBtn = document.getElementById("subscribe-btn");
const subscribeEmail = document.getElementById("subscribe-email");
const emailError = document.getElementById("email-error");
const subscriberCount = document.getElementById("subscriber-count");

if (subscriberCount) {
    subscriberCount.textContent = subscribers.length;
}

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {

        const email = subscribeEmail.value.trim();

        if (email === "" || !email.includes("@")) {
            emailError.textContent = "Please enter a valid email.";
            return;
        }

        emailError.textContent = "";

        subscribers.push(email);
        saveSubscribers();

        subscriberCount.textContent = subscribers.length;
        subscribeEmail.value = "";
    });
}


