document.addEventListener("DOMContentLoaded", function () {
    constbookContainer = document.querySelector("#book-container");
    constbookURL = `http://localhost:3000/books`;
    constbookForm = document.querySelector("#book-form");
    letallBooks = [];
  
    fetch(`${bookURL}`)
      .then((response) =>response.json())
      .then((bookData) =>
        bookData.forEach(function (book) {
          allBooks = bookData;
          bookContainer.innerHTML += `
            <div id=book-${book.id}>
              <h2>${book.title}</h2>
              <h4>Author: ${book.author}</h4>
              <img src="${book.coverImage}" width="333" height="500">
              <p>${book.description}</p>
              <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
              <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
            </div>
            <div id=edit-book-${book.id}>
            </div>`;
        })
      ); // end of book fetch
  
    bookForm.addEventListener("submit", (e) => {
      event.preventDefault();
  
      consttitleInput = bookForm.querySelector("#title").value;
      constauthorInput = bookForm.querySelector("#author").value;
      constcoverImageInput = bookForm.querySelector("#coverImage").value;
      constdescInput = bookForm.querySelector("#description").value;
  
      fetch(`${bookURL}`, {
        method:"POST",
        body:JSON.stringify({
          title:titleInput,
          author:authorInput,
          coverImage:coverImageInput,
          description:descInput,
        }),
        headers: {
          "Content-Type":"application/json",
        },
      })
        .then((response) =>response.json())
        .then((book) => {
          allBooks.push(book);
          bookContainer.innerHTML += `
              <div id=book-${book.id}>
                <h2>${book.title}</h2>
                <h4>Author: ${book.author}</h4>
                <img src="${book.coverImage}" width="333" height="500">
                <p>${book.description}</p>
                <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
                <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
              </div>
              <div id=edit-book-${book.id}>
              </div>`;
        });
    }); // end of eventListener for adding a book
  
    bookContainer.addEventListener("click", (e) => {
      if (e.target.dataset.action === "edit") {
        consteditButton = document.querySelector(`#edit-${e.target.dataset.id}`);
        editButton.disabled = true;
  
        constbookData = allBooks.find((book) => {
          returnbook.id == e.target.dataset.id;
        });
  
        consteditForm = bookContainer.querySelector(
          `#edit-book-${e.target.dataset.id}`
        );
        editForm.innerHTML = `
              <form class='form' id='edit-book' action='index.html' method='post'>
                <form id="book-form">
                  <input required id="edit-title" placeholder="${bookData.title}">
                  <input required id="edit-author" placeholder="${bookData.author}">
                  <input required id="edit-coverImage" placeholder="${bookData.coverImage}">
                  <input required id="edit-description" placeholder="${bookData.description}">
                  <input type="submit" value="Edit Book">
              </form>`;
  
        editForm.addEventListener("submit", (e) => {
          event.preventDefault();
  
          consttitleInput = document.querySelector("#edit-title").value;
          constauthorInput = document.querySelector("#edit-author").value;
          constcoverImageInput =
            document.querySelector("#edit-coverImage").value;
          constdescInput = document.querySelector("#edit-description").value;
          consteditedBook = document.querySelector(`#book-${bookData.id}`);
  
          fetch(`${bookURL}/${bookData.id}`, {
            method:"PATCH",
            body:JSON.stringify({
              title:titleInput,
              author:authorInput,
              coverImage:coverImageInput,
              description:descInput,
            }),
            headers: {
              "Content-Type":"application/json",
            },
          })
            .then((response) =>response.json())
            .then((book) => {
              editedBook.innerHTML = `
                  <div id=book-${book.id}>
                    <h2>${book.title}</h2>
                    <h4>Author: ${book.author}</h4>
                    <img src="${book.coverImage}" width="333" height="500">
                    <p>${book.description}</p>
                    <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
                    <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
                  </div>
                  <div id=edit-book-${book.id}>
                  </div>`;
              editForm.innerHTML = "";
            });
        }); // end of this event Listener for edit submit
      } elseif (e.target.dataset.action === "delete"); {
        document.querySelector(`#book-${e.target.dataset.id}`).remove();
        fetch(`${bookURL}/${e.target.dataset.id}`, {
          method:"DELETE",
          headers: {
            "Content-Type":"application/json",
          },
        }).then((response) =>response.json());
      }
    }); // end of eventListener for editing and deleting a book
  });
  
  
  