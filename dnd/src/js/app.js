import TrelloWidget from './ui/widgets/TrelloWidget';
import Trello from './ui/Trello';


const widget = new TrelloWidget();
widget.bindToDOM(document.querySelector('#trello_container'));
widget.init();

const state = JSON.parse(localStorage.getItem('trello'));
let trello;

if (!state) {
  trello = new Trello(widget);

  const todoColumn = trello.addColumn('ToDo');
  const inProgressColumn = trello.addColumn('In progress');
  const doneColumn = trello.addColumn('Done');

  todoColumn.addTask('Welcome to Hrello!');
  todoColumn.addTask('This is a card');
  todoColumn.addTask('Click on a card to see what’s behind it.');
  todoColumn.addTask("You can't attach pictures and files...");
  todoColumn.addTask('... any kind of hyperlink ...');
  todoColumn.addTask('... or checklists.');

  inProgressColumn.addTask('Invite your team to this board using the Add Members button');
  inProgressColumn.addTask("Drag people onto a card to indicate that they're responsible for it.");
  inProgressColumn.addTask('Use color-coded labels for organization');
  inProgressColumn.addTask('Make as many lists as you need!');
  inProgressColumn.addTask('Try dragging cards anywhere.');
  inProgressColumn.addTask('Finished with a card? Archive it.');

  doneColumn.addTask('To learn more tricks, check out the guide.');
  doneColumn.addTask('Use as many boards as you want. Well make more!');
  doneColumn.addTask('Want to use keyboard shortcuts? We have them!');
  doneColumn.addTask('Want updates on new features?');
  doneColumn.addTask('Need help?');
  doneColumn.addTask('Want current tips, usage examples, or API info?');
} else {
  trello = Trello.fromObject(state, widget);
}

trello.init();
