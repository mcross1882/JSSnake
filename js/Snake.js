
window.GameBoard = window.GameBoard || {};   

(function ($, g, sx, sy) {

    var Snake = function() {
        this.head = { x: sx/2, y: sy/2 };
        this.tail = [];
        
        for (var i=0; i < 5; i++) {
            this.grow();
        }
    }
    
    Snake.prototype.getHead = function() {
        return this.head;   
    }
    
    Snake.prototype.getTail = function() {
        return this.tail;   
    }
    
    Snake.prototype.grow = function() {
        this.tail.push(this.head);
        this.head = { x: this.head.x+10, y: this.head.y };
    }
    
    Snake.prototype.move = function(mx, my) {
        this.tail.length--;
        
        for (var i=this.tail.length; i >= 0; i--) {
            this.tail[i] = this.tail[i-1];   
        }
        this.tail[0] = this.head;
        this.head = { x: mx, y: my };
    }
    
    Snake.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.head.x, this.head.y);
        for (var i in this.tail) {
            ctx.lineTo(this.tail[i].x, this.tail[i].y);
        }
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }
    
    g.Snake = Snake;
    
})(jQuery, GameBoard, 150, 150);
