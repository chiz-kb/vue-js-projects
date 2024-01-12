function generateRand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      roundCount: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
    canUseSpecialAttack() {
      return this.roundCount % 3 !== 0;
    },
  },
  methods: {
    surender() {
      this.winner = "monster";
    },
    reStart() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.roundCount = 0;
      this.winner = null;
      this.logMessages= [];
    },
    attackMonster() {
      attackValue = generateRand(5, 12);
      this.roundCount++;
      this.monsterHealth -= attackValue;
      this.addLogMessage('player','attack',attackValue)
      this.attackPlayer();
    },
    attackPlayer() {
      attackValue = generateRand(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster','attack',attackValue)
    },
    specialAttack() {
      attackValue = generateRand(10, 25);
      this.roundCount++;
      this.monsterHealth -= attackValue;
      this.addLogMessage('player','attack',attackValue)
      this.attackPlayer();
    },
    healPlayerHealth() {
      this.roundCount++;
      healValue = generateRand(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player','heal',healValue),
      this.attackPlayer();
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
