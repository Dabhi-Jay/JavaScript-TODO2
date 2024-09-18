show();

let addNoteButton = document.getElementById("addNoteButton");

addNoteButton.addEventListener("click", function () {
  let noteTitle = document.getElementById("noteTitle");
  let noteDesc = document.getElementById("noteDesc");
  let notes = localStorage.getItem("notes");
  let noteArray;

  if (notes == null) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(notes);
  }

  let n = [];
  n.push(noteTitle.value);
  n.push(noteDesc.value);
  noteArray.push(n);
  localStorage.setItem("notes", JSON.stringify(noteArray));

  show();
});

function show() {
  let notes = localStorage.getItem("notes");
  let noteArray;
  let showNotes = document.getElementsByClassName("cards")[0];
  let html = "";

  if (notes == null) {
    html = `<strong>Nothing to show. Please add notes.</strong>`;
    showNotes.innerHTML = html;
    return;
  } else {
    noteArray = JSON.parse(notes);
  }

  for (let idx = 0; idx < noteArray.length; idx++) {
    html += `<div class="card my-2" id="${idx}" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${noteArray[idx][0]}</h5>
                  <p class="card-text">${noteArray[idx][1]}</p>
                  <button type="button" class="btn btn-dark" onclick="deleteNote(${idx})">Delete</button>
                </div>
            </div>`;
  }

  showNotes.innerHTML = html;

  // Clear inputs after adding note
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDesc").value = "";
}

function deleteNote(id) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    return;
  } else {
    let noteArray = JSON.parse(notes);
    noteArray.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(noteArray));

    if (noteArray.length == 0) {
      localStorage.removeItem("notes");
    }

    show();
  }
}

let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
  let notes = localStorage.getItem("notes");

  // Check if notes exist before proceeding
  if (notes === null) {
    console.log("No notes found to search");
    return;
  }

  let noteArray = JSON.parse(notes);
  let key = document.getElementById("key").value.toLowerCase(); // Convert to lowercase for case-insensitive search

  for (let i = 0; i < noteArray.length; i++) {
    let noteElement = document.getElementById(i.toString());

    if (noteArray[i][1].toLowerCase().includes(key)) {
      noteElement.style.display = "block"; // Show if it matches the search key
    } else {
      noteElement.style.display = "none"; // Hide if it doesn't match
    }
  }

  // Show all notes if the search key is empty
  if (key.trim() === "") {
    for (let i = 0; i < noteArray.length; i++) {
      document.getElementById(i.toString()).style.display = "block";
    }
  }
});
