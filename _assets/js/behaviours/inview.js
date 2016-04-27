import verge from 'verge';
import throttle from 'lodash.throttle';
import prefix from '../helpers/prefix';


function addTransitionDelay(el) {
	var delay = 300 / el.length;
	var prop = prefix.css3('transitionDelay');
	el.each(function(i) {
		$(this)[0].style[prop] = `${i * delay}ms`;
	});
};

function isElementVisible(fn) {
	var $window = $(window);
	function check() {
		this.each(function(i) {
			if(verge.inViewport($(this))) {
				// update style when in view
				$(this)[0].style.opacity = 1;
				if(fn) fn();
			}
		});
	}
	check.call(this);
	$window.on('scroll', throttle(check.bind(this), 100));
}

function inview(container) {
	// set inital styles 
	var $target = $(container).find('.js-reveal').each(function() {
		$(this)[0].style.opacity = 0;
		$(this)[0].style[prefix.css3('transition')] = 'opacity .3s';
	});
	// add visible state to elements that are in view
	isElementVisible.call($target);
	// increment the transition delay
	addTransitionDelay($target);
}

export default inview;