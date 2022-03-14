import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostTask } from '../Shared/api/modals/taskResponse.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
})
export class EditTodoDialogComponent implements OnInit {
  form!: FormGroup;
  todoTextField!: FormControl;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: PostTask
  ) {
    this.todoTextField = new FormControl(this.todo.description, [
      Validators.required,
      Validators.minLength(2),
    ]);

    this.form = this.fb.group({
      todoTextField: this.todoTextField,
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close({ confirm: false });
  }

  onFormSubmit() {
    if (this.form.invalid) return;

    const updatedTodo: any = {
      confirm: true,
      data: this.todo,
      description: this.todoTextField.value,
    };

    this.dialogRef.close(updatedTodo);
  }
}
