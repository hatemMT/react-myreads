import {BehaviorSubject} from "rxjs";
import {getAll, update} from "./BooksAPI";

class BooksManager {
    static booksSubject = new BehaviorSubject([]);

    static loadBooks() {
        getAll().then(r => this.booksSubject.next(r));
    }

    static updateBook(bookId, newShelf) {
        console.log(`Book ID : ${bookId}, shelf : ${newShelf}`)
        update({id: bookId}, newShelf)
            .then(_ => getAll().then(r => this.booksSubject.next(r)));
    }
}

export default BooksManager;
