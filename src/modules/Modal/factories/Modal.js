module.exports = function($animate, $document) {

    var close = function() {
        var element = this.element;
        
        $document.find('body').eq(0).removeClass('active-modal');

        $animate.removeClass(element, 'current').then(function() {
            element.remove();
        });      
    }

    var Modal = function(element) {
        
        this.element = element;

        this.close = close;
    }

    return Modal;

}