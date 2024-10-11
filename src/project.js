import { saveChanges } from ".";

class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    addTask(task) {
        const existingTask = this.tasks.find(t => t.title === task.title);
        if (existingTask) {
            alert("This task already exist in this project")
            return null;
        }
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }
}

export {Project}