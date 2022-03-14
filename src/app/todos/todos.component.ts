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
import { PostTask } from '../Shared/api/modals/taskResponse.model';
import { TodoService } from '../Shared/api/services/todos.service';
import { Todo } from '../Shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos!: PostTask[];
  showValidationErrors!: boolean;
  todoName!: FormControl;
  form!: FormGroup;

  hideContent: boolean = false;
  isLoading: boolean = false;
  isNodata: boolean = false;

  constructor(
    private dataService: TodoService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.todoName = new FormControl('', [Validators.required]);

    this.form = fb.group({
      todoName: this.todoName,
    });
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.isLoading = true;
    this.hideContent = false;
    this.dataService.getTask().subscribe(
      (res) => {
        if (res.isSuccess) {
          console.log(res);

          if (res.result.length <= 0) {
            this.isNodata = true;
          }
          this.todos = res.result;
          this.isLoading = false;
          this.hideContent = true;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onFormSubmit() {
    this.hideContent = false;

    var data = {
      description: this.todoName.value,
      completed: false,
    };
    if (this.todoName.invalid) {
      this.showValidationErrors = true;
    } else {
      this.dataService.addTask(data).subscribe(
        (res) => {
          console.log(res);
          this.getTask();
        },
        (err) => {
          console.error(err);
        }
      );

      this.showValidationErrors = false;
      this.todoName.reset();
    }
  }

  toggleCompleted(todo: PostTask) {
    todo.completed = !todo.completed;
    let todoCopy = {
      description: todo.description,
      completed: todo.completed,
    };
    this.dataService.updateTask(todo._id, todoCopy).subscribe(
      (res) => {
        if (res.isSuccess) {
          this.todos = this.todos.filter((i) => {
            return i._id != todo._id;
          });
          console.log(this.todos);
        }
      },
      (err) => {
        console.error(err);
      }
    );
    console.log(todo);
  }

  editTodo(todo: PostTask) {
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) {
        let todoCopy = {
          description: result.description,
          completed: result.data.completed,
        };
        console.log(todoCopy);

        this.dataService.updateTask(result.data._id, todoCopy).subscribe(
          (res) => {
            if (res.isSuccess) {
              console.log(res.result);
              this.getTask();
            }
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  deleteTodo(todo: PostTask) {
    this.dataService.deleteTask(todo._id).subscribe(
      (res) => {
        if (res.isSuccess) {
          console.log(res.result);
          this.getTask();
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
