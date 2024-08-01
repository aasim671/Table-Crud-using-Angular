import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DialogComponent, PeriodicElement } from './components/dialog/dialog.component';
import { DelteteComponen } from './components/delete/delete.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    DialogComponent,
    DelteteComponen,
    MatLabel,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Employee Table';
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item: PeriodicElement, property: string) => {
      switch (property) {
        case 'name': return item.firstName + ' ' + item.lastName;
        case 'email': return item.email;
        default: return ''; // Handle other cases or return an empty string
      }
    };
  }


  opendialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.employeeAdded.subscribe((newEmployee: PeriodicElement) => {
      this.dataSource.data = [...this.dataSource.data, newEmployee];
    });
  }

  delete(element: PeriodicElement) {
    const dialogdel = this.dialog.open(DelteteComponen, {
      data: element
    });

    dialogdel.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.indexOf(element);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = [...this.dataSource.data]; // Update the dataSource to trigger change detection
        }
      }
    });
  }

  edit(element: PeriodicElement) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElement) => {
      if (result) {
        const index = this.dataSource.data.findIndex(e => e.id === element.id);
        if (index >= 0) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Update the dataSource to trigger change detection
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, firstName: 'Hydrogen', lastName: '', email: 'hydrogen@example.com' },
  { id: 2, firstName: 'Helium', lastName: '', email: 'helium@example.com' },
  { id: 3, firstName: 'Lithium', lastName: '', email: 'lithium@example.com' },
  { id: 4, firstName: 'Beryllium', lastName: '', email: 'beryllium@example.com' },
  { id: 5, firstName: 'Boron', lastName: '', email: 'boron@example.com' },
  { id: 6, firstName: 'Carbon', lastName: '', email: 'carbon@example.com' },
  { id: 7, firstName: 'Nitrogen', lastName: '', email: 'nitrogen@example.com' },
  { id: 8, firstName: 'Oxygen', lastName: '', email: 'oxygen@example.com' },
  { id: 9, firstName: 'Fluorine', lastName: '', email: 'fluorine@example.com' },
  { id: 10, firstName: 'Neon', lastName: '', email: 'neon@example.com' },
  { id: 11, firstName: 'Sodium', lastName: '', email: 'sodium@example.com' },
  { id: 12, firstName: 'Magnesium', lastName: '', email: 'magnesium@example.com' },
  { id: 13, firstName: 'Aluminum', lastName: '', email: 'aluminum@example.com' },
  { id: 14, firstName: 'Silicon', lastName: '', email: 'silicon@example.com' },
  { id: 15, firstName: 'Phosphorus', lastName: '', email: 'phosphorus@example.com' },
  { id: 16, firstName: 'Sulfur', lastName: '', email: 'sulfur@example.com' },
  { id: 17, firstName: 'Chlorine', lastName: '', email: 'chlorine@example.com' },
  { id: 18, firstName: 'Argon', lastName: '', email: 'argon@example.com' },
  { id: 19, firstName: 'Potassium', lastName: '', email: 'potassium@example.com' },
  { id: 20, firstName: 'Calcium', lastName: '', email: 'calcium@example.com' },
];
