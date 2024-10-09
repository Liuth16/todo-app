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


export {displayProject, populateProjectList}