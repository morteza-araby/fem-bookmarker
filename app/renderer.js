// const os = require('os');
// const fs = require('fs');

// const files = fs.readdirSync(os.homedir());

// console.log('## Files : ', files);

// files.forEach(name => {
//   const file = document.createElement('li');
//   file.textContent = name;
//   document.body.appendChild(file);
// });
const {shell, remote} = require('electron');
const systemPreferences = remote.systemPreferences;

const newLinkUrl = document.querySelector('#new-link-url');
const newLinkSubmit = document.querySelector('.new-link-form--submit');
const newLinkForm = document.querySelector('.new-link-form');
const LinkTemplate = document.querySelector('#link-template');
const linksSection = document.querySelector('.links');

linksSection.addEventListener('click', (event)=> {
  if(event.target.href){
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
});

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});
newLinkForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const url = newLinkUrl.value;
  //console.log(url);
  fetch(url)
  .then(response => response.text())
  // .then(response => console.log(response))
  .then(parseResponse)
  .then(findTitle)
  .then(title => ({title, url}))
  .then(addToPage)
  .then(title => console.log(title))
  .catch(error => console.log(error));
});
const parser = new DOMParser();
const parseResponse = (text) => parser.parseFromString(text, 'text/html');
const findTitle = (nodes) => nodes.querySelector('title').textContent;

const addToPage = (({title, url}) => {
  const newLink = LinkTemplate.content.cloneNode(true);
  const titleElement = newLink.querySelector('.link--title');
  const urlElement = newLink.querySelector('.link--url');

  titleElement.textContent = title;
  urlElement.href = url;
  urlElement.textContent = url;

  linksSection.appendChild(newLink);
  return {title, url};
});

window.addEventListener('load', () => {
  if(systemPreferences.isDarkMode()){
    document.querySelector('link').href = 'styles-dark.css';
  }
});