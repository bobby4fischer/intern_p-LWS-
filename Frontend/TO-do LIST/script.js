const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
let todo12=JSON.parse(localStorage.getItem("todo12")) || [];

function renderTasks() 
{
    listContainer.innerHTML="";
    todo12.forEach((task, index) => {
        const li=document.createElement("li");
        li.innerText=task.text;
        if(task.completed) li.classList.add("checked");
        li.setAttribute("data-index", index);

        const span=document.createElement("span");
        span.innerHTML="\u00d7";
        span.style.marginLeft="10px";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

function addTask() 
{
    const taskText=inputBox.value.trim();
    if(taskText === "") 
    {
        alert("You must write something!");
        return;
    }
    todo12.push({ text: taskText, completed: false });
    inputBox.value = "";
    saveData();
    renderTasks();
}

listContainer.addEventListener("click", function(e) {
    const li=e.target.closest("li");
    const index=li.getAttribute("data-index");
    if(e.target.tagName === "LI")  todo12[index].completed=!todo12[index].completed;
    else if(e.target.tagName === "SPAN")  todo12.splice(index, 1);
    saveData();
    renderTasks();
});

function saveData() {
    localStorage.setItem("todo12", JSON.stringify(todo12));
}

// Initial render
renderTasks();