// Define your OpenAI API key
const apiKey = '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';

// Define game variables
let currentLocation = "start"; // Initial location
let gameOver = false;
let aiPrompt = ""; // Initialize without an initial prompt

// Function to display text in the game output area
function displayText(text) {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML += "<p>" + text + "</p>";
    // Automatically scroll to the bottom of the output area
    outputElement.scrollTop = outputElement.scrollHeight;
}

async function processInput(userInput) {
    // Display user input
    displayText("You: " + userInput);

    // Check if the game is over
    if (gameOver) {
        displayText("Thanks for playing! Game over.");
        return;
    }

// Declare aiResponse outside the try-catch block
let aiResponse = "";

try {
    const response = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        {
            prompt: aiPrompt,
            max_tokens: 50
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }
    );

    // Extract and assign the AI-generated response
    aiResponse = response.data.choices[0].text;

    // Log the AI response to the console
    console.log('AI Response:', aiResponse);

    // Display the AI-generated response in the game output
    displayText("AI: " + aiResponse);

    // Handle game logic based on the AI response
    handleGameLogic(aiResponse);
} catch (error) {
        if (error.response && error.response.status === 429) {
            // Rate limiting error: Wait for a few seconds and retry the request
            await sleep(5000); // Sleep for 5 seconds (adjust as needed)
            processInput(userInput); // Retry the request
        } else {
            console.error('Error:', error);
        }
    }
}

// Function to handle game logic based on AI responses
function handleGameLogic(aiResponse) {
    // Implement your game logic here based on the AI's response.
    // Parse the AI's response to determine the current game state and available choices.

    // Example 1: Check if the AI is asking about paths in the forest
    if (aiResponse.includes("you've walked into the forest, there are 3 paths, which do you choose?")) {
        // Provide player options to click on: left, middle, right
        displayText("Options: left, middle, right");
        currentLocation = "forest"; // Update the game's current location
    } else if (currentLocation === "forest") {
        // Example 2: Handle responses when the player is in the forest
        if (aiResponse.includes("you ventured down the middle path and a horrific wolf attacked. What do you do?")) {
            // Provide player options for dealing with the wolf
            displayText("Options: run, raise your sword, pet it");
        } else if (aiResponse.includes("you petted the wolf and it became your loyal companion.")) {
            // Update game state based on player's choice
            displayText("The wolf is now your loyal companion. You continue your journey.");
            // Handle any other game-specific updates here
        }
    }

    // Update the AI's prompt for the next user input
    aiPrompt = aiResponse;
}

// Event listener for the Enter key
document.getElementById("input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const userInput = document.getElementById("input").value.toLowerCase();
        document.getElementById("input").value = ""; // Clear the input field
        processInput(userInput); // Pass the user input as an argument
    }
});

// Initial message
displayText("Welcome to the Text Adventure Game!");