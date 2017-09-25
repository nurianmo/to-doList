import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      todos: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }

  //Call this function before render for getting todos
  componentWillMount(){
    fetch('http://localhost:3001/task')
    .then(results => {
      //Receive data from the server as json, we need to parse
      return results.json(); 
      //Then, we can access to the content
    }).then(data => {
      this.setState({
        todos: data.todos 
      })
    });
  }

  //Add todo to the server
  addTodo(todoText){
    fetch('http://localhost:3001/task/add', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todos:{
          text: todoText,
          done: false
        }
      })
    //We are going to receive a result from the serve
    }).then(results => {
        return results.json();
      }
    ).then(data => {
      //If the server add the todo, we set the state with the new todo
      //(Receive the id(data.idTodo) from the serve)
      if (data.ok) {
          this.setState({
            todos: this.state.todos.concat([{
              id: data.idTodo,
              text: todoText,
              done: false
            }])
          });
      }
    });    
  }

  //Remove todo from the serve
  removeTodo(id){
    fetch('http://localhost:3001/task/del/'+id)
    .then(results => {
        return results.json();
      }
    ).then(data => {
      //If the server has removed the todo, set the state without this todo
      if (data.ok) {
        this.setState({
          //Filter returns the elements of an array that meet the condition specifiend in a callback function
          todos: this.state.todos.filter((todo, index) => todo.id !== id)
        });
      }
    });      
  }

  //Changes done status of todo from the server
  doneTodo(id){
    fetch('http://localhost:3001/task/update/'+id, {  
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //Look for the element done selected
          todo: this.state.todos.find((todo) => {
            if(todo.id === id){
              //Change the value of done
              todo.done = !todo.done;
              return todo;
            }
          })
      })
    //We are going to receive a result from the serve
    }).then(results => {
        return results.json();
      }
    ).then(data => {
      //If the server update the todo, we set the state with the new status of todo
      //(Receive done(data.doneTodo) from the serve)
      if (data.ok) {
        var auxTodos = this.state.todos;
        auxTodos.map((todo) => {
          if(todo.id === id){
            todo.done = data.doneTodo;
          }
        });

        this.setState({
          todos: auxTodos
        });  
      }
    });      
  }

  render() {
    return (
      <div className="App container">
        <div className="todo-wrapper"> 
          <Header />
          <TodoInput todoText="" addTodo={this.addTodo}/>
          <ul>
            {
              this.state.todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo} doneTodo={this.doneTodo}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
