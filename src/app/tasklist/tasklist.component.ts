import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  employee: any;
  taskList: any;
  data: any;
  displayStyle = "none";
  addDisplayStyle = 'none';
  deleteDisplayStyle = 'none';
  message: string = "";
  due_date: any;
  priority: any;
  assigned_to: any;
  taskForm: FormGroup;
  update: boolean = false;
  taskid:any;
  constructor(private crudService: CrudService, public fb: FormBuilder, private toastr: ToastrService) {
    this.taskForm = this.fb.group({
      message: [''],
      due_date: [''],
      priority: [''],
      assigned_to: ['']
    })
  }

  ngOnInit() {
    this.getTaskList();
  }

  // TASK LIST
  getTaskList() {
    this.crudService.getTaskList().subscribe((result: any) => {
      if (result.status == 'success') {
        this.taskList = result.tasks.reverse();
      }
      else {
        console.log('error');
      }
    },
      err => {
        console.error(err);
      })
  }

  // ADD TASK
  addTask() {
    // FORM DATA
    if(this.update == false){
      const taskForm = new FormData();
      taskForm.append("due_date", this.taskForm.value.due_date,);
      taskForm.append("message", this.taskForm.value.message);
      taskForm.append("assigned_to", this.taskForm.value.assigned_to);
      taskForm.append("priority", this.taskForm.value.priority);
      //RAW DATA
      // let payLoad = {
      //   message: this.taskForm.value.message,
      //   due_date: this.taskForm.value.due_date,
      //   priority: this.taskForm.value.priority,
      //   assigned_to: this.taskForm.value.assigned_to
      // }    
      this.crudService.addTask(taskForm).subscribe(
        (data: any) => {
          if (data.status == 'success') {
            this.toastr.success(`added successfully`);
            this.taskForm.reset();
            this.closePopup();
            this.getTaskList();
          } else {
            console.log('error')
          }
        },
        err => {
          console.error(err);
        },
      )
    } else {
      this.updateTask();
    }
  
  }

  selectUpdate(task:any){
    this.update = true;
    this.onclick();
    this.taskid = task.id
    this.taskForm.controls.due_date.setValue(task.due_date);
    this.taskForm.controls.message.setValue(task.message);
    this.taskForm.controls.assigned_to.setValue(task.assigned_to);
    this.taskForm.controls.priority.setValue(task.priority);
  }

  // UPDATE TASK
  updateTask() {
    const taskForm = new FormData();
    taskForm.append("taskid", this.taskid)
    taskForm.append("due_date", this.taskForm.value.due_date);
    taskForm.append("message", this.taskForm.value.message);
    taskForm.append("assigned_to", this.taskForm.value.assigned_to);
    taskForm.append("priority", this.taskForm.value.priority)
    console.log(taskForm);
    this.crudService.updateTask(taskForm).subscribe((result: any) => {
      if (result.status == "success") {
        this.toastr.success(`updated successfully`);
        this.closePopup();
        this.getTaskList();
      } else {
        console.log("error");
      }
    }, err => {
      console.log(err);
    })
  }

  deletePopup(task:any){
    this.taskid = task
    this.deleteDisplayStyle = "block";
  }
  // DELETE TASK
  deleteTask() {
    const payLoad = new FormData();
    payLoad.append("taskid", this.taskid);
    this.crudService.deleteTask(payLoad).subscribe((result: any) => {
      if (result.status == "success") {
        this.toastr.error(`deleted successfully`);
        this.getTaskList();
        this.closePopup();
      } else {
        console.log('error')
      }
    }, err => {
      console.error(err);
    },
    )
  }

  // MORE INFO
  moreInfo(task: any) {
    this.data = task;
    this.displayStyle = "block";
  }

  // OPEN POPOUP
  onclick() {
    this.taskForm.reset();
    this.addDisplayStyle = "block";
  }

  // CLOASE POPUP
  closePopup() {
    this.update = false;
    this.displayStyle = "none";
    this.addDisplayStyle = "none";
    this.deleteDisplayStyle = "none";

  }

}
