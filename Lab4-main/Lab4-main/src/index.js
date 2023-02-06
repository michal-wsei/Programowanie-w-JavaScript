import "./styles.css";

function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

// Z racji, że jest to CodeSandbox,
// to muszę wyczyścić wartość początkową,
// bo są tutaj jakieś błędne defaultowe wartości
localStorage.clear();
displayNotes();

function displayNotes() {
  const notesIds = Object.values({ ...localStorage }).map((note) => {
    const { title, content, color, pinned, date, id } = JSON.parse(note);

    return `<li>Title: ${title}, Content: ${content}, Color: ${color}, <p style="display: inline;${
      pinned === true ? "color: orange" : ""
    }">Pinned: ${pinned}</p>, Date: ${date}</li><button data-id="${id}" class="remove-note">Remove note</button><button data-id="${id}" class="select-to-edit-note">Edit note</button>`;
  });

  document.querySelector("#list").innerHTML = notesIds;
}

function removeNote(e) {
  if (e.target.tagName === "BUTTON" && e.target.className === "remove-note") {
    localStorage.removeItem(e.target.dataset.id);
  }

  displayNotes();
}

function editNote(e) {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.className === "select-to-edit-note"
  ) {
    const { title, content, color, pinned, id } = JSON.parse(
      localStorage.getItem(e.target.dataset.id)
    );

    const editnotecontainer = document.querySelector("#editnote");

    const titleElement = editnotecontainer.querySelector("#title");
    const contentElement = editnotecontainer.querySelector("#content");
    const colorElement = editnotecontainer.querySelector("#color");
    const pinnedElement = editnotecontainer.querySelector("#pinned");
    const noteId = editnotecontainer.querySelector("#note-id");

    titleElement.value = title;
    contentElement.value = content;
    colorElement.value = color;
    pinnedElement.checked = pinned;
    noteId.value = id;
  }
}

window.addEventListener("click", removeNote);

window.addEventListener("click", editNote);

function setEditedNote() {
  const editnotecontainer = document.querySelector("#editnote");
  const title = editnotecontainer.querySelector("#title");
  const content = editnotecontainer.querySelector("#content");
  const color = editnotecontainer.querySelector("#color");
  const pinned = editnotecontainer.querySelector("#pinned");
  const noteId = editnotecontainer.querySelector("#note-id");

  const { date, id } = JSON.parse(localStorage.getItem(noteId.value));

  localStorage.removeItem(id);

  localStorage.setItem(
    id,
    JSON.stringify({
      title: title.value,
      content: content.value,
      color: color.value,
      pinned: pinned.checked,
      date: date,
      id
    })
  );

  displayNotes();

  title.value = "";
  content.value = "";
  color.value = "";
  pinned.checked = undefined;
  noteId.value = "";
}

document.querySelector("#editnotebutton").addEventListener("click", () => {
  setEditedNote();
});

function addNote() {
  const addnote = document.querySelector("#addnote");
  const title = addnote.querySelector("#title");
  const content = addnote.querySelector("#content");
  const color = addnote.querySelector("#color");
  const pinned = addnote.querySelector("#pinned");

  const id = getRandomInt();

  localStorage.setItem(
    id,
    JSON.stringify({
      title: title.value,
      content: content.value,
      color: color.value,
      pinned: pinned.checked,
      date: new Date(),
      id
    })
  );

  displayNotes();

  title.value = "";
  content.value = "";
  color.value = "";
  pinned.checked = undefined;
}

document.querySelector("#addnotebutton").addEventListener("click", () => {
  addNote();
});
