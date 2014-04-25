/*!
* jQuery Body Plugin v0.1
* https://github.com/madc/jquery.body.js
*
* Released under the MIT license <http://opensource.org/licenses/MIT>
*/

(function ($, window) {
	'use strict';

	var pluginName = 'body',
		defaults = {
			rows: 10, // Number of rows
			cols: 20, // Number of columns
			rowClass: 'row', // Class of rows
			padding: 2, // Padding between tiles (i.e. bcs of a border)
			tileClass: 'tile', // Class of tile container
			tileSize: [300, 300], // Size of one tile
			tileFolder: 'images/tiles/', // Folder, holding all the tiles
			fallbackClass: 'fallback', // Class of a tile, when fallback has been used
			fallbackFolder: 'images/fallback/', // Folder, holding all the fallback tiles
			startTile: false // Tile to move to on page load, set array([3, 3]) to enable, false to disable
		};

	function BodyJS(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
	}


 //// Public Methods. /////////////////////////////////////////////////////////////////////////////
 
	var BodyJS = function(element) {
		this.settings = $.extend( {}, defaults );
	};

	BodyJS.prototype = {
		init: function (settings) {
			$.extend( this.settings, settings );

			var width = this.settings.cols * (this.settings.tileSize[0] + this.settings.padding);

			// Build a new row.
			for(var i=1; i<=this.settings.rows; i++) {
				var row = $('<div/>', {
						class: this.settings.rowClass,
						width: width
					}).appendTo(this.element);
				
				// Build content of the row
				for(var j=1; j<=this.settings.cols; j++) {
					var tile = $('<div/>', {
							class: this.settings.tileClass,
							width: this.settings.tileSize[0],
							height: this.settings.tileSize[1],
							'data-row': i,
							'data-column': j
						}).appendTo(row);
				}
			}
			
			// Set position to custom tile
			if(this.settings.startTile) {
				this.scrollToTile(this.settings.startTile[0], this.settings.startTile[1]);
			}
			
			// Load all images in viewport on pageload and (repeatedly on resize and scroll)
			var body = this;			
			$(window).on('DOMContentLoaded load resize scroll', function() {
				$('.' + body.settings.tileClass).each(function () {
					var tile = $(this);
						
					if(isInViewport(tile) && tile.children().length == 0) {
						var row = tile.data('row'),
							col = tile.data('column');

						body.preloadTile(row, col).appendTo(tile);
					}
				});
				
				//ToDo: Disable, if all images are loaded?
			});
		},

		/** (Public) Function to preload to a certain tile
		 *
		 */
		preloadTile: function (row, col) {
			var settings = this.settings;

			return $('<img/>', {
				src: this.settings.tileFolder + row + 'x' + col + '.jpg',
				error: function() {
					$(this)
						.attr('src', settings.fallbackFolder + row + 'x' + col + '.jpg')
						.addClass(settings.fallbackClass);
				},
				load: function() {
					$(this).fadeIn(1000);
				}
			}).hide();
		},
		
		/** (Public) Function to scroll to a certain tile
		 *
		 */
		scrollToTile: function (row, col, speed, center, callback) {
			var tile = $('.tile[data-row="' + row + '"][data-column="' + col + '"]'),
				top = tile.offset().top,
				left = tile.offset().left;
			
			if(center === true) {
				top -= $(window).height()/2 - this.settings.tileSize[1]/2,
				left -= $(window).width()/2 - this.settings.tileSize[0]/2;
			}
			
			//$.isFunction( options.setup ) && options.setup.call( this );			
			if($.isNumeric(speed)) {
			    $('html, body').animate({
					'scrollTop': top,
					'scrollLeft': left
			    }, speed, function () {
					$.isFunction(callback) && callback.call(this, tile);
			    });

			} else {
				$('html, body')
					.scrollTop(top)
					.scrollLeft(left);
				
				$.isFunction(callback) && callback.call(this, tile);
			}
		}
	};

	
 //// Private Methods. ////////////////////////////////////////////////////////////////////////////

	/** Check if element (tile) is visible in viewport
	 *  <http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen>
	 */
	var isInViewport = function (el) {
		var win = $(window);

		var viewport = {
			top : win.scrollTop(),
			left : win.scrollLeft()
		};
		viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();
		
		var bounds = el.offset();
		bounds.right = bounds.left + el.outerWidth();
		bounds.bottom = bounds.top + el.outerHeight();					

		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	}

    /**
     * Plugin wrapper, preventing against multiple instantiations and
     * allowing any public function to be called via the jQuery plugin,
     * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
	 *
	 * <https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Another-extending-jQuery-boilerplate>
     */
	$.fn[ pluginName ] = function ( arg ) {
		var args, instance;

		if (!(this.data('plugin_' + pluginName) instanceof BodyJS)) {
			this.data('plugin_' + pluginName, new BodyJS(this));
		}

		instance = this.data('plugin_' + pluginName);
		instance.element = this;

		if(typeof arg === 'undefined' || typeof arg === 'object') {

			if(typeof instance['init'] === 'function') {
				instance.init( arg );
			}

		} else if(typeof arg === 'string' && typeof instance[arg] === 'function') {
			args = Array.prototype.slice.call(arguments, 1);

			return instance[arg].apply(instance, args);
		} else {
			$.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);
		}
	};
}(jQuery, window));
