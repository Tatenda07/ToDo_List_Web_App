import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/shared/models/tasks.model';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.css'],
  providers: [TasksService]
})
export class MainUiComponent implements OnInit {
  addNewTask = false;
  tasks: any;

  constructor(public taskService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.resetAddTaskForm();
    this.refreshTasksList();
  }

  toggleDisplayDivIf() {
    this.addNewTask = !this.addNewTask;
  }

  showTasks() {
    this.taskService.getTask().subscribe((data: any) => this.tasks = data);
    console.log(this.tasks);
  }

  resetAddTaskForm(form ?: NgForm) {
    if (form)
      form.reset();
    this.taskService.selectedTask = {
      _id: "",
      task: "",
      taskDescription: "",
      completed: false
    }
    this.addNewTask = false;
    this.refreshTasksList();
  }

  onSubmitTask(form : NgForm) {
    //add new task
    if (form.value._id === "") {
      this.taskService.postTask(form.value).subscribe((res) => {
        this.resetAddTaskForm(form);
        this.refreshTasksList();
      });

    //update exixting task
    } else {
      this.taskService.editTask(form.value).subscribe((res) => {
        this.resetAddTaskForm(form);
        this.refreshTasksList();
      });
    }
  }

  onEditTask(task : Tasks) {
    this.taskService.selectedTask = task;
    this.addNewTask = true;
  }

  refreshTasksList() {
    this.taskService.getTask().subscribe((res) => {
      this.taskService.allTasks = res as Tasks[];
    });
  }

  onCheckboxClick(task: Tasks) {
    this.taskService.completeTask(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }

  //delete task
  onDeleteTask(_id : string) {
    if(confirm('Are you sure you want to delete this task?') == true) {
      this.taskService.deleteTask(_id).subscribe((res) => {
        this.refreshTasksList();
      });
    }
  }

}

