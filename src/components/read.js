import React from "react";
import { Books } from "./books"; //importing component 
import axios from "axios"; //importing axios


export class Read extends React.Component {
    //life cycle hook
    componentDidMount() {
        //axios is a http client that we use to send and recieve http request with a promise 
        axios.get('http://localhost:4000/api/books') //json data url
            .then((response) => {
                this.setState({ books: response.data }) //setting data into state from request
            })
            .catch((error) => {
                console.log(error); //error handling 
            })

    }


    state = {
        //creating array called books
        books: []

    }
    render() {
        return (
            <div>
                <h3>This is the Read Component</h3>
                {/* Displaying Component */}
                <Books books={this.state.books}></Books>
            </div>
        );

    }
}
