
window.GameBoard = window.GameBoard || {};

(function (g) {
        
    var Controller = function() {
        document.addEventListener('keydown', this.onKeyDown);
    }
    
    Controller.prototype.onKeyDown = function(event) {
        var direction = null;
        switch (event.keyCode) {
            case 40 || 83:
                direction = 'up';
            break
            
            case 37 || 65:
                direction = 'left';
            break;
                
            case 38 || 87:
                direction = 'down';
            break;
                
            case 39 || 68:
                direction = 'right';
            break;
        }
        
        if (direction != null) {
            g.events.trigger('onDirectionChanged', direction);
        }
    }
    
    g.Controller = Controller;
    
})(window.GameBoard);
