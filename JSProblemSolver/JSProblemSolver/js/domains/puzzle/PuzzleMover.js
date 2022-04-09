const SLIDE_1 = "Slide 1";
const SLIDE_2 = "Slide 2";
const SLIDE_3 = "Slide 3";
const SLIDE_4 = "Slide 4";
const SLIDE_5 = "Slide 5";
const SLIDE_6 = "Slide 6";
const SLIDE_7 = "Slide 7";
const SLIDE_8 = "Slide 8";

var puzzleMover = new Mover();

puzzleMover.addMove(SLIDE_1, (s) => trySlide1(s)); // You provide move functions
puzzleMover.addMove(SLIDE_2, (s) => trySlide2(s));
puzzleMover.addMove(SLIDE_3, (s) => trySlide3(s));
puzzleMover.addMove(SLIDE_4, (s) => trySlide4(s));
puzzleMover.addMove(SLIDE_5, (s) => trySlide5(s));
puzzleMover.addMove(SLIDE_6, (s) => trySlide6(s));
puzzleMover.addMove(SLIDE_7, (s) => trySlide7(s));
puzzleMover.addMove(SLIDE_8, (s) => trySlide8(s));

function PuzzleMover() { }

PuzzleMover.prototype = puzzleMover;

// Helper functions here

function trySlide1(state) {
    var oldState = state;
    var currTile = oldState.getLocation(1);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide2(state) {
    var oldState = state;
    var currTile = oldState.getLocation(2);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide3(state) {
    var oldState = state;
    var currTile = oldState.getLocation(3);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide4(state) {
    var oldState = state;
    var currTile = oldState.getLocation(4);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide5(state) {
    var oldState = state;
    var currTile = oldState.getLocation(5);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide6(state) {
    var oldState = state;
    var currTile = oldState.getLocation(6);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide7(state) {
    var oldState = state;
    var currTile = oldState.getLocation(7);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function trySlide8(state) {
    var oldState = state;
    var currTile = oldState.getLocation(8);
    var blankTile = oldState.getLocation(0);
    
    if (validMove(currTile, blankTile)) {
        var next = oldState.swap(currTile, blankTile);
        return next;      
    } else {
        return null;
    }
}

function validMove(tile, blank) {
    var valid = false;
    
    if (((tile.column - 1 === blank.column
                || tile.column + 1 === blank.column)
                && (tile.row === blank.row))
                || ((tile.row - 1 === blank.row
                || tile.row + 1 === blank.row)
                && tile.column === blank.column)) {
            valid = true;
        }
        
        return valid;
}
