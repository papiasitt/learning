let book_list = [ { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084" },
{ id: 2, title: "1984", author: "George Orwell", isbn: "9780451524935" },
{ id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565" },
{ id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488" },
{ id: 5, title: "Pride and Prejudice", author: "Jane Austen", isbn: "9781503290563" },
{ id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227" },
{ id: 7, title: "Moby Dick", author: "Herman Melville", isbn: "9781503280786" }]

const getBooks = (req, res) => {
    try {
        const { id, title, author, isbn } = req.body; // Destructure query params
        let filteredBooks = book_list;

        // Apply filters based on query parameters
        if (id) {
            filteredBooks = filteredBooks.filter(book => book.id === parseInt(id));
        }
            // if (id) {
    //     filteredBooks = filteredBooks.filter(function(book) {
    //     return book.id === parseInt(id);
    //     });
    // }                
    //-----or------------
    // if (id) {
    //     const matchingBooks = [];
    //     for (let i = 0; i < filteredBooks.length; i++) {
    //         if (filteredBooks[i].id === parseInt(id)) {
    //             matchingBooks.push(filteredBooks[i]);
    //         }
    //     }
    //     filteredBooks = matchingBooks;
    // }
//'request param' how to use

        if (title) {
            filteredBooks = filteredBooks.filter(book =>
                book.title.toLowerCase().includes(title.toLowerCase())
            );
        }
        if (author) {
            filteredBooks = filteredBooks.filter(book =>
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        if (isbn) {
            filteredBooks = filteredBooks.filter(book =>
                book.isbn.toLowerCase().includes(isbn.toLowerCase())
            );
        }

        // Check if any books match the query
        if (filteredBooks.length === 0) {
            return res.status(404).json({ error: "No books found matching your query" });
        }
        console.log("filteredBooks ::" + JSON.stringify(filteredBooks));
        // Return filtered books or all books if no filters applied
        res.status(200).json(filteredBooks);

    } catch (error) {
        // Handle unexpected errors
        console.error("Error occurred in getBooks:", error.message);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
};

const saveBooks = (req,res) => {
    const {id, title, author, isbn} = req.body;
    console.log(req.body)

    newBook = {id,title,author,isbn}

    for( var i=0 ; i< book_list.length; i++){
        if(book_list[i].id === id && book_list[i].isbn === isbn){
            return res.status(400).json({error: "Book is already present in the library."})
        }
    }
    //&& !title && !author && !isbn
    if(id != "" && isbn != ""){
        book_list.push(newBook);
        console.log(newBook)
        console.log("************")
        console.log(book_list)
        
    }else{
        return res.status(409).json({error:"Conflicts : Please provide all required fields (id, title, author, isbn) to entry a new book in library list."});
    }
   
    res.status(200).json({message : "Book successfully added i library list.", book_list});
}

const deleteBooks = (req,res) => {

    const id = parseInt(req.params.id);
    console.log("id "+ id);

    var is_book_found = false; 

    for(let i = 0; i< book_list.length; i++){
        if(book_list[i].id === id){
            book_list.splice(i,1)
            console.log("book deleted successfully : " + id);
            is_book_found = true;
            break;

        }
    }

    if(is_book_found === false){
        return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({book_list});
        
} 

module.exports = {
    getBooks,
    saveBooks,
    deleteBooks
}