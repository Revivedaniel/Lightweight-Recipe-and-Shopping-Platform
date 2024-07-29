import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface ResourceObjct {
  resource: 'recipe' | 'list';
}

@Component({
  selector: 'app-upload-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './upload-dialog.component.html',
  styleUrl: './upload-dialog.component.scss',
})
export class UploadDialogComponent implements OnInit {
  resource: 'recipe' | 'list' = 'recipe';
  constructor(private dataService: DataService, private recipeService: RecipeService, private shoppingListService: ShoppingListService, @Inject(MAT_DIALOG_DATA) public data: ResourceObjct) {}

  ngOnInit(): void {
    this.resource = this.data.resource;
  }

  jsonInputUpdate(fileInputEvent: any) {
    // On change, parse the json in the file and update the tasks
    const file = fileInputEvent.target.files[0];
    this.dataService
      .readJsonFile(file)
      .then((parsedData) => {
        // TODO: Move this logic to the data service
        // TODO: Add a check to ensure the data is in the correct format
        // TODO: Add checks to ensure the data is not already in the database
        // TODO: disregard task id so that new tasks do not overwrite existing tasks
        // parsedData.forEach((task: any) => {
        //   task.dueDate = new Date(task.dueDate);
        // });
        // this.taskService.addTasks(parsedData);
        switch (this.resource) {
          case 'recipe':
            console.log('Adding recipes');
            this.recipeService.addRecipes(parsedData);
            break;
          case 'list':
            console.log('Adding items');
            this.shoppingListService.addItems(parsedData);
            break;
        }
      })
      .catch((error) => {
        console.error('Error reading JSON file:', error);
      });
  }

  confirmation(): void {
    console.log('Dialog closed');
  }
}
