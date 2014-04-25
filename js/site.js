// Create new tile map
// and set the viewport to the 2nd tile in the 3rd row.
$('#map').body({
	rows: 6,							// Number of rows
	cols: 8,							// Number of columns
	rowClass: 'row',					// Class of rows
	padding: 2,							// Padding between tiles (i.e. bcs of a border)
	tileClass: 'tile',					// Class of tile container
	tileSize: [220, 220],				// Size of one tile
	tileFolder: 'images/tiles/',		// Folder, holding all the tiles
	fallbackClass: 'fallback',			// Class of a tile, when fallback has been used
	fallbackFolder: 'images/fallback/',	// Folder, holding all the fallback tiles
	startTile: [3, 2]					// Tile to move to on page load, set array([3, 3]) to enable, false to disable
});

// Center on a tile when clicked.
$('#map').on('click', '.tile', function() {
	$('#map').body(
		'scrollToTile',
		$(this).data('row'),	// Row tile
		$(this).data('column'), // Column of tile
		1000,					// Animation time
		true,					// Move tile to center of viewport
		function(tile) {		// callback when finished (return tile object)
			console.log(tile);
		});
})