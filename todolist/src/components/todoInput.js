import React, { Component } from 'react';
import './todoInput.css';

class TodoInput extends Component{
    constructor(props){
        super(props);

        this.state = {
           value: this.props.todoText
        };

        this.updateValue = this.updateValue.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    //When event onChange happens this function is called
    updateValue(event){
        this.setState({value: event.target.value})
    }

    //When event onClick happens this function is called
    addTodo(todo){
        //Ensure the todo text is not empty
        if(todo.length > 0){
            //Call addTodo from props (App.js)
            this.props.addTodo(todo);
            //Reset the state
            this.setState({value: ""});
        }
    }

    //When event onKeyPress happens this function is called
    handleKeyPress (event){
        if(event.key === 'Enter'){
            this.addTodo(this.state.value);
          }
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <input type="text" value={this.state.value} onChange={this.updateValue} onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="col-lg-12">
                    <button className="btn btn-outline-primary btn-lg" onClick={() => this.addTodo(this.state.value)}>Submit </button>
                </div>
            </div>
        );
    }
}

export default TodoInput;