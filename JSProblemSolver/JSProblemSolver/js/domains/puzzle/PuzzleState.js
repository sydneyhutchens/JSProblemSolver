function PuzzleState(tiles) {

    this.tiles = tiles;

    this.toString = function() {
        var builder = "";
        
	for (r = 0; r < 3; r++) {
            builder += "+---+---+---+";
            builder += "\n";
            builder += "|";
        for (c = 0; c < 3; c++) {            
            
            if (this.tiles[r][c] === 0) {
                builder += "   ";
            } else {
                builder += (" " + this.tiles[r][c] + " ");
            }        
            
            builder += "|";
            
        }
        builder += "\n";
    }
            builder += "+---+---+---+";
            
            return builder;
    };

    this.equals = function(other) {
	if (other === null) return false;
        
        for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
            if (this.tiles[r][c] !== other.tiles[r][c]) return false;
        }
    }
    return true;
    };

    // Other properties and methods here    
    
    this.getLocation = function(loc) {
         for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (this.tiles[r][c] === loc) {
                return {row: r, column: c};
            }
        }
    }
    };
  
  this.swap = function(tile, blank) {
    var copy = this.tiles.slice();   // copies the array's top level
    copy[0] = this.tiles[0].slice(); // copies the array's first row
    copy[1] = this.tiles[1].slice(); // etc.
    copy[2] = this.tiles[2].slice();
    
    var tileRow = tile.row;
    var tileCol = tile.column;
    var blankRow = blank.row;
    var blankCol = blank.column;
    
    var currTile = copy[tileRow][tileCol];
    copy[tileRow][tileCol] = copy[blankRow][blankCol];
    copy[blankRow][blankCol] = currTile;
    
    var newState = new PuzzleState(copy);
    
    return newState;
};
    
    this.makeCanvas = function() {
	return this.makeDefaultCanvas(this);
    };
}

PuzzleState.prototype = STATE_PROTO;
