
window.GameBoard = window.GameBoard || {};

(function (g) {

    var globalContext = null;
    var globalCanvas = null;
    
    var snake = new g.Snake({
        startX: 160,
        startY: 160,
        defaultLength: 5
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
                g.setScore(g.getScore()+10);
                snake.grow();
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
            g.setScore(0);
            g.setLives(lives-1);
            startGame(globalContext, globalCanvas.width, globalCanvas.height);
        }
    }
    
    function gameOver() {
        g.setScore(0);
        g.setLives(g.getSetting('numberOfLives'));
        clearInterval(previousInterval);
    }
    
    function startGame(ctx, canvasWidth, canvasHeight) {
        if (previousInterval != null) {
            clearInterval(previousInterval);
            previousInterval = null;
        }
        
        g.events.addCollision('world', { 
            left: 0, 
            top: 0, 
            right: canvasWidth, 
            bottom: canvasHeight 
        });
        
        fruit.prepare({ 
            context: globalContext, 
            width: canvasWidth, 
            height: canvasHeight 
        });
        
        snake.reset(canvasWidth, canvasHeight, 5);
        
        previousInterval = setInterval(function() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            g.events.trigger('onDirectionChanged', previousDirection);
            
            fruit.draw(ctx);
            ctx.save();
            snake.draw(ctx);
            ctx.restore();
        }, g.getSetting('refreshInterval'));
    }
    
    g.events.bind('onDirectionChanged', onDirectionChanged);
    g.events.bind('onCollision', onCollision);
        
    window.onload = function() {
        globalCanvas  = document.getElementById("gameboard");
        globalContext = globalCanvas.getContext('2d');
       
        gameOver();
        startGame(globalContext, globalCanvas.width, globalCanvas.height);
    };
    
})(window.GameBoard);