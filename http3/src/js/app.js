import DropWidget from './DropWidget';
import DropApp from './DropApp';
import NetApi from './NetApi';

const dropWidget = new DropWidget();
dropWidget.bindToDOM(document.querySelector('.drop_widget_container'));
dropWidget.init();

const server = new NetApi('https://alex-m18-ahj-http3.herokuapp.com');

const dropApp = new DropApp(server, dropWidget);
dropApp.init();
