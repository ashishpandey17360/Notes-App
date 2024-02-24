showNotes();
//If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  
  showNotes();
});

// Function to show elements from localStorage

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="card cardNote my-2 mx-2" style="width: 18rem;">

      <div class="card-body">
        <h5 class="card-title">${index + 1}</h5>
        <p class="card-text">${element}</p>

        <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// function to delete notes

function deleteNotes(index) {
  
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// search functionality

let search = document.getElementById("search");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
 
  let noteCard = document.getElementsByClassName("cardNote");
  Array.from(noteCard).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
