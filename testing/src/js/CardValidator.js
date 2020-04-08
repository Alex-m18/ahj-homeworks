import luhn from './luhn';
import cardTypes from './cardTypes';
import getCardTypeByNumber from './getCardTypeByNumber';

export default class CardValidator {
  constructor(widget) {
    this.widget = widget;
  }

  init() {
    this.widget.addOnSubmitListener(this.onSubmit.bind(this));
    this.widget.addOnKeyUpListener(this.onKeyUp.bind(this));

    this.widget.drawUi();
    for (const cardType of Object.values(cardTypes)) {
      this.widget.addCardType(cardType);
    }
  }

  onKeyUp() {
    this.widget.showWaitingMessage();
    this.widget.selectCard(this.getTypedCardType());
  }

  onSubmit(event) {
    event.preventDefault();
    const typedCardType = this.getTypedCardType();
    if (typedCardType
      && luhn(this.widget.inputValue)
      && this.checkDigitCount(typedCardType)) {
      this.widget.showValidMessage();
    } else {
      this.widget.showInvalidMessage();
    }
  }

  checkDigitCount(cardType = this.getTypedCardType()) {
    return cardType.digitCount.includes(this.widget.inputValue.length);
  }

  getTypedCardType() {
    return getCardTypeByNumber(this.widget.inputValue);
  }
}
