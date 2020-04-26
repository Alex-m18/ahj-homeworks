import NicknameForm from './NicknameForm';
import OnlineChatWidget from './OnlineChatWidget';

const url = 'alex-m18-ahj-sse-chat.herokuapp.com';

const form = new NicknameForm();
form.bindToDOM(document.body);
form.init();

const chat = new OnlineChatWidget(url, form);
chat.bindToDOM(document.querySelector('#online_chat_widget_container'));
chat.init();
