
window.GameBoard = window.GameBoard || {};

(function (g) {

    var Events = function() {
        this.ALLOWED_ERROR_MARGIN = 10;
        
        this.eventStorage = [];
        this.collisionStorage = [];
    }
    
    Events.prototype.trigger = function (name, extraParams) {
        this.eventStorage[name](extraParams);
    }
    
    Events.prototype.bind = function (name, callback) {
        this.eventStorage[name] = callback;
    }
    
    Events.prototype.addCollision = function (name, boundry) {
        this.collisionStorage[name] = boundry;
    }
    
    Events.prototype.checkCollisions = function (x, y) {
        var temp = null;
        console.log(x, y);
        for (var key in this.collisionStorage) {
            temp = this.collisionStorage[key];
            if (
                (Math.abs(temp.right-x)  <= this.ALLOWED_ERROR_MARGIN) || 
                (Math.abs(temp.left-x)   <= this.ALLOWED_ERROR_MARGIN) ||
                (Math.abs(temp.top-y)    <= this.ALLOWED_ERROR_MARGIN) ||
                (Math.abs(temp.bottom-y) <= this.ALLOWED_ERROR_MARGIN)
            ) {
                console.log('HIT!');
                g.events.trigger('onCollision', key);
            }
        }
    }
    
    g.events = new Events();
    
})(window.GameBoard);