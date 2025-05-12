const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.createElement("p");
taskCount.id = "task-count";
document.querySelector(".todo-app").insertBefore(taskCount, listContainer);

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("Please enter a task!");
        return; // Exit if the input is empty
    }

    let li = document.createElement("li");
    li.innerHTML = taskText;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // This is the delete symbol (×)
    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = ""; // Clear input box after adding

    updateTaskCount();
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    updateTaskCount();
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ""; // Use empty string if null
    updateTaskCount();
}

function updateTaskCount() {
    const tasks = listContainer.getElementsByTagName("li");
    const remainingTasks = tasks.length - Array.from(tasks).filter(task => task.classList.contains("checked")).length;
    taskCount.innerText = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}

showTask();
