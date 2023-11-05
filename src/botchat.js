// Add your ChatGPT API key here
const apiKey = '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';

// Send user input to the ChatGPT API
async function processUserInput(userInput) {
    // Create a request object
    const request = {
        messages: [
            {
                role: 'system',
                content: 'user',
            },
            {
                role: 'user',
                content: userInput,
            },
        ],
    };

    try {
        // Make a POST request to the ChatGPT API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            const data = await response.json();
            const botResponse = data.choices[0].message.content;

            displayMessage('Chatbot', botResponse);
            return botResponse;
        } else {
            throw new Error('Failed to fetch response from ChatGPT API');
        }
    } catch (error) {
        console.error(error);
        return 'Error processing user input';
    }
}

// The rest of your code remains unchanged
// Initialize the chatbot when the page loads
window.onload = () => {
    initializeChatbot();
    document.getElementById('send-button').addEventListener('click', sendUserInput);
};
