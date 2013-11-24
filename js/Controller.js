
window.GameBoard = window.GameBoard || {};

(function (g) {
        
    var Controller = function() {
        this.INPUT_LIMITER = 100; // ms required between each call
        this.inputMutex = false;
        this.currentDirection = 'right';
        
        var that = this;
        document.addEventListener('keydown', function(event) {
            that.onKeyDown(event);
        });
    }
    
    Controller.prototype.onKeyDown = function(event) {
        var direction = this.keyCodeToDirection(event.keyCode);
        console.log(event.keyCode, direction, this.currentDirection);
        if (
            direction != null && 
            this.currentDirection != direction &&
            !this.isOppositeDirection(direction) 
        ) {
            g.events.trigger('onDirectionChanged', direction);
            this.currentDirection = direction;
        } else {
            return;
        }
    }
    
    Controller.prototype.keyCodeToDirection = function(keyCode) {
        var direction = 'right';
        switch (keyCode) {
            case 40: case 83:
                direction = 'up';
                break
            
            case 37: case 65:
                direction = 'left';
                break;
                
            case 38: case 87:
                direction = 'down';
                break;
                
            case 39: case 68:
                direction = 'right';
                break;
        }
        return direction;
    }
    
    Controller.prototype.isOppositeDirection = function(direction) {
        switch (direction) {
            case 'right':
                return this.currentDirection == 'left';
                
            case 'left':
                return this.currentDirection == 'right';
                
            case 'down':
                return this.currentDirection == 'up';
                
            case 'up':
                return this.currentDirection == 'down';
        }
        return false;
    }
    
    g.Controller = Controller;
    
})(window.GameBoard);
