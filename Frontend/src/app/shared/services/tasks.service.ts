import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tasks } from '../models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly baseURL = 'http://localhost:3000/tasks';
  selectedTask: Tasks = {
    _id: '',
    task: '',
    taskDescription: '',
    completed: true || false
  };

  allTasks!: Tasks[];

  constructor(private http: HttpClient) { }

  //add new task to the tasks list
  postTask(task: Tasks) {
    return this.http.post(this.baseURL, task);
  }

  //get all tasks
  getTask() {
    return this.http.get(this.baseURL);
  }

  //delete task
  deleteTask(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  //edit task information
  editTask(task : Tasks) {
    return this.http.patch(this.baseURL + `/${task._id}`, task);
  }

  //mark task as complete or incomplete
  completeTask(task : Tasks) {
    return this.http.patch(this.baseURL + `/${task._id}`, {
      completed: !task.completed
    });
  }
}
