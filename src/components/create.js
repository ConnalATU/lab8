import React from "react";
import axios from "axios"; //importing axios

//created new component called create

export class Create extends React.Component {

    constructor(){
        //parent constructor with super
        super();
        // binding event to method
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangedBookTitle = this.onChangedBookTitle.bind(this);
        this.onChangedBookCover = this.onChangedBookCover.bind(this);
        this.onChangedBookAuthor = this.onChangedBookAuthor.bind(this);
        
       
        this.state = {
            title:'',
            cover:'',
            author:''
        }
    }



    // method when submit is clicked 
    handleSubmit(e){
        e.preventDefault();
        console.log(`button clicked 
        ${this.state.title}
        ${this.state.cover}
        ${this.state.author}`);
       
        //storing book info
        const book={
            title:this.state.title,
            cover:this.state.cover,
            author:this.state.author
    
        }
        //using axois for post method
        axios.post("http://localhost:4000/api/books",book)
        .then()
        .catch();
       
       
        this.setState({
            title:'',
            cover:'',
            author:''

            


        })
    
    }

    //method to change book title in state
    onChangedBookTitle(e){
        this.setState({
        title:e.target.value})
    }

    //method to change book cover in state
    onChangedBookCover(e){
        this.setState({
            cover:e.target.value})}

    //method to change author in state
    onChangedBookAuthor(e){
            this.setState({
            author:e.target.value })}   


    


    render() {
        return (
            // submit form with using on click methods to handle data 
            <form onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangedBookTitle}
                    />
                    <label>Add Book Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.cover}
                        onChange={this.onChangedBookCover}
                    />
                    <label>Add Author: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.author}
                        onChange={this.onChangedBookAuthor}
                    />
                </div>

                <input type="submit" value="Add Book" />
            </form>
        );

    }
}
