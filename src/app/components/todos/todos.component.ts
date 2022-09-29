import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  name: any = '';
  editMode: any[] = [];


  constructor(
    private todoService: TodoService
  ) {}


  ngOnInit() {

    this.todoService.getTodos().subscribe(todos => {
      console.log(todos);
      this.todos = todos;

      for (let i = 0; i < todos.length; i++) {
          this.editMode.push(false);
      }
  },
  error => {
      console.log(error);
  });

}
editTodo(i: any) {
  if (this.editMode[i]) {
      const id = this.todos[i]._id;

      const content = {
          'isCompleted': this.todos[i].isCompleted,
          'text': this.todos[i].text
      };

      this.todoService.updateTodo(content, id).subscribe(response => {
          location.reload();
          console.log(response);
      },
          error => {
              console.log(error);
      });
  } else {
      this.editMode[i] = true;
  }
}

checkTodo(i: any) {
  const id = this.todos[i]._id;

  const content = {
      'isCompleted': !this.todos[i].isCompleted,
      'text': this.todos[i].text
  };

  this.todoService.updateTodo(content, id).subscribe(response => {
      location.reload();
      console.log(response);
  },
  error => {
      console.log(error);
  });
}

deleteTodo(i: any) {
  const id = this.todos[i]._id;

  this.todoService.deleteTodo(id)
      .subscribe(
          response => {
              console.log(response);
              location.reload();
          }
      ,
          error => {
              console.log(error);
  });
}

postTodos() {
  if (this.name === '') {
      return;
  } else {
      const content = {
          'isCompleted': false,
          'text': this.name
      };

      this.todoService.postTodos(content).subscribe(response => {
          location.reload();
          console.log(response);
      },
          error => {
              console.log(error);
      });
  }
}



}
