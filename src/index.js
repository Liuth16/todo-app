import "./styles.css";
import { Project } from "./project";
import { Task } from "./task";
import {compareAsc} from 'date-fns';
import { displayProject, populateProjectList, initEventListeners } from "./domcontroller";

export {createProject, createTask, getProjectByName, showProject, sortedTasks, getTasks, saveChanges, loadProjectListFromLocalStorage}

document.addEventListener("DOMContentLoaded", () => {
    const storedProjects = loadProjectListFromLocalStorage();
    if (storedProjects.length > 0) {
        projectList.push(...storedProjects); 
        populateProjectList(projectList);
        showProject(projectList[0].name); 
    } else {
        const project1 = createProject("Default");
        const task1 = createTask("First task", "Do nothing on this first one", "2024-09-23", "Medium");
        const task2 = createTask("Second task", "Run", "2024-09-23", "High");
        project1.addTask(task1);
        project1.addTask(task2);

        populateProjectList(projectList);
        showProject(project1.name);
        saveChanges(); 
    }

    initEventListeners(projectList);
});


const projectList = [];

function createProject(name){
    const existingProject = projectList.find(project => project.name === name);
    if (existingProject){
        alert("This project already exists.")
        return null;
    }
    const project = new Project(name);
    projectList.push(project);
    return project
}

// Date format is 2024-09-30 yyyy/mm/dd

function createTask(title, description, dueDate, priority) {
    return new Task(title, description, dueDate, priority);
}

function getTasks(projectName) {
    const actualProject = getProjectByName(projectList, projectName)
    return actualProject.tasks;
}

function getProjectByName(projectList, projectName) {
    return projectList.find(project => project.name === projectName);
}

function sortedTasks (tasks) {
    return tasks.sort(sortTasksByDueDateAndPriority)
}

function sortTasksByDueDateAndPriority(taskA, taskB) {
    // First, compare due dates
    const dateComparison = compareAsc(new Date(taskA.dueDate), new Date(taskB.dueDate));

    // If due dates are the same, compare priorities
    if (dateComparison === 0) {
        // Assuming priority is stored as 'High', 'Medium', 'Low', we can assign numbers
        const priorityMap = { "High": 1, "Medium": 2, "Low": 3 };
        return priorityMap[taskA.priority] - priorityMap[taskB.priority];
    }

    return dateComparison;
}

function showProject (name) {
    const project = getProjectByName(projectList, name);
    if (project) {
        displayProject(project);
    }
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

function saveProjectListToLocalStorage(projectList) {
    if (storageAvailable('localStorage')) {
        console.log("Saving to localStorage", projectList);
        const projectListData = projectList.map(project => ({
            name: project.name,
            tasks: project.tasks.map(task => ({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                completed: task.completed,
            }))
        }));
        localStorage.setItem('projectList', JSON.stringify(projectListData));
    }
}

function loadProjectListFromLocalStorage() {
    if (storageAvailable('localStorage')){
        const projectListData = localStorage.getItem('projectList');
        if (projectListData) {
            console.log("Loaded from localStorage", projectListData);
            const parsedData = JSON.parse(projectListData);
            return parsedData.map(projectData => {
                const project = new Project(projectData.name);
                projectData.tasks.forEach(taskData => {
                    const task = new Task (
                        taskData.title,
                        taskData.description,
                        taskData.dueDate,
                        taskData.priority,
                    );
                    task.completed = taskData.completed;
                    project.addTask(task)
                });
                return project;
            })
        }
    }
    return [];
}

function saveChanges() {
    saveProjectListToLocalStorage(projectList);
}
