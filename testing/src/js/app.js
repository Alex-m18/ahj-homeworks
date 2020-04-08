import CardValidatorWidget from './CardValidatorWidget';
import CardValidator from './CardValidator';

const cardValidatorWidget = new CardValidatorWidget();
cardValidatorWidget.bindToDOM(document.querySelector('#card_validator_widget_container'));

const cardValidator = new CardValidator(cardValidatorWidget);
cardValidator.init();
