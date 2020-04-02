import { addTimeout } from './utils';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.charPosition = 0;
  }

  init() {
    // this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    this.gamePlay.drawUi();

    this.runGame();
  }

  runGame() {
    const moveCharWithTimeout = addTimeout(this.moveCharacter.bind(this), 0.5, 1);
    moveCharWithTimeout();
  }

  moveCharacter() {
    this.charPosition = this.getNewPosition();
    this.gamePlay.redrawPosition(this.charPosition);
  }

  getNewPosition() {
    let newPosition = this.charPosition;
    while (newPosition === this.charPosition) {
      newPosition = Math.round(Math.random() * (this.gamePlay.boardSize ** 2 - 1));
    }
    return newPosition;
  }

  // onCellClick(index) { }
}
