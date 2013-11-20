
window.GameBoard = window.GameBoard || {};

(function (g) {

    var snake = new g.Snake();
    var fruit = new g.FruitMaker();
    var controller = new g.Controller();
    
    var previousDirection = 'right';
    var missingFruit = true;

    function onDirectionChanged(event, direction) {
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
    }
    
    g.events.bind('onDirectionChanged', onDirectionChanged);

    window.onload = function() {
        var canvas = document.getElementById("gameboard");
        var ctx = canvas.getContext('2d');
        
        g.events.trigger('onMakeFruit', { context: ctx, width: canvas.width, height: canvas.height });
        
        setInterval(function() {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            g.events.trigger('onDirectionChanged', previousDirection);
            snake.draw(ctx);
            ctx.restore();
        }, 500);
    };
    
})(window.GameBoard);