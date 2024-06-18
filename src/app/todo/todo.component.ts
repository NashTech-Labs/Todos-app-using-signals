import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  //Creating a signal
  state = signal<string[]>([]);
  todoForm =new FormGroup({
    addTodo: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  editable: string = '';
  editTodoForm=new FormGroup({
    edittodo: new FormControl('', [Validators.required, Validators.minLength(3)])
  })


  addTodo(){
    if(this.todoForm.controls['addTodo'].value){
      const newTodoItem = this.todoForm.controls['addTodo'].value 
      //Update the signal value based on curret value
      this.state.update((item) => [
        ...item,
        newTodoItem
      ])
    }
    this.todoForm.reset()
  }

  deleteTodo(item: string){
    const newTodoList = this.state().filter(stateItem => stateItem !== item);
    //Replacing signal value with a new value
    this.state.set(newTodoList);
  }

  editTodo(item:string){
    this.editable = item;
    this.editTodoForm.controls['edittodo'].setValue(item)
  }

  updateTodo(previousTodo :string){
    const newTodoItem = this.editTodoForm.controls['edittodo'].value || ''
    this.state.update(items => items.map(item => item === previousTodo ? newTodoItem : item))
  }
}
