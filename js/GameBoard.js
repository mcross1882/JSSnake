
(function(w) {

    var GameBoard = function() {
        this.settings = {
            easy: {
                refreshInterval: 500,
                numberOfLives:   5,
                fruitScore:      5,
                defaultLength:   10,
                growLength:      2
            },
            medium: {
                refreshInterval: 250,
                numberOfLives:   3,
                fruitScore:      10,
                defaultLength:   10,
                growLength:      3
            },
            hard: {
                refreshInterval: 100,
                numberOfLives:   3,
                fruitScore:      8,
                defaultLength:   10,
                growLength:      4
            }
        };
        
        //Default to medium difficulty
        this.settingsMode = 'medium';
        this.currentScore = 0;
    }
    
    GameBoard.prototype.getSetting = function(key) {
        if (!this.settings[this.settingsMode][key]) {
            throw 'GameBoard: Failed to get setting. No setting is available for the given key.';
        }
        return this.settings[this.settingsMode][key];
    }
    
    GameBoard.prototype.setMode = function(mode) {
        if (mode != 'easy' && mode != 'medium' && mode != 'hard') {
            throw 'GameBoard: Settings mode must be "easy", "medium" or "hard"';
        }
        this.settingsMode = mode;
    }
    
    GameBoard.prototype.setScore = function(score) {
        this.currentScore = score;
        document.getElementById('score-value').innerHTML = score;
    }
    
    GameBoard.prototype.getScore = function() {
        return this.currentScore;
    }
    
    GameBoard.prototype.setLives = function(lives) {
        this.currentLives = lives;
        document.getElementById('lives-value').innerHTML = lives;
    }
    
    GameBoard.prototype.getLives = function() {
        return this.currentLives;
    }
    
    w.GameBoard = new GameBoard();
    
})(window);
