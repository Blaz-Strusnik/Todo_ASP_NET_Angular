import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject,tap, of } from 'rxjs';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  dataSaved = false;
  taskForm: any;
  allTasks: Observable<Task[]>;
  taskIdUpdate = null;
  massage = null;


  dataSource = new UserDataSource(this.taskService);
  displayedColumns = ['taskName', 'taskDescription', 'startDate', 'endDate','edit', 'delete'];

  constructor(private formbulider: FormBuilder, private taskService:TaskService,private modalService: NgbModal) {}
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.taskForm = this.formbulider.group({
      Task: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]]
    });

    this.loadAllTasks();

  }



 loadAllTasks() {
    this.allTasks = this.taskService.getAllTask();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const task = this.taskForm.value;
    this.CreateTask(task);
    this.taskForm.reset();
  }
  loadTaskToEdit(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe(task=> {
      this.massage = null;
      this.dataSaved = false;
      this.taskIdUpdate = task.id;
      this.taskForm.controls['Task'].setValue(task.Task);
     this.taskForm.controls['Description'].setValue(task.Description);
      this.taskForm.controls['StartDate'].setValue(task.StartDate);
      this.taskForm.controls['EndDate'].setValue(task.EndDate);
    });

  }
  CreateTask(task: Task) {
    if (this.taskIdUpdate == null) {
      this.taskService.createTask(task).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllTasks();
          this.taskIdUpdate = null;
          this.taskForm.reset();

        }
      );
    } else {
      task.id = this.taskIdUpdate;
      this.taskService.updateTask(task).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllTasks();
        this.taskIdUpdate = null;
        this.taskForm.reset();


      });
    }
  }
  deleteTask(taskId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.taskService.deleteTaskById(taskId).subscribe(() => {
      this.dataSaved = true;
      this.massage = 'Record Deleted Succefully';
      this.loadAllTasks();
      this.taskIdUpdate = null;
      this.taskForm.reset();
    });
  }
}
  resetForm() {
    this.taskForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }

  }


export class UserDataSource extends DataSource<any> {


  constructor(private taskService: TaskService) {
    super();
  }


  connect(): Observable<Task[]> {
    return this.taskService.getAllTask();
  }

  disconnect() {}


}
