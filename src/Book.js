import React, {Component} from 'react'
import BooksManager from "./BooksManager";

class Book extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            shelf: props.shelf || 'none'
        };
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    {this.props.coverUrl && (<div className="book-cover"
                                                  style={{
                                                      width: 128,
                                                      height: 193,
                                                      backgroundImage: `url(${this.props.coverUrl})`
                                                  }}></div>)}
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf}
                                onChange={(e) => this.onShelfChange(this.props.id, this.state.shelf, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
            </div>
        );
    }

    onShelfChange(bookId, oldShelf, newShelf) {
        if (oldShelf !== newShelf) {
            this.setState({shelf: newShelf});
            BooksManager.updateBook(bookId, newShelf);
        }
    }

}

export default Book;
