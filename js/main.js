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
  data.entries[0] = formValues;

  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
}

$form.addEventListener('submit', handleSubmit);
