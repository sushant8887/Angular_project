import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { FormService } from '../form.service';
import { CommonModule, NgIf } from '@angular/common';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, NgIf,NavbarComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  users: any;
  constructor(
    private service: CommonService,
    public regForm: FormService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllUsers();
    this.GetAllUsers();
  }
  GetAllUsers() {
    this.service.GetAllUsers().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Get the last user object from the array
        this.users = data[data.length - 1];
        console.log('Last user:', this.users);
      } else {
        console.log('No users found.');
      }
    });
  }

  GetUserByID(id: any) {
    this.service.GetUserByID(id).subscribe((data) => {
      
      this.openDialog();

      this.regForm.registrationForm.patchValue({
        profileImage: data.profileImage,
        tags: data.tags,
        addressType: data.addressType,
        address1: data.address1,
        address2: data.address2,
        companyAddress1: data.companyAddress1,
        companyAddress2: data.companyAddress2,
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNo: data.phoneNo,
        age: data.age,
        country: data.country,
        state: data.state,
        email: data.email,
      });
      
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.GetAllUsers();
      console.log(`Dialog result: ${result}`);
    });
  }
}