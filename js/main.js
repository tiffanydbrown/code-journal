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

  formValues.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formValues);

  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $picDiv = document.createElement('div');
  $picDiv.setAttribute('class', 'column-half');

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', data.entries.photo);

  const $chDiv = document.createElement('div');
  $chDiv.setAttribute('class', 'column-half');

  const $entryTitle = document.createElement('p');
  $entryTitle.setAttribute('class', data.entries.title);

  const $entryNote = document.createElement('p');
  $entryNote.setAttribute('class', data.entries.note);

  $li.appendChild($picDiv);
  $picDiv.appendChild($entryImage);
  $chDiv.appendChild($entryTitle);
  $chDiv.appendChild($entryNote);

  return $picDiv;
}

const $ul = document.querySelector('.ul');

document.addEventListener('DOMContentLoaded', (event) => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
});

function toggleNoEntries() {
  const noEntriesText = document.getElementById('noEntriesText');

  noEntriesText.classList.toggle('hidden');
}

document
  .getElementById('toggleButton')
  .addEventListener('click', toggleNoEntries);
