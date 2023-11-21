/* global data */

const $image = document.querySelector('#photo');
const $photo = document.querySelector('#image');
const $form = document.querySelector('#journal-form');

$image.addEventListener('input', function (event) {
  const inputImage = event.target.value;

  $photo.setAttribute('src', inputImage);
});

function handleSubmit(event) {
  event.preventDefault();

  const title = $form.elements.title.value;
  const photo = $form.elements.photo.value;
  const notes = $form.elements.notes.value;

  const formValues = {
    title,
    photo,
    notes,
  };

  $ul.prepend(renderEntry('entries'));
  viewSwap($entryView);

  toggleNoEntries();

  if (data.editing === null) {
    renderEntry('entries');
    formValues.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formValues);
    console.log(formValues.entryId);
  } else if (data.editing !== null) {
    data.editing = data.entries.findIndex((entry) => entry.id === data.editing);
    if (data.editing !== -1) {
      formValues.id = data.editing;

      const newDOM = renderEntry(formValues);
      const existingLi = document.querySelector(
        'li[data-entry-id="' + data.editing + '"]'
      );

      if (existingLi) {
        existingLi.replaceWith(newDOM);
        const $updateEntry = document.getElementById('entry-form');
        $updateEntry.innerText = 'New Entry';
      }
    }
  }
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $picDiv = document.createElement('div');
  $picDiv.setAttribute('class', 'column-half');

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.photo);
  $entryImage.setAttribute('alt', 'Entry Image');

  const $chDiv = document.createElement('div');
  $chDiv.setAttribute('class', 'column-half');

  const $entryTitle = document.createElement('p');
  $entryTitle.textContent = entry.title;

  const $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-solid fa-pencil');

  const $entryNote = document.createElement('p');
  $entryNote.textContent = entry.notes;

  $li.appendChild($picDiv);
  $picDiv.appendChild($entryImage);
  $li.appendChild($chDiv);
  $chDiv.appendChild($entryTitle);
  $chDiv.appendChild($entryNote);
  $entryTitle.appendChild($icon);

  return $li;
}

const $ul = document.querySelector('.ul');
// const I = document.querySelector('i');

$ul.addEventListener('click', (event) => {
  const $postedEntry = event.target.closest('li');
  if (event.target.tagName === 'I') {
    // event.target.tagName === I
    const $clickedEntryId = $postedEntry.getAttribute('data-entry-id');

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number($clickedEntryId)) {
        data.editing = data.entries[i];
        showFormAndEditEntry(data.entries[i]);
      }
    }
  }
});

function showFormAndEditEntry(entry) {
  const $editTitle = document.querySelector('#title');
  const $editDescription = document.querySelector('#notes');
  const $editURL = document.querySelector('#image');

  $editTitle.setAttribute('value', entry.title);
  $editDescription.setAttribute('value', entry.notes); // add imageurl & image to populate
  $editURL.setAttribute('src', entry.photo);

  const $editEntry = document.getElementById('entries');
  $editEntry.innerText = 'Edit Entry'; // change title from New Entry to Edit Entry

  viewSwap('entry-form');
}

document.addEventListener('DOMContentLoaded', (event) => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
  viewSwap(data.view);

  toggleNoEntries();
});

const $noEntriesText = document.getElementById('noEntriesText');

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntriesText.classList.remove('hidden');
  } else {
    $noEntriesText.classList.add('hidden');
  }
}

const $entryView = document.querySelector('#entries');
const $formView = document.querySelector('#entry-form');

function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entryView.classList.add('hidden');
    $formView.classList.remove('hidden');
  } else {
    $formView.classList.add('hidden');
    $entryView.classList.remove('hidden');
  }
  data.view = viewName;
}

const $entries = document.getElementById('show-entries-link');
$entries.addEventListener('click', function () {
  viewSwap('entries');
});

const $entryForm = document.getElementById('showEntryFormBtn');
$entryForm.addEventListener('click', function () {
  viewSwap('entry-form');
});
