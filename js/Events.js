
window.GameBoard = window.GameBoard || {};

(function (g) {

    var Events = function() {
        // Constructor
        this.ALLOWED_ERROR_MARGIN = 2;
        
        this.eventStorage = [];
        this.collisionStorage = [];
        
        // Private methods
        this.isIntersection = function (x, y, boundry) {
            // Check left and right bounds
            if (
                (this.getAbsoluteDistance(x, boundry.left) <= this.ALLOWED_ERROR_MARGIN ||
                this.getAbsoluteDistance(x, boundry.right) <= this.ALLOWED_ERROR_MARGIN) &&
                (y >= boundry.top && y <= boundry.bottom)
            ) {
                return true;
            }
            
            // Check top and bottom bounds
            if (
                (this.getAbsoluteDistance(y, boundry.top)   <= this.ALLOWED_ERROR_MARGIN ||
                this.getAbsoluteDistance(y, boundry.bottom) <= this.ALLOWED_ERROR_MARGIN) &&
                (x >= boundry.left && x <= boundry.right)
            ) {
                return true;
            }
            return false;
        }
        
        this.getAbsoluteDistance = function(a, b) {
            return Math.abs(Math.abs(a) - Math.abs(b));
        }
    }
    
    Events.prototype.trigger = function (name, extraParams) {
        if (!this.eventStorage[name]) {
            return;
        }
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
        for (var key in this.collisionStorage) {
            if (this.isIntersection(x, y, this.collisionStorage[key])) {
                g.events.trigger('onCollision', key);
            }
        }
    }
    
    g.events = new Events();
    
})(window.GameBoard);