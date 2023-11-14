/* global data */

const $image = document.querySelector('#photo');
const $form = document.querySelector('#entry-form');

$image.addEventListener('input', function (event) {
  const inputImage = event.target.value;

  inputImage.setAttribute('src', inputImage);
});

$form.addEventListener('submit', function (event) {
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

  $image.reset();
  $form.reset();
});
