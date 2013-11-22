
window.GameBoard = window.GameBoard || {};

(function (g) {

    var snake = new g.Snake();
    var fruit = new g.FruitMaker();
    var controller = new g.Controller();
    
    var previousDirection = 'right';
    var missingFruit = true;

    function onDirectionChanged(direction) {
        var pos = snake.getHead();
        switch (direction) {
            case 'up':
                pos.y += 10;
                break;
                
            case 'left':
                pos.x -= 10;
                break;
                
            case 'down':
                pos.y -= 10;
                break;
                
            case 'right':
                pos.x += 10;
                break;
        }
        
        previousDirection = direction;
        snake.move(pos.x, pos.y);
        g.events.checkCollisions(pos.x, pos.y);
    }
    
    function onCollision (entityName) {
        console.log(entityName);
        switch (entityName) {
        
        }
    }
    
    g.events.bind('onDirectionChanged', onDirectionChanged);
    g.events.bind('onCollision', onCollision);

    window.onload = function() {
        var canvas = document.getElementById("gameboard");
        var ctx = canvas.getContext('2d');
        
        g.events.addCollision('world', { left: 0, top: 0, right: canvas.width, bottom: canvas.height });
        g.events.trigger('onMakeFruit', { context: ctx, width: canvas.width, height: canvas.height });
        setInterval(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            g.events.trigger('onDirectionChanged', previousDirection);
            
            fruit.draw(ctx);
            ctx.save();
            snake.draw(ctx);
            ctx.restore();
        }, 500);
    };
    
})(window.GameBoard);