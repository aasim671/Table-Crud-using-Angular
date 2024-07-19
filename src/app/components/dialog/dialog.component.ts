import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() employeeAdded = new EventEmitter<PeriodicElement>();

  employeeObj: PeriodicElement;

  private static currentId: number = 21;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    this.employeeObj = data ? { ...data } : {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  onsave() {
    if (!this.data) { // Only increment ID if it's a new employee
      this.employeeObj.id = DialogComponent.currentId++;
    }
    this.employeeAdded.emit(this.employeeObj);
    this.dialogRef.close(this.employeeObj);
  }

  oncancel(): void {
    this.dialogRef.close();
  }
}
