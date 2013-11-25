
window.GameBoard = window.GameBoard || {};

(function (g) {

    var globalContext = null;
    var globalCanvas = null;
    
    var snake = new g.Snake({
        startX: 160,
        startY: 160,
        defaultLength: g.getSetting('defaultLength')
    });
    var fruit = new g.FruitMaker();
    var controller = new g.Controller();
    
    var previousDirection = 'right';
    var previousInterval = null;
    var missingFruit = true;

    function onDirectionChanged(direction) {
        previousDirection = direction;
        snake.move(direction);
        
        var head = snake.getHead();
        g.events.checkCollisions(head.x, head.y);
    }
    
    function onCollision (entityName) {
        switch (entityName) {
            case 'fruit':
                g.setScore(g.getScore()+g.getSetting('fruitScore'));
                var length = g.getSetting('growLength');
                
                for (var i=0; i<length; i++) {
                    snake.grow();
                }
                fruit.prepare({ context: globalContext, width: globalCanvas.width, height: globalCanvas.height });
                break;
                
            case 'world':
            case 'self':
                failedGame();
                break;
        }
    }
    
    function failedGame() {
        var lives = g.getLives();
                            
        if (lives <= 0) {
            gameOver();
        } else {
            g.setLives(lives-1);
            previousDirection = 'right';
            controller.setCurrentDirection(previousDirection);
            snake.reset(globalCanvas.width, globalCanvas.height, g.getSetting('defaultLength'));
        }
    }
    
    function gameOver() {
        g.setLives(g.getSetting('numberOfLives'));
        stopGame();
    }
    
    function stopGame() {
        if (previousInterval != null) {
            clearInterval(previousInterval);
            previousInterval = null;
        }
    }    

    function startGame() {
        stopGame();
        
        g.events.addCollision('world', { 
            left: 0, 
            top: 0, 
            right: globalCanvas.width, 
            bottom: globalCanvas.height 
        });
        
        fruit.prepare({ 
            context: globalContext, 
            width: globalCanvas.width, 
            height: globalCanvas.height 
        });
        
        g.setScore(0);
        previousDirection = 'right';
        controller.setCurrentDirection(previousDirection);
        snake.reset(globalCanvas.width, globalCanvas.height, g.getSetting('defaultLength'));
        
        previousInterval = setInterval(function() {
            globalContext.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
            g.events.trigger('onDirectionChanged', previousDirection);
            
            fruit.draw(globalContext);
            globalContext.save();
            snake.draw(globalContext);
            globalContext.restore();
        }, g.getSetting('refreshInterval'));
    }
    
    function connectSettingButton(mode) {
        document.getElementById('settings-' + mode).onclick = function(e) {
            g.setMode(mode);
        }
    }
    
    g.events.bind('onDirectionChanged', onDirectionChanged);
    g.events.bind('onCollision', onCollision);
        
    window.onload = function() {
        globalCanvas  = document.getElementById("gameboard");
        globalContext = globalCanvas.getContext('2d');
        
        connectSettingButton('easy');
        connectSettingButton('medium');
        connectSettingButton('hard');
        
        document.getElementById('start-game').onclick = function() {
            if (this.innerHTML == 'Start') {
                this.innerHTML = 'Stop';
                startGame();
            } else {
                this.innerHTML = 'Start';
                gameOver();
            }
        }
       
        gameOver();
    };
    
})(window.GameBoard);   