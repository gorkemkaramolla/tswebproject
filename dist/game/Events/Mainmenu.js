var mainMenu = function () {
    if (game.level === 1) {
        backgroundMusic.autoplay = true;
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
        gameLooping = true;
        gameOver = false;
        keyEvents();
        init();
    }
    else {
        gameLooping = false;
        c.fillStyle = "black";
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.font = "24px sans-serif";
        c.fillStyle = "blue";
        // Define the dimensions and positions of the text buttons
        var buttonWidth_1 = 120;
        var buttonHeight_1 = 40;
        var buttonPadding = 20;
        var textHeight_1 = 24; // Add the text height to the calculations
        var button1X_1 = canvas.width / 2 - buttonWidth_1 / 2;
        var button1Y_1 = canvas.height / 2 - buttonHeight_1 - buttonPadding - textHeight_1 / 2;
        var button2X_1 = canvas.width / 2 - buttonWidth_1 / 2;
        var button2Y_1 = canvas.height / 2 - textHeight_1 / 2;
        var button3X_1 = canvas.width / 2 - buttonWidth_1 / 2;
        var button3Y_1 = canvas.height / 2 + buttonHeight_1 + buttonPadding - textHeight_1 / 2;
        // Draw the text buttons
        c.fillText("Start Game", button1X_1, button1Y_1 + textHeight_1 / 2); // Add the text height to the y position
        c.fillText("New Game", button2X_1, button2Y_1 + textHeight_1 / 2); // Add the text height to the y position
        c.fillText("Credits", button3X_1, button3Y_1 + textHeight_1 / 2); // Add
        // Add event listeners to the canvas
        var mouseMove_1 = function (event) {
            // Determine the position of the mouse pointer on the canvas
            var x = event.offsetX;
            var y = event.offsetY;
            // Set the fill style back to the default color
            c.fillStyle = "blue";
            // Redraw all of the buttons with the default color
            c.fillText("Start Game", button1X_1, button1Y_1 + textHeight_1 / 2);
            c.fillText("New Game", button2X_1, button2Y_1 + textHeight_1 / 2);
            c.fillText("Credits", button3X_1, button3Y_1 + textHeight_1 / 2);
            // Check if the mouse pointer is within the boundaries of any of the buttons
            if (x >= button1X_1 &&
                x <= button1X_1 + buttonWidth_1 &&
                y >= button1Y_1 &&
                y <= button1Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being hovered over
                c.fillStyle = "purple";
                c.fillText("Start Game", button1X_1, button1Y_1 + textHeight_1 / 2);
            }
            else if (x >= button2X_1 &&
                x <= button2X_1 + buttonWidth_1 &&
                y >= button2Y_1 &&
                y <= button2Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being hovered over
                c.fillStyle = "purple";
                c.fillText("New Game", button2X_1, button2Y_1 + textHeight_1 / 2);
            }
            else if (x >= button3X_1 &&
                x <= button3X_1 + buttonWidth_1 &&
                y >= button3Y_1 &&
                y <= button3Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being hovered over
                c.fillStyle = "purple";
                c.fillText("Credits", button3X_1, button3Y_1 + textHeight_1 / 2);
            }
        };
        canvas.addEventListener("mousemove", mouseMove_1);
        var mouseDown_1 = function (event) {
            // Determine the position of the mouse pointer on the canvas
            var x = event.offsetX;
            var y = event.offsetY;
            // Check if the mouse pointer is within the boundaries of any of the buttons
            if (x >= button1X_1 &&
                x <= button1X_1 + buttonWidth_1 &&
                y >= button1Y_1 &&
                y <= button1Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being clicked
                c.fillStyle = "red";
                c.fillText("Start Game", button1X_1, button1Y_1 + textHeight_1 / 2);
            }
            else if (x >= button2X_1 &&
                x <= button2X_1 + buttonWidth_1 &&
                y >= button2Y_1 &&
                y <= button2Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being clicked
                c.fillStyle = "red";
                c.fillText("New Game", button2X_1, button2Y_1 + textHeight_1 / 2);
            }
            else if (x >= button3X_1 &&
                x <= button3X_1 + buttonWidth_1 &&
                y >= button3Y_1 &&
                y <= button3Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it is being clicked
                c.fillStyle = "red";
                c.fillText("Credits", button3X_1, button3Y_1 + textHeight_1 / 2);
            }
        };
        canvas.addEventListener("mousedown", mouseDown_1);
        var functionMouseUp_1 = function (event) {
            // Determine the position of the mouse pointer on the canvas
            var x = event.offsetX;
            var y = event.offsetY;
            // Check if the mouse pointer is within the boundaries of any of the buttons
            if (x >= button1X_1 &&
                x <= button1X_1 + buttonWidth_1 &&
                y >= button1Y_1 &&
                y <= button1Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it has been clicked
                c.fillStyle = "blue";
                c.fillText("Start Game", button1X_1, button1Y_1 + textHeight_1 / 2);
                // Start the game
                canvas.removeEventListener("mousedown", mouseDown_1);
                canvas.removeEventListener("mouseup", functionMouseUp_1);
                canvas.removeEventListener("mousemove", mouseMove_1);
                backgroundMusic.autoplay = true;
                backgroundMusic.currentTime = 0;
                backgroundMusic.play();
                gameLooping = true;
                gameOver = false;
                keyEvents();
                init();
                gameLoop();
            }
            else if (x >= button2X_1 &&
                x <= button2X_1 + buttonWidth_1 &&
                y >= button2Y_1 &&
                y <= button2Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it has been clicked
                c.fillStyle = "blue";
                c.fillText("New Game", button2X_1, button2Y_1 + textHeight_1 / 2);
                // Start a new game
                console.log("newgame");
            }
            else if (x >= button3X_1 &&
                x <= button3X_1 + buttonWidth_1 &&
                y >= button3Y_1 &&
                y <= button3Y_1 + buttonHeight_1) {
                // Change the appearance of the button to indicate that it has been clicked
                c.fillStyle = "blue";
                c.fillText("Credits", button3X_1, button3Y_1 + textHeight_1 / 2);
                // Show the credits
                console.log("credits");
            }
        };
        canvas.addEventListener("mouseup", functionMouseUp_1);
    }
};
//# sourceMappingURL=Mainmenu.js.map