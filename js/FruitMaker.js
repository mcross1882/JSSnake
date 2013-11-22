
window.GameBoard = window.GameBoard || {};

(function (g) {
        
    var FruitMaker = function() {
        this.currentPos = { x: -1, y: -1 };
        
        g.events.bind('onMakeFruit', this.onMakeFruit);
    }
    
    FruitMaker.prototype.onMakeFruit = function(params) {
        this.currentPos = {
            x: Math.floor((Math.random()*params.width)+1),
            y: Math.floor((Math.random()*params.height)+1)
        }
        
        g.events.addCollision('fruit', { 
            left:   this.currentPos.x, 
            top:    this.currentPos.y, 
            right:  this.currentPos.x + 10,
            bottom: this.currentPos.y + 10
        });
    }
    
    FruitMaker.prototype.getCurrentPos = function() {
        return this.currentPos;
    }
    
    FruitMaker.prototype.draw = function(context) {
        context.rect(this.currentPos.x, this.currentPos.y, this.currentPos.x+10, this.currentPos.y+10);
        context.fillStyle = "red";
        context.fill();
    }
    
    g.FruitMaker = FruitMaker;
    
})(window.GameBoard);
