// library that takes markdown and renders it in HTML
const marked = require('marked');
const { remote } = require('electron');
const mainProcess = remote.require('./main');

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');

// create a reusable function to use elsewhere
const renderMarkdownToHtml = (markdown) => {
    htmlView.innerHTML = marked(markdown, { sanitize: true }); //sanitize the user inputs
};

// when a keyup happens in the markdown view (event listen)
markdownView.addEventListener('keyup', (event) => {
    renderMarkdownToHtml(event.target.value);
});

openFileButton.addEventListener("click", (listener) => {
    // alert("I will open a file soon, yo.");
    mainProcess.getFileFromUserSelection();
});

//listening for messages from the main process to go ahead and DO SOMETHING
