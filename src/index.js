import "./styles.css";
import { Project } from "./project";
import { Task } from "./task";
import {compareAsc} from 'date-fns';
import { displayProject, populateProjectList, initEventListeners } from "./domcontroller";

export {createProject, createTask, getProjectByName, showProject, sortedTasks, getTasks}

const projectList = [];

function createProject(name){
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

const project1 = createProject("Default")
const task1 = createTask("First task", "Do nothing on this first one", "2024-09-23", "Medium")
const task2 = createTask("Second task", "Run", "2024-09-23", "High")
project1.addTask(task1);
project1.addTask(task2)

console.log(projectList)


populateProjectList(projectList);
initEventListeners(projectList);
showProject("Default")
