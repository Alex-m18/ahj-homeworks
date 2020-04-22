import NetApi from './NetApi';
import HelpDeskWidget from './HelpDeskWidget';
import HelpDesk from './HelpDesk';
import TicketForm from './TicketForm';
import ConfirmForm from './ConfirmForm';


const api = new NetApi('https://alex-m18-ahj-http.herokuapp.com');

const ticketForm = new TicketForm();
ticketForm.bindToDOM(document.querySelector('body'));
ticketForm.init();

const confirmForm = new ConfirmForm();
confirmForm.bindToDOM(document.querySelector('body'));
confirmForm.init();

const helpDeskWidget = new HelpDeskWidget();
helpDeskWidget.bindToDOM(document.querySelector('#help_desk_container'));
helpDeskWidget.init();

const helpDesk = new HelpDesk(api, helpDeskWidget, ticketForm, confirmForm);

helpDesk.init();
