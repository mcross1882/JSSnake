
window.GameBoard = window.GameBoard || {};

(function ($, g) {

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
    
    $(controller).on('directionChanged', onDirectionChanged);

    $(document).ready(function() {
        var canvas = document.getElementById("gameboard");
        var ctx = canvas.getContext('2d');
        
        $(fruit).trigger('makeFruit', [ctx, canvas.width, canvas.height]);
        
        setInterval(function() {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            $(controller).trigger('directionChanged', previousDirection);
            snake.draw(ctx);
            ctx.restore();
        }, 500);
    });
    
})(jQuery, GameBoard);