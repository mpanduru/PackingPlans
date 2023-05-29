import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  constructor(
    public dialogRef: MatDialogRef<AllUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public users: any[]) {
  }
}
