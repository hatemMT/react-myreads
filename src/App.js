import React from 'react'
import './App.css'
import BooksShelf from "./BooksShelf";
import BooksManager from "./BooksManager";
import {BrowserRouter, Link, Route} from "react-router-dom";
import SearchPage from "./SearchPage";

class BooksApp extends React.Component {
    componentDidMount() {
        BooksManager.loadBooks();
    }

    render() {
        return (<BrowserRouter>
            <div className='app'>
                <Route exact path="/" component={BooksLibrary}/>
                <Route path="/search" component={SearchPage}/>
            </div>
        </BrowserRouter>);
    }
}

function BooksLibrary() {
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BooksShelf key={'wantToRead'} name='wantToRead' title="Want To Read"/>
                <BooksShelf key={'currentlyReading'} name='currentlyReading' title={'Currently Reading'}/>
                <BooksShelf key={'read'} name='read' title={'Read'}/>
            </div>
        </div>
        <Link to={'search'}>
            <div className="open-search">
                <button></button>
            </div>
        </Link>
    </div>);
}

export default BooksApp
