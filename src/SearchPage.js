import React from "react";
import {Link} from "react-router-dom";
import * as debounce from "lodash.debounce"
import {getAll, search} from "./BooksAPI";
import Book from "./Book";

class SearchPage extends React.Component {

    constructor(props, context, state) {
        super(props, context);
        this.state = {
            loading: false,
            lastSearch: '',
            searchText: '',
            searchResult: []
        };

        this.doSearch = this.doSearch.bind(this);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
    }


    doSearch() {
        if (this.state.lastSearch !== this.state.searchText) {
            this.setState({lastSearch: this.state.searchText});
            search(this.state.searchText)
                .then(r => {
                    if (r && r.length > 0) {
                        getAll()
                            .then(allOnShelfs => {
                                allOnShelfs.forEach(bookOnShelf => {
                                    let found = r.filter(b => b.id === bookOnShelf.id);
                                    if (found.length === 1) {
                                        found[0].shelf = bookOnShelf.shelf;
                                    }
                                })
                                this.setState({searchResult: r, loading: false});
                            }, _ => this.setState({searchResult: [], loading: false}))
                    } else {
                        this.setState({searchResult: [], loading: false});
                    }
                }, _ => this.setState({searchResult: [], loading: false}));
        }
    }

    onSearchTextChange(e) {
        let text = e.target.value;
        this.setState({loading: true, searchText: text})
        debounce(this.doSearch, 1000).bind(this)();
    };

    render() {


        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to={'/'}>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={this.state.searchText}
                           onChange={this.onSearchTextChange}/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        (
                            this.state.searchResult
                            && this.state.searchResult.length > 0
                            && this.state.searchResult.map(book => (
                                <Book key={book.id} id={book.id} title={book.title}
                                      author={book.authors}
                                      coverUrl={book.imageLinks && book.imageLinks.thumbnail}
                                      shelf={book.shelf}/>
                            ))
                        )
                        || (this.state.searchText && this.state.loading && <h1>Searching...</h1>)
                        || this.state.searchText && (this.state.searchResult.length === 0) && (
                            <h2>There no books found for your criteria</h2>)
                        || (this.state.searchResult.length === 0) && (<h1>Type something to search for</h1>)
                    }
                </ol>
            </div>
        </div>);
    }
}

export default SearchPage
