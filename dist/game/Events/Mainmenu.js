var mainMenu = function () {
    gameLooping = false;
    c.fillStyle = "black";
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.font = "24px sans-serif";
    c.fillStyle = "blue";
    // Define the dimensions and positions of the text buttons
    var buttonWidth = 120;
    var buttonHeight = 40;
    var buttonPadding = 20;
    var textHeight = 24; // Add the text height to the calculations
    var button1X = canvas.width / 2 - buttonWidth / 2;
    var button1Y = canvas.height / 2 - buttonHeight - buttonPadding - textHeight / 2;
    var button2X = canvas.width / 2 - buttonWidth / 2;
    var button2Y = canvas.height / 2 - textHeight / 2;
    var button3X = canvas.width / 2 - buttonWidth / 2;
    var button3Y = canvas.height / 2 + buttonHeight + buttonPadding - textHeight / 2;
    // Draw the text buttons
    c.fillText("Start Game", button1X, button1Y + textHeight / 2); // Add the text height to the y position
    c.fillText("New Game", button2X, button2Y + textHeight / 2); // Add the text height to the y position
    c.fillText("Credits", button3X, button3Y + textHeight / 2); // Add
    // Add event listeners to the canvas
    var mouseMove = function (event) {
        // Determine the position of the mouse pointer on the canvas
        var x = event.offsetX;
        var y = event.offsetY;
        // Set the fill style back to the default color
        c.fillStyle = "blue";
        // Redraw all of the buttons with the default color
        c.fillText("Start Game", button1X, button1Y + textHeight / 2);
        c.fillText("New Game", button2X, button2Y + textHeight / 2);
        c.fillText("Credits", button3X, button3Y + textHeight / 2);
        // Check if the mouse pointer is within the boundaries of any of the buttons
        if (x >= button1X &&
            x <= button1X + buttonWidth &&
            y >= button1Y &&
            y <= button1Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being hovered over
            c.fillStyle = "purple";
            c.fillText("Start Game", button1X, button1Y + textHeight / 2);
        }
        else if (x >= button2X &&
            x <= button2X + buttonWidth &&
            y >= button2Y &&
            y <= button2Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being hovered over
            c.fillStyle = "purple";
            c.fillText("New Game", button2X, button2Y + textHeight / 2);
        }
        else if (x >= button3X &&
            x <= button3X + buttonWidth &&
            y >= button3Y &&
            y <= button3Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being hovered over
            c.fillStyle = "purple";
            c.fillText("Credits", button3X, button3Y + textHeight / 2);
        }
    };
    canvas.addEventListener("mousemove", mouseMove);
    var mouseDown = function (event) {
        // Determine the position of the mouse pointer on the canvas
        var x = event.offsetX;
        var y = event.offsetY;
        // Check if the mouse pointer is within the boundaries of any of the buttons
        if (x >= button1X &&
            x <= button1X + buttonWidth &&
            y >= button1Y &&
            y <= button1Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being clicked
            c.fillStyle = "red";
            c.fillText("Start Game", button1X, button1Y + textHeight / 2);
        }
        else if (x >= button2X &&
            x <= button2X + buttonWidth &&
            y >= button2Y &&
            y <= button2Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being clicked
            c.fillStyle = "red";
            c.fillText("New Game", button2X, button2Y + textHeight / 2);
        }
        else if (x >= button3X &&
            x <= button3X + buttonWidth &&
            y >= button3Y &&
            y <= button3Y + buttonHeight) {
            // Change the appearance of the button to indicate that it is being clicked
            c.fillStyle = "red";
            c.fillText("Credits", button3X, button3Y + textHeight / 2);
        }
    };
    canvas.addEventListener("mousedown", mouseDown);
    var functionMouseUp = function (event) {
        // Determine the position of the mouse pointer on the canvas
        var x = event.offsetX;
        var y = event.offsetY;
        // Check if the mouse pointer is within the boundaries of any of the buttons
        if (x >= button1X &&
            x <= button1X + buttonWidth &&
            y >= button1Y &&
            y <= button1Y + buttonHeight) {
            // Change the appearance of the button to indicate that it has been clicked
            c.fillStyle = "blue";
            c.fillText("Start Game", button1X, button1Y + textHeight / 2);
            // Start the game
            canvas.removeEventListener("mousedown", mouseDown);
            canvas.removeEventListener("mouseup", functionMouseUp);
            canvas.removeEventListener("mousemove", mouseMove);
            backgroundMusic.autoplay = true;
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
            gameLooping = true;
            gameOver = false;
            keyEvents();
            init();
            gameLoop();
        }
        else if (x >= button2X &&
            x <= button2X + buttonWidth &&
            y >= button2Y &&
            y <= button2Y + buttonHeight) {
            // Change the appearance of the button to indicate that it has been clicked
            c.fillStyle = "blue";
            c.fillText("New Game", button2X, button2Y + textHeight / 2);
            // Start a new game
            console.log("newgame");
        }
        else if (x >= button3X &&
            x <= button3X + buttonWidth &&
            y >= button3Y &&
            y <= button3Y + buttonHeight) {
            // Change the appearance of the button to indicate that it has been clicked
            c.fillStyle = "blue";
            c.fillText("Credits", button3X, button3Y + textHeight / 2);
            // Show the credits
            console.log("credits");
        }
    };
    canvas.addEventListener("mouseup", functionMouseUp);
};
//# sourceMappingURL=Mainmenu.js.map