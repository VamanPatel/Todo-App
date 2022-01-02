import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { Todo } from '../Shared/todo.model';
import { TodosService } from '../Shared/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  showValidationErrors!: boolean;
  todoName!: FormControl;
  form!: FormGroup;

  constructor(
    private dataService: TodosService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.todoName = new FormControl('', [
      Validators.required,
      Validators.maxLength(2),
    ]);

    this.form = fb.group({
      todoName: this.todoName,
    });
  }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit() {
    if (this.todoName.invalid) {
      this.showValidationErrors = true;
    } else {
      this.dataService.addTodo(new Todo(this.todoName.value));

      this.showValidationErrors = false;
      this.todoName.reset();
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result);
      }
    });
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.dataService.deleteTodo(index);
  }
}
