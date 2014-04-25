# jquery.body.js

**jquery.body.js** is a jQuery plugin, that creates a map-like grid for tiled images. It also includes lazy-loading of the tiles. It also can provide a fallback image in case a tile does not exist. More documentation to come, see example/ Folder for now.

See an [example here](http://madc.github.io/jquery.body.js/).


## Usage

Tiles must be named {row}x{column}.jpg (i.e. 3x2.jpg, 3x3.jpg) and be found in the tileFolder. Fallback images must have the same name and be located inside the fallbackFolder.

~~~
$('#map').body({
	rows: 6,							// Number of rows
	cols: 8, 							// Number of columns
	rowClass: 'row', 					// Class of rows
	padding: 2, 						// Padding between tiles (i.e. because of a border)
	tileClass: 'tile', 					// Class of tile container
	tileSize: [220, 220], 				// Size of one tile
	tileFolder:	'images/tiles/',		// Folder, holding all the tiles
	fallbackClass: 'fallback',			// Class of a tile, when fallback has been used
	fallbackFolder:	'images/fallback/',	// Folder, holding all the fallback tiles
	startTile: false 					// Tile to move to on page load, set array([3, 3]) to enable, false to disable
});
~~~

The plugin also provides a function to navigate to a certain tile:

~~~
$('#map').body(
	'scrollToTile',
	$(this).data('row'),	// Row tile
	$(this).data('column'), // Column of tile
	1000,					// Animation time
	true,					// Move tile to center of viewport
	function(tile) {		// callback when finished (return tile object)
		console.log(tile);
	});
~~~

## Browser compatibility

Just tested in current versions of Firefox, Chrome and Safari, but it should also work on an older browser.
