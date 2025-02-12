document
  .querySelector(".dark-light-mode")
  .addEventListener("click", function () {
    let ele = document.querySelector(".circle");
    if (ele.classList.contains("anime1")) {
      ele.classList.remove("anime1");
      ele.classList.add("anime2");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      document.querySelector(".navbar").style.borderColor = "#333";
      document.querySelector(".navbar").style.backgroundColor = "white";
    } else {
      ele.classList.remove("anime2");
      ele.classList.add("anime1");
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "white";
      document.querySelector(".navbar").style.borderColor = "white";
      document.querySelector(".navbar").style.backgroundColor = "black";
    }
  });

let leftContainer = document.querySelector(".categories");

async function getCategoryList() {
  let response = await fetch(
    "https://books-backend.p.goit.global/books/category-list"
  );
  let data = await response.json();
  data.forEach((element) => {
    let li = document.createElement("li");
    li.setAttribute("value", `${element.list_name}`);
    li.innerText = element.list_name;
    leftContainer.appendChild(li);
  });
}
getCategoryList();

function closeFun() {
  let bookDetailsContainer = document.querySelector(".book-details-container");
  bookDetailsContainer.style.display = "none";
}

let bookTypeContainer = document.querySelector(".book-type-container");
function showBookDetails(book) {
  // console.log(book);
  let bookDetailsContainer = document.querySelector(".book-details-container");

  bookDetailsContainer.style.display = "block";
  bookDetailsContainer.innerHTML = "";

  let bookInfoDiv = document.createElement("div");
  bookInfoDiv.classList.add("book-info-container");
  bookInfoDiv.innerHTML = `
        <div class="book-img">
        <img src="${book.book_image}" alt="book-cover">
    </div>
    <div class="book-info">
        <div class="heading">
           <h2>${book.title}</h2>
           <p>Author: ${book.author}</p>
        </div>
        <p>${book.list_name}</p>
        <div class="buy-links">
            <a href="${book.buy_links[0].url}" target="_blank">
               <img src="./assets/amazon-2x.png" alt="amazone">
            </a>
            <a href="${book.buy_links[1].url}" target="_blank">
               <img src="./assets/book-shop-2x.png" alt="shop-icon">
            </a>
            <a href="${book.buy_links[2].url}" target="_blank">
               <img src="./assets/apple-books-2x.png" alt="shop-icon">
            </a>
        </div>
        <div class="btns">
            <button class="addTocart-btn" onclick="addTocCart()">Add to Cart</button>
            <button class="closebtn" onclick="closeFun()">Close</button>
        </div>
    </div>
    `;

  bookDetailsContainer.appendChild(bookInfoDiv);
}

async function getBooks() {
  let response = await fetch(
    `https://books-backend.p.goit.global/books/top-books`
  );
  let data = await response.json();
  bookTypeContainer.innerHTML = "";
  data.forEach((ele) => {
    let bookContainer = document.createElement("div");
    bookContainer.className = "book-container";
    let categoryName = document.createElement("h2");
    categoryName.className = "category-name";
    categoryName.innerText = ele.list_name;
    bookTypeContainer.appendChild(categoryName);
    // bookTypeContainer.appendChild(bookContainer);

    ele.books.forEach((book) => {
      let bookDiv = document.createElement("div");
      bookDiv.className = "book-div";
      let bookImg = document.createElement("img");
      bookImg.src = book.book_image;
      let bookTitle = document.createElement("h3");
      bookTitle.innerText = book.title;
      let bookAuthor = document.createElement("p");
      bookAuthor.innerText = book.author;
      bookDiv.appendChild(bookImg);
      bookDiv.appendChild(bookTitle);
      bookDiv.appendChild(bookAuthor);
      bookContainer.appendChild(bookDiv);

      bookDiv.addEventListener("click", function () {
        // console.log(book);
        showBookDetails(book);
      });
    });
    let div = document.createElement("div");
    div.className = "load-more";
    let button = document.createElement("button");
    button.innerText = "Show More";
    div.appendChild(button);

    bookTypeContainer.appendChild(bookContainer);
    bookTypeContainer.appendChild(div);
  });
}

getBooks();

// get Books by categorys
async function getBooksByCategory(category) {
  let response = await fetch(
    `https://books-backend.p.goit.global/books/top-books`
  );
  let data = await response.json();
  console.log(data);
  bookTypeContainer.innerHTML = "";
  let bookContainer = document.createElement("div");
  data.forEach((booksCategoryName) => {
    if (booksCategoryName.list_name === category) {
      booksCategoryName.books.forEach((book) => {
        let bookDiv = document.createElement("div");
        bookDiv.className = "book-div";
        let bookImg = document.createElement("img");
        bookImg.src = book.book_image;
        let bookTitle = document.createElement("h3");
        bookTitle.innerText = book.title;
        let bookAuthor = document.createElement("p");
        bookAuthor.innerText = book.author;
        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookContainer.appendChild(bookDiv);

        bookDiv.addEventListener("click", function () {
          // console.log(book);
          showBookDetails(book);
        });
      });
      bookTypeContainer.appendChild(bookContainer);
    }
  });
}

leftContainer.addEventListener("click", function (event) {
  let checked = event.target.getAttribute("value");
  if (checked === "All categories") {
    getBooks();
    console.log("you clicked all categories");
  } else {
    console.log("you clicked other categories");
    getBooksByCategory(checked);
  }
});
