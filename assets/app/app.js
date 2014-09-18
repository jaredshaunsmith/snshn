var snshn = (function(_) {
    var defaults = {
			'breakPoint' : 1024
    };

    return _.extend({}, defaults);
})(_);

$ = jQuery;
$(function() {
	new snshn.Base();
});