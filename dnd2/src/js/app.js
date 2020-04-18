import DropWidget from './DropWidget';
import DropApp from './DropApp';
// import Preview from './Preview';

const dropWidget = new DropWidget();
dropWidget.bindToDOM(document.querySelector('.drop_widget_container'));
dropWidget.init();

const dropApp = new DropApp(dropWidget);

// dropApp.previews.push(new Preview(''));
// dropApp.previews.push(new Preview(''));

dropApp.init();
