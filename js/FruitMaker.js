
window.GameBoard = window.GameBoard || {};

(function (g) {
        
    var FruitMaker = function() {
        g.events.bind('onMakeFruit', this.onMakeFruit);
    }
    
    FruitMaker.prototype.onMakeFruit = function(event, params) {
        var randPos = {
            x: Math.floor((Math.random()*params.width)+1),
            y: Math.floor((Math.random()*params.height)+1)
        }
        
        params.contex.rect(randPos.x, randPos.y, 10, 10);
        params.contex.fillStyle = "red";
        params.contex.fill();
    }
    
    g.FruitMaker = FruitMaker;
    
})(window.GameBoard);
