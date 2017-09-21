import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      todos: [
          {
            id: 0,
            text: "Learn React"
          },
          {
            id: 1,
            text: "Learn Express"     
          }
      ],
      nextId: 2
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentWillMount(){
    fetch('http://localhost:3001/task')
    .then(results => {
      return results.json(); // Transform the data into json
    }).then(data => this.setState({todos: data.todos, nextId: data.nextId }));
  }

  addTodo(todoText){
    let todosAux = this.state.todos.slice();
    todosAux.push({id: this.state.nextId, text: todoText});
    //Add todo to the server
    fetch('http://localhost:3001/task/add', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todos:{
          id: this.state.nextId,
          text: todoText
        }
      })
    });
    //Update state
    this.setState({
      todos: todosAux,
      nextId: ++this.state.nextId
    });  
  }

  removeTodo(id){
    //Delete todo in the server
    fetch('http://localhost:3001/task/del/'+id).then(
      (results) => {
        return results.json();
      }
    ).then((data) => {
      if (data.ok) {
        this.setState({
          //Filter returns the elements of an array that meet the condition specifiend in a callback function
          todos: this.state.todos.filter((todo, index) => todo.id !== id)
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
                return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
