new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    computerHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.computerHealth = 100;
      this.turns = [];
    },
    attack() {
        let damage = this.calcDamage(3, 10);
        this.computerHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: "Player Hits Computer for" + damage,
        });
        if (this.checkWin()) {
          return;
        }
        this.monsterAttacks();
    },
    specialAttack() {
      var damage = this.calcDamage(10, 20);
      this.computerHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player Hits Hard Computer for" + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal() {
      if (this.playerHealth <= 92) {
        this.playerHealth += 8;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player Heals by 10",
      });
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    monsterAttacks() {
      let damage = this.calcDamage(10, 20);
      this.playerHealth -= this.calcDamage(5, 12);
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Computer Hits Player" + damage,
      });
    },
    calcDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.computerHealth <= 0) {
        if (confirm("You won! New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
