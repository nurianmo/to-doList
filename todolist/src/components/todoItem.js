import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component{
    //Calls this function when the user click on Done button
    removeTodo(id){
        //Call the parent function removeTodo
        this.props.removeTodo(id);
    }

    render(){
        return(
            <div className="todoWrapper">
                <button className="btn btn-outline-danger btn-lg" onClick={(event) => this.removeTodo(this.props.id)}>Done </button>
                {this.props.todo.text}
            </div>
        )
    }
}

export default TodoItem;