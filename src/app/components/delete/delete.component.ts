import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DelteteComponen {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(
    public dialogdel: MatDialogRef<DelteteComponen>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onsave() {
    this.confirmDelete.emit();
    this.dialogdel.close(true);
  }

  oncancel(): void {
    this.dialogdel.close(false);
  }
}
