import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { JsonRulesDataService } from './services/json-rules-data.service';
import { Rule } from './models/rules';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AgGridAngular, NgIf, FormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend_project';
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Reference to the grid
  rowData: Rule[] = [];
  rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi;
  isEditing: boolean = false;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false, 
    },
    {
      field: 'ruleName',
      headerName: 'Rule Name',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'active',
      headerName: 'Active Status',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Rule Type',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'subType',
      headerName: 'Sub Type',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'impacted',
      headerName: 'Impacted Count',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'favourite',
      headerName: 'Marked as Favourite',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'scheduled',
      headerName: 'Scheduled Status',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'lastScheduledDate',
      headerName: 'Last Scheduled Date',
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      field: 'alert',
      headerName: 'Alert Enabled',
      sortable: true,
      filter: true,
      editable: false,
    },
  ];

  gridOptions: GridOptions = {
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };
  defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };

  constructor(private jsonRulesDataService: JsonRulesDataService) {}
  ngOnInit(): void {
    this.receiveData();
  }

  receiveData() {
    this.jsonRulesDataService.getRules().subscribe({
      next: (data: Rule[]) => {
        // console.log(data);
        this.rowData = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error while fetching json:', error);
      },
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  getSelectedRows() {
    if (!this.gridApi) {
      console.error('Grid API is not initialized yet');
      return;
    }

    const selectedData = this.gridApi.getSelectedRows();

    if (selectedData.length === 0) {
      alert('Please select a single row or multiple rows');
      return;
    }

    console.log('Selected rows:', selectedData);
    alert('Updated');
  }

  // Editing
  enableEditing() {
    this.isEditing = true;
    this.columnDefs = this.columnDefs.map((col) => ({
      ...col,
      editable: col.field !== 'id',
    }));
  }

  //Save Data
  saveUpdatedData() {
    if (!this.gridApi) {
      console.error('API is not initialized');
      return;
    }

    this.isEditing = false;
    this.columnDefs = this.columnDefs.map((col) => ({
      ...col,
      editable: false,
    }));

    const updatedData: any[] = [];
    this.gridApi.forEachNode((node) => updatedData.push(node.data));
    console.log('Updated Table Data:', updatedData);
    alert('Updated data is saved, Please Check console.');
  }
}
