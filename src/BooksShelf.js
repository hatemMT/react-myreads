import React, {Component} from 'react'
import Book from "./Book";
import BooksManager from "./BooksManager";
import {map} from "rxjs";

class BooksShelf extends Component {

    booksSubscription = null;

    componentDidMount() {
        this.booksSubscription = BooksManager
            .booksSubject
            .pipe(map(v => {
                let filtered = v.filter(i => i.shelf === this.props.name);
                return filtered;
            }))
            .subscribe((r) => {
                this.setState({books: r});
            });
    }

    render() {
        if (!this.state) return (<h1>Loading...</h1>);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.getBooks(this.state)
                                .map(book => {
                                    return (
                                        <li key={`li-${book.id}`}>
                                            <Book id={book.id} title={book.title}
                                                  author={book.authors}
                                                  coverUrl={book.imageLinks && book.imageLinks.thumbnail}
                                                  shelf={this.props.name}/>
                                        </li>
                                    )
                                })
                        }
                    </ol>
                </div>
            </div>
        );
    }

    getBooks(state) {
        return Object.keys(state.books)
            .map(k => state.books[k]);
    }


    componentWillUnmount() {
        this.booksSubscription.unsubscribe();
    }
}

export default BooksShelf
