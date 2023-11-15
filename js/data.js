/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', (event) => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
});

const previousDataJSON = localStorage.getItem('code-journal');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
