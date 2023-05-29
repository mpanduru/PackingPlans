import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivityService} from "../../services/activityService/activity.service";
import {DialogService} from "../dialogService/dialog.service";

@Component({
  selector: 'app-specific-trip-activities',
  templateUrl: './specific-trip-activities.component.html',
  styleUrls: ['./specific-trip-activities.component.css']
})
export class SpecificTripActivitiesComponent implements OnInit {
  beforeEditActivity: any;

  constructor(
    public dialogRef: MatDialogRef<SpecificTripActivitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public activities: any[],
    private activityService: ActivityService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    for (let activity of this.activities) {
      activity.isEditMode = false;
    }

    console.log(this.activities);
  }

  toggleIsEditable(activity: any) {
    this.beforeEditActivity = Object.assign({}, activity);
    activity.isEditMode = !activity.isEditMode;
    console.log(activity);
  }

  editActivity(activity: any) {
    this.activityService.editActivity(activity.id, activity.name, activity.description, activity.startTime, activity.day, activity.tripId).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      }, err => {
        console.log(err);
      }
    )
    activity.isEditMode = !activity.isEditMode;
  }

  exitEditActivity(activity: any) {
    activity.name = this.beforeEditActivity.name;
    activity.day = this.beforeEditActivity.day;
    activity.description = this.beforeEditActivity.description;
    activity.startTime = this.beforeEditActivity.startTime;
    activity.isEditMode = false;
  }

  onNewActivity() {
    this.dialogService.openNewActivityDialog(this.activities[0].tripId);
  }
}
