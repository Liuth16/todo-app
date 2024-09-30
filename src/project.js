class Project {
    constructor(name) {
        this.name
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

export {Project}