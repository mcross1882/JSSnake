
window.GameBoard = window.GameBoard || {};

(function ($, g) {
        
    var FruitMaker = function() {
        $(this).on('makeFruit', $.proxy(this.onMakeFruit, this));
    }
    
    FruitMaker.prototype.onMakeFruit = function(event, ctx, width, height) {
        var randPos = {
            x: Math.floor((Math.random()*width)+1),
            y: Math.floor((Math.random()*height)+1)
        }
        
        ctx.rect(randPos.x, randPos.y, 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    
    g.FruitMaker = FruitMaker;
    
})(jQuery, GameBoard);
