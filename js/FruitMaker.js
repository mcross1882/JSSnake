
window.GameBoard = window.GameBoard || {};

(function (g) {
        
    var FruitMaker = function() {
        this.DEFAULT_SIZE = 10;
        this.DEFAULT_PADDING = 25;
        
        this.currentPos = { x: -1, y: -1 };
    }
    
    FruitMaker.prototype.prepare = function(params) {
        this.currentPos = {
            x: Math.floor((Math.random()*params.width)+1),
            y: Math.floor((Math.random()*params.height)+1)
        }
        
        if (this.currentPos.x > params.width - this.DEFAULT_PADDING) {
            this.currentPos.x = params.width - this.DEFAULT_PADDING;
        }
        
        if (this.currentPos.y > params.height - this.DEFAULT_PADDING) {
            this.currentPos.y = params.height - this.DEFAULT_PADDING;
        }
        
        g.events.addCollision('fruit', { 
            left:   this.currentPos.x, 
            top:    this.currentPos.y, 
            right:  this.currentPos.x + this.DEFAULT_SIZE,
            bottom: this.currentPos.y + this.DEFAULT_SIZE
        });
    }
    
    FruitMaker.prototype.getCurrentPos = function() {
        return this.currentPos;
    }
    
    FruitMaker.prototype.draw = function(context) { 
        context.beginPath();
        context.rect(this.currentPos.x, this.currentPos.y, 
            this.DEFAULT_SIZE, this.DEFAULT_SIZE);
        context.fillStyle = "red";
        context.fill();
    }
    
    g.FruitMaker = FruitMaker;
    
})(window.GameBoard);
