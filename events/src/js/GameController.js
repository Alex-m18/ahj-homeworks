export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.charPosition = 0;
    this.startLifes = 5;
    this.lifes = this.startLifes;
    this.points = 0;
    this.timerID = null;
    this.delay = 1000;
  }

  init() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.drawUi();
    this.newGame();
  }

  newGame() {
    this.lifes = this.startLifes;
    this.points = 0;
    this.moveCharacter();
    this.gamePlay.redrawStat(this.lifes, 'Click on the Goblin to start the game');
  }

  getNewPosition() {
    let newPosition = this.charPosition;
    while (newPosition === this.charPosition) {
      newPosition = Math.round(Math.random() * (this.gamePlay.boardSize ** 2 - 1));
    }
    return newPosition;
  }

  onCellClick(index) {
    if (index === this.charPosition) {
      clearTimeout(this.timerID);
      this.points += 1;
      this.moveCharacter();
      this.startTimeout();
    }
  }

  moveCharacterAfterTimeout() {
    this.lifes -= 1;
    this.moveCharacter();
    if (this.lifes === 0) {
      setTimeout(() => {
        alert(`Game over! Your score is ${this.points} points!`);
        this.newGame();
      }, 0);
      return;
    }
    this.startTimeout();
  }

  moveCharacter() {
    this.charPosition = this.getNewPosition();
    this.gamePlay.redrawPosition(this.charPosition);
    this.gamePlay.redrawStat(this.lifes, this.points);
  }

  startTimeout() {
    this.timerID = setTimeout(this.moveCharacterAfterTimeout.bind(this), this.delay);
  }
}
