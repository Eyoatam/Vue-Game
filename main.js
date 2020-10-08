function getRandomAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      computerHealth: 100,
      gameRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  computed: {
    computerProgressStyle() {
      if (this.computerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.computerHealth + "%" };
      }
    },
    playerProgressStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    checkSpecial() {
      return this.gameRound % 3 !== 0;
    },
    checkHeal() {
      return this.gameRound % 2;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.computerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "computer";
      }
    },
    computerHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.computerHealth = 100;
      this.gameRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    playerAttack() {
      const value = getRandomAttackValue(5, 14);
      this.computerHealth -= value;
      this.addBattleLog("player", "attack", value);
      this.computerAttack();
      this.gameRound++;
    },
    computerAttack() {
      const value = getRandomAttackValue(6, 17);
      this.playerHealth -= value;
      this.addBattleLog("computer", "attack", value);
    },
    specialAttack() {
      const value = getRandomAttackValue(10, 26);
      this.computerHealth -= value;
      this.addBattleLog("player", "attack", value);
      this.computerAttack();
      this.gameRound++;
    },
    heal() {
      this.gameRound++;
      const value = getRandomAttackValue(8, 18);
      this.playerHealth += value;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.addBattleLog("player", "heal", value);
      this.computerAttack();
    },
    surrender() {
      this.playerHealth = 0;
    },
    addBattleLog(player, condition, value) {
      this.battleLog.unshift({
        by: player,
        type: condition,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
