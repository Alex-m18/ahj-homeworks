import ListEditorWidget from './ListEditorWidget';
import ListEditor from './ListEditor';
import NewProductForm from './NewProductForm';

const newProductForm = new NewProductForm(document.querySelector('body'));
newProductForm.init();

const listWidget = new ListEditorWidget();
listWidget.bindToDOM(document.querySelector('#list_editor_container'));
listWidget.init();

const listEditor = new ListEditor(listWidget, newProductForm);

listEditor.init();
