import { createProject, createTask, getProjectByName, showProject, sortedTasks, getTasks } from ".";



function populateProjectList(projectList) {
    const projectListElement = document.querySelector(".project-list ul");

    projectListElement.innerHTML = "";

    projectList.forEach((project) => {
        const listItem = document.createElement("li");
        const projectLink = document.createElement("a");
        projectLink.href = "#"
        projectLink.textContent = project.name;
        listItem.appendChild(projectLink);
        projectListElement.appendChild(listItem);
    });
}

function displayProject (project) {
    const projectTitleElement = document.querySelector(".project-title");
    projectTitleElement.textContent = project.name;

    const projectTableBody = document.querySelector(".project-table table");
    while (projectTableBody.rows.length > 1){
        projectTableBody.deleteRow(1);
    }

    if (project.tasks.length === 0) {
        const noTaskRow = projectTableBody.insertRow();
        const noTaskCell = noTaskRow.insertCell();
        noTaskCell.colSpan = 5;
        noTaskCell.textContent = "No tasks for this project"
        noTaskCell.style.textAlign = "center";
    }


    project.tasks.forEach((task, index) => {
        const row = projectTableBody.insertRow();

        const completionCell = row.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task${index}`;
        checkbox.name = `task${index}`;
        completionCell.appendChild(checkbox);

        const titleCell = row.insertCell();
        titleCell.textContent = task.title;

        const descriptionCell = row.insertCell();
        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.rows = 4;
        descriptionTextarea.cols = 50;
        descriptionTextarea.value = task.description;
        descriptionCell.appendChild(descriptionTextarea);

        const dueDateCell = row.insertCell();
        dueDateCell.textContent = task.dueDate;

        const priorityCell = row.insertCell();
        priorityCell.textContent = task.priority;
    });
}

function initEventListeners(projectList) {
    const addProjectDialog = document.getElementById("addProjectDialog");
    const addTaskDialog = document.getElementById("addTaskDialog");

    const addProjectButton = document.getElementById("showProjectDialog");
    const addTaskButton = document.getElementById("showTaskDialog");
    const projectForm = document.querySelector("#addProjectForm");
    const taskForm = document.querySelector("#addTaskForm");

    // Add Project Button (Show dialog)
    addProjectButton.addEventListener("click", () => {
        addProjectDialog.showModal();
    });

    // Add Task Button (Show dialog)
    addTaskButton.addEventListener("click", () => {
        addTaskDialog.showModal();
    });

    // Cancel Project Dialog
    document.getElementById("cancelProject").addEventListener("click", () => {
        addProjectDialog.close();
    });

    // Cancel Task Dialog
    document.getElementById("cancelTask").addEventListener("click", () => {
        addTaskDialog.close();
    });

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projectName = document.getElementById("projectName").value;
        if (projectName) {
            createProject (projectName);
            populateProjectList(projectList);
            addProjectDialog.close();
            document.getElementById("projectName").value = "";
            showProject(projectName);
        }
    });


    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;

        const projectTitle = document.querySelector(".project-title").textContent;
        const project = getProjectByName(projectList, projectTitle);

        if (taskTitle && project) {
            const newTask = createTask(taskTitle, taskDescription, dueDate, priority);
            project.addTask(newTask);
            sortedTasks(project.tasks);
            displayProject(project);
            addTaskDialog.close();
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDescription").value = "";
            document.getElementById("dueDate").value = "";
            document.getElementById("priority").value = "High";
        }
    });

    document.querySelector(".project-list ul").addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            const projectName = event.target.textContent;
            const project = getProjectByName(projectList, projectName);
            if (project) {
                displayProject(project);
            }
        }
    });
}


export {displayProject, populateProjectList, initEventListeners}