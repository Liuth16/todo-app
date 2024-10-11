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
}

export {Project}