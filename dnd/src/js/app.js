import TrelloWidget from './ui/widgets/TrelloWidget';
import Trello from './ui/Trello';

const widget = new TrelloWidget();
widget.bindToDOM(document.querySelector('#trello_container'));
widget.init();

const trello = new Trello(widget);
trello.init();
