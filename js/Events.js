
window.GameBoard = window.GameBoard || {};

(function (g) {

    var Events = function() {
        
    }
    
    Events.prototype.trigger = function (name, extraParams) {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(name, false, false, null);
        document.dispatchEvent(event);
    }
    
    Events.prototype.bind = function (name, callback) {
        document.addEventListener(name, callback);
    }
    
    g.events = new Events();
    
})(window.GameBoard);