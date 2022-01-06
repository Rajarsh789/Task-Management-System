import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList:any;
  constructor(private crudservice : CrudService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.crudservice.getUserList().subscribe((result:any)=>{
       if(result.status == "success"){
         this.userList = result.users
       } else {
         console.log("error");
       }
    },
    err => {
      console.log(err); 
    }
    )
  }

}
