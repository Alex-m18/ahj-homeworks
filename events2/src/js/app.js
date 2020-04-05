import TaskManager from './TaskManager';
import TaskController from './TaskController';

const taskManager = new TaskManager();
taskManager.bindToDOM(document.querySelector('#tasks_container'));

const taskController = new TaskController(taskManager);
taskController.init();
