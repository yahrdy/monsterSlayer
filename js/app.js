new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    computed: {},
    methods: {
        startNewGame: function (event) {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function (event) {
            this.playerAttacks();
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.checkWin();
        },
        specialAttack: function (event) {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }

            damage = this.calculateDamage(2, 15);
            this.playerHealth -= damage;
            this.checkWin();
        },
        heal: function (event) {
            if (this.playerHealth <= 90)
                this.playerHealth += 10;
            else
                this.playerHealth = 100;
            this.monsterAttacks();
            this.checkWin();
        },
        giveUp: function (event) {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max), min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! Start new game?')) {
                    this.startNewGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }

            if (this.playerHealth <= 0) {
                if (confirm('You lost! Start new game?')) {
                    this.startNewGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
        },
        playerAttacks: function () {
            this.monsterHealth -= this.calculateDamage(5, 12);
        },
        monsterAttacks: function () {
            this.playerHealth -= this.calculateDamage(2, 15);
        }
    },
})