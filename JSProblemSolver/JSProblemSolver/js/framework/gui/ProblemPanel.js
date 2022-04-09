function ProblemPanel(problem) {
    var state;
    var stateCanvas;
    var stateDisplay;
    var movesUL;
    var assistant;
    var messageDisplay;
    
    /* Added for DOM Lab */
    var congratsText; //text that appears when problem is solved
    var congratsPanel; //panel that appears when problem is solved
    var continueButton; //continue button
    var quitButton; //quit button
    var goalStateDisplay; //state after congrats
    var goalState; //
    var goalStateCanvas;
    var goodbyePanel; //panel after user presses quit
    var goodbyeText; //goodbye text
    
    /*Extra congrats texts*/
    var problemUsing; //to split the strings
    var movesText; //# of moves taken to complete problem
    var movesText2; // text that just says moves
    /* End of added variables for LAB */

    this.panel = $("<div></div>");
    this.panel.addClass("outer");

    this.panel.append(welcome());
    this.panel.append(intro());
    this.panel.append(stateArea());
    this.panel.append(movesArea());
    this.panel.append(bottomArea());

    /*
     * Make the message and reset button area.
     */
    function bottomArea() {
	messageDisplay = $("<p></p>");
	messageDisplay.addClass("emphasized");

	var resetButton = $("<input></input>");
	resetButton.attr("type", "button");
	resetButton.val("RESET");
	resetButton.click(function() {
	    clearMessage();
	    assistant.reset();
	    updateState();
	    movesUL.fadeIn("slow");
	});

	var bottomDiv = $("<div></div>");
	bottomDiv.addClass("bottom centerText largeBold");
	bottomDiv.append(messageDisplay);
    bottomDiv.append(resetButton);

	return bottomDiv;
    }

    /*
     * Make the moves display area
     */
    function movesArea() {
	var movesDiv = $("<div></div>");
	movesDiv.addClass("right centerText");
	movesDiv.append(boldTextElement("Possible Moves"));

	movesUL = $("<ul></ul>");
	assistant = new SolvingAssistant(problem);
	var moveNames = problem.mover.moveNames;
	const scaler = 0.65; // to get button size right
	var bSize = (scaler * buttonSize(moveNames) * 16) + "px";

	moveNames.forEach((m) => makeButton(m));
	movesDiv.append(movesUL);
	return movesDiv;

	function makeButton(m) {
	    var button = $("<input></input>");

	    button.attr("type", "button");
	    button.val(m);
	    button.css("width", bSize);
	    button.addClass("moveButton");

	    addActionForButton(button, m);

	    var item = $("<li></li>");
	    item.append(button);
	    movesUL.append(item);
	};

	function addActionForButton(button, m) {
	    button.click(function () {
		assistant.tryMove(m);
		if (assistant.moveLegal) {
		    clearMessage();
		    updateState();
		    if (assistant.problemSolved) {
			displayMessage("Congratulations. You solved the problem in "
				       + assistant.moveCount + " moves.");
			movesUL.fadeOut("slow");
			animateCongrats();
                        congrats();
		    }
		} else {
		    displayMessage("That move is not legal.");
		}
	    });
	};
    }
    
    /* Added function for Lab 13 */
    function congrats(){
        
        $("#chooser").hide(); //Hide chooser and problem panel
        
        /* Panel after Problem is solved */
        congratsPanel = $("<div></div>");
        congratsPanel.addClass("congratsPanel");
        
        /* Goal state Display */
        goalStateDisplay = $("<div></div>");
        goalStateDisplay.addClass("goalState");
        goalState = problem.currentState;
        goalStateCanvas = goalState.makeCanvas();
        goalStateDisplay.append($(goalStateCanvas));
        congratsPanel.append(goalStateDisplay);
        
        
        /* Congrats message */
        congratsText = $("<div></div>").text("CONGRATULATIONS");
        problemUsing = $("<div></div>").text("You solved the problem in");
        movesText = $("<div></div>").text(assistant.moveCount);
        movesText2 = $("<div></div>").text("Moves");
        congratsText.addClass("congratsText");
        problemUsing.addClass("problemUsing");
        movesText.addClass("movesText");
        movesText2.addClass("movesText2");
        
        
        
        
        /* Continue button */
        continueButton = $("<button></button>").text("Continue");
        continueButton.addClass("continueButton");
        congratsPanel.append(continueButton);
        continueButton.click(continueProblem);
        
        /* Quit button */
        quitButton = $("<button></button>").text("Quit");
        quitButton.addClass("quitButton");
        congratsPanel.append(quitButton);
        quitButton.click(quitProblem);
        
        
        /* Append panel(with other features) to body */
        congratsPanel.append(congratsText);
        congratsPanel.append(problemUsing);
        congratsPanel.append(movesText);
        congratsPanel.append(movesText2);
        $("body").append(congratsPanel);
        
    }
    
    function continueProblem(){
        congratsPanel.hide();
        $("#chooser").show();
        clearMessage();
	assistant.reset();
        updateState();
	movesUL.fadeIn("slow");
        
    }
    
    function quitProblem(){
        congratsPanel.hide();
        
        /* Goodbye Panel */
        goodbyePanel = $("<div></div>");
        goodbyePanel.addClass("congratsPanel");
        
        /* Goodbye Text */
        goodbyeText = $("<div></div>").text("GOODBYE!!");
        goodbyeText.addClass("goodbyeText");
        
        /* Append to body */
        goodbyePanel.append(goodbyeText);
        $("body").append(goodbyePanel);
        
    }

    function animateCongrats() {
	messageDisplay.css("font-size", 'xx-small');
	messageDisplay.css("color", 'Green');
	messageDisplay.css("background-color", 'GoldenRod');
	messageDisplay.animate({fontSize: '1.5em'}, "slow");
    }

    /*
     * Change the canvas of the current state display area
     */
    function updateState() {
	$(stateCanvas).remove();
	var prevState = state;
	state = problem.currentState;
	stateCanvas = state.makeCanvas();
	stateDisplay.append($(stateCanvas));
	state.animateMove(prevState);
    }

    /*
     * Display a string to the message display area.
     */
    function displayMessage(str) {
	messageDisplay.text(str);
    }

    /*
     * Clear the message display area.
     */
    function clearMessage() {
	messageDisplay.css("font-size", 'medium'); // restore after
	messageDisplay.css("color", 'FireBrick');  // animation
	messageDisplay.css("background-color", 'transparent');
	displayMessage("");
    }

    /*
     * Compute and return maximum move button label size
     */
    function buttonSize(moveNames) {
	var size = 0;
	moveNames.forEach(function (m) {
	    if (m.length > size) {
		size = m.length;
	    }
	});
	return size;
    }

    /*
     * Make the current state display.
     */
    function stateArea() {
	stateDisplay = $("<div></div>");
	stateDisplay.addClass("left centerText");
	stateDisplay.append(boldTextElement("Current State"));
	state = problem.currentState;
	stateCanvas = state.makeCanvas();
	stateDisplay.append($(stateCanvas));
	return stateDisplay;
    }

    /*
     * Make the introductory text for the problem.
     */
    function intro() {
	var introP = $("<p></p>");
	introP.addClass("justifyText");
	introP.text(problem.introduction);
	return introP;
    }

    /*
     * Make the welcoming text for the problem.
     */
    function welcome() {
	var welcomeDiv = $("<div></div>");
	welcomeDiv.addClass("centerText");
	welcomeDiv.append(boldTextElement("Welcome to the "));

	var problemName = boldTextElement(problem.name);
	problemName.addClass("largeBold emphasized");
	welcomeDiv.append(problemName);

	welcomeDiv.append(boldTextElement(" Problem"));
	return welcomeDiv;
    }

    /*
     * Make and return a text element with a large bold font 
     * for a given string.
     */
    function boldTextElement(str) {
	var e = $("<span></span>");
	e.text(str);
	e.addClass("largeBold");
	return e;
    }

}
