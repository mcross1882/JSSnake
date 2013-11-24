
window.GameBoard = window.GameBoard || {};   

(function (g) {

    var Snake = function(options) {
        // Constructor
        this.MOVE_DISTANCE = 6;
        this.GROW_DISTANCE = 10;
        
        this.reset(options.startX, options.startY, options.defaultLength);
    }
    
    // Private methods
    Snake.prototype.getNextPoint = function(direction) {
        var pos = { x: this.head.x, y: this.head.y };
        switch (direction) {
            case 'up':
                pos.y += this.MOVE_DISTANCE;
                break;
                
            case 'left':
                pos.x -= this.MOVE_DISTANCE;
                break;
                
            case 'down':
                pos.y -= this.MOVE_DISTANCE;
                break;
                
            case 'right':
                pos.x += this.MOVE_DISTANCE;
                break;
        }
        this.currentDirection = direction;
        return pos;
    }
    
    Snake.prototype.checkSelfCollision = function() {
        for (var i in this.tail) {
            if (
                this.head.x == this.tail[i].x && 
                this.head.y == this.tail[i].y
            ) {
                g.events.trigger('onCollision', 'self');
            }
        }
    }
    
    Snake.prototype.getHead = function() {
        return this.head;   
    }
    
    Snake.prototype.getTail = function() {
        return this.tail;   
    }
    
    Snake.prototype.grow = function() {
        this.tail.push(this.tail[this.tail.length-1]);
        this.move(this.currentDirection);
    }
    
    Snake.prototype.move = function(direction) {
        for (var i=this.tail.length; i >= 0; i--) {
            this.tail[i] = this.tail[i-1];   
        }
        this.tail.length--;
        this.tail[0] = this.head;
        this.head = this.getNextPoint(direction);
        this.checkSelfCollision();
    }
    
    Snake.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.head.x, this.head.y);
        for (var i in this.tail) {
            ctx.lineTo(this.tail[i].x, this.tail[i].y);
        }
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
    
    Snake.prototype.reset = function(startX, startY, defaultLength) {
        this.head = { x: startX/2, y: startY/2 };
        this.tail = [];
        this.currentDirection = 'right';
        
        for (var i=0; i < defaultLength; i++) {
            this.grow();
        }
    }
    
    g.Snake = Snake;
    
})(window.GameBoard, 160, 160)
