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

  $ul.prepend(renderEntry('$newEntry'));
  viewSwap($entryView);

  toggleNoEntries();
}

$form.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $picDiv = document.createElement('div');
  $picDiv.setAttribute('class', 'column-half');

  const $entryImage = document.createElement('img', 'alt');
  $entryImage.setAttribute('src', entry.photo);

  const $chDiv = document.createElement('div');
  $chDiv.setAttribute('class', 'column-half');

  const $entryTitle = document.createElement('p');
  $entryTitle.textContent = entry.title;

  const $entryNote = document.createElement('p');
  $entryNote.textContent = entry.notes;

  $li.appendChild($picDiv);
  $picDiv.appendChild($entryImage);
  $li.appendChild($chDiv);
  $chDiv.appendChild($entryTitle);
  $chDiv.appendChild($entryNote);

  return $li;
}

const $ul = document.querySelector('.ul');

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
