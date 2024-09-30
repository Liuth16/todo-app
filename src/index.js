import "./styles.css";
import { Project } from "./project";
import { Task } from "./task";

const projectList = [];

function createProject(name){
    const project = new Project(name);
    projectList.push(project);
    return project
}

function createTask(title, description, dueDate, priority) {
    return new Task(title, description, dueDate, priority);
}


