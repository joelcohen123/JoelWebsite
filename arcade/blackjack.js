// Blackjack game logic

let playerChips = 1000;
const chipDenominations = [1, 5, 25, 100, 500];
let currentBet = 0;
let deck = [];
let playerCards = [];
let dealerCards = [];
let isGameOver = false;
// Split support
let playerHands = null; // Array of hands (arrays of cards)
let splitBets = null; // Array of bets for each hand
let activeHandIndex = 0;
let splitInProgress = false;
let splitButton;
let playerCardsArea2;
let playerValueDisplay2;
let runningCount = 0;
let handsPlayed = 0;
let cardsDealtThisShoe = 0;
let bjCountStats = null;
let bjActiveCountRow = null;
const avgCardsPerHand = 8; // 2 player, 2 dealer, plus hits
const DECKS = 6;

// Card values (simplified for now, need to handle Ace as 1 or 11)
const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11 // Ace initially valued at 11
};

// Suits (not strictly needed for value, but good for representation)
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const suitSymbols = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠'
};
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// UI Elements (will get references in startBlackjackGame)
let chipsDisplay;
let betDisplay;
let dealerCardsArea;
let playerCardsArea;
let gameMessagesDisplay;
let chipButtonsArea;
let placeBetButton;
let hitButton;
let standButton;
let doubleButton;
let playerValueDisplay;
let dealerValueDisplay;

// Create a 6-deck shoe
function createDeck() {
    deck = [];
    for (let i = 0; i < 6; i++) {
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ rank, suit });
            }
        }
    }
    console.log("Deck created with " + deck.length + " cards.");
    runningCount = 0;
    handsPlayed = 0;
    cardsDealtThisShoe = 0;
    updateCountStatsDisplay();
}

// Fisher-Yates (Knuth) Shuffle Algorithm
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
    console.log("Deck shuffled.");
}

// Deal a card from the deck
function dealCard() {
    if (deck.length === 0) {
        createDeck(); // Reshuffle if deck is empty
        shuffleDeck();
    }
    return deck.pop();
}

// Calculate hand value (handles Aces)
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    for (const card of hand) {
        if (card.rank === 'A') {
            aceCount++;
        }
        value += cardValues[card.rank];
    }
    // Adjust for Aces if hand value > 21
    while (value > 21 && aceCount > 0) {
        value -= 10; // Change Ace value from 11 to 1
        aceCount--;
    }
    return value;
}

// Update UI functions
function updateChipsDisplay() {
    chipsDisplay.textContent = playerChips;
}

function updateBetDisplay() {
    betDisplay.textContent = currentBet;
    placeBetButton.disabled = currentBet === 0; // Enable place bet button if bet is > 0
}

function displayMessage(message) {
    gameMessagesDisplay.textContent = message;
}

function renderCards(hand, element, isDealer = false) {
    element.innerHTML = ''; // Clear current cards
    hand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        // Style the card
        cardElement.style.width = '70px';
        cardElement.style.height = '100px';
        cardElement.style.border = '2px solid white';
        cardElement.style.borderRadius = '8px';
        cardElement.style.display = 'flex';
        cardElement.style.flexDirection = 'column';
        cardElement.style.alignItems = 'center';
        cardElement.style.justifyContent = 'center';
        cardElement.style.fontSize = '1.8rem';
        cardElement.style.fontWeight = 'bold';
        cardElement.style.backgroundColor = '#1a1a1a';
        cardElement.style.transition = 'all 0.3s ease';
        cardElement.style.transform = 'translateY(0)';
        cardElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        
        // For MVP, display rank and suit; later use images
        if (isDealer && index === 1 && !isGameOver) {
            cardElement.textContent = '?';
            cardElement.style.backgroundColor = '#2a2a2a';
        } else {
            // Create rank element
            const rankElement = document.createElement('div');
            rankElement.textContent = card.rank;
            rankElement.style.color = (card.suit === 'hearts' || card.suit === 'diamonds') ? '#ff4444' : 'white';
            rankElement.style.marginBottom = '5px';
            
            // Create suit symbol
            const suitElement = document.createElement('div');
            suitElement.textContent = suitSymbols[card.suit];
            suitElement.style.color = (card.suit === 'hearts' || card.suit === 'diamonds') ? '#ff4444' : 'white';
            suitElement.style.fontSize = '2rem';
            
            // Add elements to card
            cardElement.appendChild(rankElement);
            cardElement.appendChild(suitElement);
        }
        
        // Add animation for new cards
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(20px)';
        element.appendChild(cardElement);
        
        // Trigger animation
        setTimeout(() => {
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, 50 * index);
    });
    updateValueDisplays(); // Update values after rendering cards
}

// Function to update player and dealer value displays
function updateValueDisplays() {
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    
    if (playerValueDisplay) {
        playerValueDisplay.textContent = `Value: ${playerValue}`;
    }
    
    if (dealerValueDisplay) {
        // Only show dealer's full value if game is over
        if (isGameOver) {
            dealerValueDisplay.textContent = `Value: ${dealerValue}`;
        } else {
            // Show value based on the face-up card only (or '?')
            // This requires calculating the value of the first card
            // For now, we can just show '?' or the value of the first card.
            // Let's show the value of the first card if available.
            if (dealerCards.length > 0) {
                 const faceUpValue = calculateHandValue([dealerCards[0]]);
                 dealerValueDisplay.textContent = `Value: ${faceUpValue}` + (dealerCards.length > 1 && !isGameOver ? ' + ?' : '');
            } else {
                dealerValueDisplay.textContent = 'Value: 0'; // Or nothing if no cards
            }
        }
    }
}

// Start a new game round
function startRound() {
    console.log("startRound function triggered");
    if (playerChips <= 0) {
        displayMessage("Game over! No chips left. Restart to play again.");
        isGameOver = true;
        // Hide all game-specific controls/betting
        chipButtonsArea.style.display = 'none';
        placeBetButton.style.display = 'none';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        doubleButton.style.display = 'none';
        // Clear card areas
        if (playerCardsArea) playerCardsArea.innerHTML = '';
        if (dealerCardsArea) dealerCardsArea.innerHTML = '';
        // The arcade controls (restart/back) are handled by arcade.js
        return;
    }

    isGameOver = false;
    currentBet = 0;
    playerCards = [];
    dealerCards = [];
    displayMessage("Place your bet.");
    updateBetDisplay();
    renderCards(playerCards, playerCardsArea); // Clear player cards display
    renderCards(dealerCards, dealerCardsArea); // Clear dealer cards display
    updateValueDisplays(); // Update values after clearing

    // Show betting interface, hide action buttons
    console.log("startRound: Setting button displays and disabled state for betting.");
    console.log(`startRound: Before setting: Hit=${hitButton ? hitButton.style.display : 'null'}, Stand=${standButton ? standButton.style.display : 'null'}, Double=${doubleButton ? doubleButton.style.display : 'null'}`);
    console.log(`startRound: Before setting: Hit.disabled=${hitButton ? hitButton.disabled : 'null'}, Stand.disabled=${standButton ? standButton.disabled : 'null'}, Double.disabled=${doubleButton ? doubleButton.disabled : 'null'}`);
    chipButtonsArea.style.display = 'flex'; // Assuming chip buttons are in this area
    placeBetButton.style.display = 'block';
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    doubleButton.style.display = 'none';
    hitButton.disabled = true; // Ensure disabled during betting
    standButton.disabled = true; // Ensure disabled during betting
    doubleButton.disabled = true; // Ensure disabled during betting
    console.log(`startRound: After setting: Hit=${hitButton ? hitButton.style.display : 'null'}, Stand=${standButton ? standButton.style.display : 'null'}, Double=${doubleButton ? doubleButton.style.display : 'null'}`);
    console.log(`startRound: After setting: Hit.disabled=${hitButton ? hitButton.disabled : 'null'}, Stand.disabled=${standButton ? standButton.disabled : 'null'}, Double.disabled=${doubleButton ? doubleButton.disabled : 'null'}`);

    // TODO: Add UI for chip selection interaction
    // Chips are placed by clicking the chip buttons

    playerHands = null;
    splitBets = null;
    activeHandIndex = 0;
    splitInProgress = false;
    const hand2 = document.getElementById('player-hand-2');
    if (hand2) hand2.style.display = 'none';
    renderAllHands();
    enableSplitIfPossible();

    const splitBtn2 = document.getElementById('split-btn');
    if (splitBtn2) splitBtn2.style.display = 'none';
}

// Handle player placing a bet
function placeBet() {
    console.log("placeBet function triggered");
    if (currentBet === 0) {
        displayMessage("Please place a bet.");
        return;
    }

    console.log("Player placed bet. Transitioning to game state.");

    // Hide betting interface, show game area
    console.log("placeBet: Setting button displays and disabled state for player turn.");
    console.log(`placeBet: Before setting: Hit=${hitButton ? hitButton.style.display : 'null'}, Stand=${standButton ? standButton.style.display : 'null'}, Double=${doubleButton ? doubleButton.style.display : 'null'}`);
    console.log(`placeBet: Before setting: Hit.disabled=${hitButton ? hitButton.disabled : 'null'}, Stand.disabled=${standButton ? standButton.disabled : 'null'}, Double.disabled=${doubleButton ? doubleButton.disabled : 'null'}`);
    chipButtonsArea.style.display = 'none';
    placeBetButton.style.display = 'none';
    hitButton.style.display = 'inline-block';
    standButton.style.display = 'inline-block';
    doubleButton.style.display = 'inline-block';
    
    // Disable Double button if not applicable (e.g., not enough chips or not initial 2 cards)
    if (playerChips < currentBet || playerCards.length !== 2) {
        doubleButton.disabled = true;
        doubleButton.style.opacity = '0.5';
        console.log("Double button disabled: conditions not met.");
    } else {
        doubleButton.disabled = false;
        doubleButton.style.opacity = '1';
        console.log("Double button enabled: conditions met.");
    }

    console.log(`placeBet: After setting: Hit=${hitButton ? hitButton.style.display : 'null'}, Stand=${standButton ? standButton.style.display : 'null'}, Double=${doubleButton ? doubleButton.style.display : 'null'}`);
    console.log(`placeBet: After setting: Hit.disabled=${hitButton ? hitButton.disabled : 'null'}, Stand.disabled=${standButton ? standButton.disabled : 'null'}, Double.disabled=${doubleButton ? doubleButton.disabled : 'null'}`);

    const splitBtn = document.getElementById('split-btn');
    if (splitBtn) splitBtn.style.display = 'inline-block';

    dealInitialCards();
}

// Deal initial two cards
function dealInitialCards() {
    console.log("dealInitialCards function triggered");
    playerCards.push(dealCard());
    dealerCards.push(dealCard()); // Dealer's face-up card
    playerCards.push(dealCard());
    dealerCards.push(dealCard()); // Dealer's face-down card (hole card)

    renderCards(playerCards, playerCardsArea);
    renderCards(dealerCards, dealerCardsArea, true); // Show only dealer's face-up card
    updateValueDisplays(); // Update values after dealing initial cards

    displayMessage("Cards dealt.");

    checkBlackjack();

    renderAllHands();
    enableSplitIfPossible();

    updateRunningCountForCards([playerCards[0], playerCards[1], dealerCards[0], dealerCards[1]]);
    cardsDealtThisShoe += 4;
    updateCountStatsDisplay();
}

// Check for Blackjack on initial deal
function checkBlackjack() {
    console.log("checkBlackjack function triggered");
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);

    console.log(`Checking for Blackjack. Player: ${playerValue}, Dealer: ${dealerValue}`);

    if (playerValue === 21 && dealerValue === 21) {
        displayMessage("Push! Both have Blackjack.");
        payout(1); // Bet returned
    } else if (playerValue === 21) {
        displayMessage("Player Blackjack!");
        payout(2.5); // 1.5x bet
    } else if (dealerValue === 21) {
        displayMessage("Dealer Blackjack! Player loses.");
        payout(0); // Bet lost
    } else {
        displayMessage("Your turn.");
        // Enable player action buttons
        hitButton.disabled = false;
        hitButton.style.opacity = '1';
        standButton.disabled = false;
        standButton.style.opacity = '1';
        // Double button state already set in placeBet, but let's ensure it's not disabled here if it was enabled in placeBet
        if (playerChips >= currentBet && playerCards.length === 2) {
            doubleButton.disabled = false;
            doubleButton.style.opacity = '1';
        } else {
            doubleButton.disabled = true;
            doubleButton.style.opacity = '0.5';
        }

        console.log("No immediate Blackjack. Player's turn begins.");
        console.log(`Buttons disabled after checkBlackjack: Hit=${hitButton.disabled}, Stand=${standButton.disabled}, Double=${doubleButton.disabled}`);

        updateValueDisplays(); // Update values after checking for Blackjack
    }

    enableSplitIfPossible();
}

// Handle player Hit
function playerHit() {
    console.log("playerHit function triggered");
    if (isGameOver) {
        console.log("playerHit: isGameOver is true, returning.");
        return;
    }
    console.log("Player clicked Hit. (After isGameOver check)");
    playerCards.push(dealCard());
    renderCards(playerCards, playerCardsArea);
    const playerValue = calculateHandValue(playerCards);
    console.log("Player Hand Value:", playerValue);
    updateValueDisplays(); // Update player value after hitting

    if (playerValue > 21) {
        displayMessage("Player busts!");
        // Player busted, end the round
        endRound();
    } else {
        // Player did not bust, keep Hit and Stand enabled, disable Double
        hitButton.disabled = false;
        hitButton.style.opacity = '1';
        standButton.disabled = false;
        standButton.style.opacity = '1';
        doubleButton.disabled = true; // Cannot double after hitting
        doubleButton.style.opacity = '0.5';
        // The game now waits for the player to click Hit or Stand again.
    }

    updateRunningCountForCards([playerCards[playerCards.length-1]]);
    cardsDealtThisShoe++;
    updateCountStatsDisplay();
}

// Handle player Stand
function playerStand() {
    console.log("playerStand function triggered");
    if (isGameOver) {
        console.log("playerStand: isGameOver is true, returning.");
        return;
    }
    console.log("Player clicked Stand. (After isGameOver check)");
    displayMessage("Player Stands. Dealer's turn.");
    // Disable player action buttons as the player's turn is over
    hitButton.disabled = true;
    hitButton.style.opacity = '0.5';
    standButton.disabled = true;
    standButton.style.opacity = '0.5';
    doubleButton.disabled = true;
    doubleButton.style.opacity = '0.5';
    
    // Proceed to the dealer's turn after a short delay to allow message to be read
    setTimeout(dealerTurn, 1000); // 1 second delay before dealer acts
}

// Handle player Double (simplified MVP - assumes only on first two cards)
function playerDouble() {
    console.log("playerDouble function triggered");
    if (isGameOver) {
        console.log("playerDouble: isGameOver is true, returning.");
        return;
    }
    console.log("Player clicked Double. (After isGameOver check)");
     if (isGameOver || playerCards.length !== 2 || playerChips < currentBet) {
        displayMessage("Cannot double down.");
        console.log("playerDouble: Cannot double down conditions not met.");
        return;
    }

    console.log("playerDouble: Doubling down.");
    // Double the bet and deal one final card
    playerChips -= currentBet;
    currentBet *= 2;
    updateChipsDisplay();
    updateBetDisplay();
    
    playerHit(); // Player gets one more card

    // After doubling and hitting once, player's turn is over unless they busted on the double hit
    if (calculateHandValue(playerCards) <= 21) {
         // Disable player action buttons and proceed to dealer's turn
        hitButton.disabled = true;
        hitButton.style.opacity = '0.5';
        standButton.disabled = true;
        standButton.style.opacity = '0.5';
        doubleButton.disabled = true;
        doubleButton.style.opacity = '0.5';
        
        setTimeout(dealerTurn, 1000); // 1 second delay before dealer acts
    } else {
        // If player busts on Double, end round (handled in playerHit)
    }

    updateRunningCountForCards([playerCards[playerCards.length-1]]);
    cardsDealtThisShoe++;
    updateCountStatsDisplay();
}

// Handle dealer's turn
function dealerTurn() {
    displayMessage("Dealer's turn...");
    // Reveal the hidden card
    renderCards(dealerCards, dealerCardsArea, true);
    
    // Dealer must hit on soft 17
    while (calculateHandValue(dealerCards) < 17 || 
           (calculateHandValue(dealerCards) === 17 && hasSoft17(dealerCards))) {
        dealerCards.push(dealCard());
        renderCards(dealerCards, dealerCardsArea, true);
        // Add a small delay between dealer hits for better UX
        setTimeout(() => {}, 1000);

        updateRunningCountForCards([dealerCards[dealerCards.length-1]]);
        cardsDealtThisShoe++;
        updateCountStatsDisplay();
    }
    
    endRound();
}

// Check if hand is a soft 17 (contains an Ace counted as 11)
function hasSoft17(hand) {
    let value = 0;
    let hasAce = false;
    
    for (const card of hand) {
        if (card.rank === 'A') {
            hasAce = true;
        }
        value += cardValues[card.rank];
    }
    
    return hasAce && value === 17;
}

// End the round and determine winner
function endRound() {
    isGameOver = true;
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    
    // Reveal all dealer cards
    renderCards(dealerCards, dealerCardsArea, true);
    
    // Determine winner
    if (playerValue > 21) {
        displayMessage("Bust! Dealer wins.");
        payout(0);
    } else if (dealerValue > 21) {
        displayMessage("Dealer busts! You win!");
        payout(2); // 1:1 payout
    } else if (playerValue > dealerValue) {
        displayMessage("You win!");
        payout(2); // 1:1 payout
    } else if (playerValue < dealerValue) {
        displayMessage("Dealer wins.");
        payout(0);
    } else {
        displayMessage("Push - it's a tie!");
        payout(1); // Return bet
    }
    
    // Disable game buttons
    hitButton.disabled = true;
    standButton.disabled = true;
    doubleButton.disabled = true;
    
    // Show betting interface for next round
    setTimeout(() => {
        startRound();
    }, 2000);

    handsPlayed++;
    updateCountStatsDisplay();
}

// Handle payout and start next round
function payout(multiplier) {
    const winnings = currentBet * multiplier;
    playerChips += winnings;
    updateChipsDisplay();
    console.log(`Payout: ${winnings}. Total chips: ${playerChips}`);
    currentBet = 0;
    updateBetDisplay();
    
    // TODO: Add winning/losing animation or message
    // TODO: Show button to start next round after a delay
    setTimeout(startRound, 3000); // Start next round after 3 seconds
}

// Main function to start the Blackjack game (called from arcade.js)
// Accepts an object containing references to the UI elements
function startBlackjackGame(elements) {
    console.log("Blackjack game logic initialized.");
    console.log("startBlackjackGame: Received elements:", elements);

    // Reset game state
    playerChips = 1000;
    currentBet = 0;
    playerCards = [];
    dealerCards = [];
    isGameOver = false;

    // Get UI element references (now passed in)
    chipsDisplay = elements.chipsDisplay;
    betDisplay = elements.betDisplay;
    dealerCardsArea = elements.dealerCardsArea;
    playerCardsArea = elements.playerCardsArea;
    gameMessagesDisplay = elements.gameMessagesDisplay;
    chipButtonsArea = elements.chipButtonsArea;
    placeBetButton = elements.placeBetButton;
    hitButton = elements.hitButton;
    standButton = elements.standButton;
    doubleButton = elements.doubleButton;
    playerValueDisplay = elements.playerValueDisplay;
    dealerValueDisplay = elements.dealerValueDisplay;
    bjCountStats = elements.bjCountStats;
    bjActiveCountRow = elements.bjActiveCountRow;

    // Log to check if buttons are found (logs moved to arcade.js)

    // Clear any existing chip buttons
    chipButtonsArea.innerHTML = '';

    // Initial UI setup
    updateChipsDisplay();
    updateBetDisplay();
    displayMessage("Welcome to Blackjack!");
    if (gameMessagesDisplay) {
        gameMessagesDisplay.style.color = 'yellow'; // Ensure initial message color is correct
    }

    // Generate chip buttons
    chipDenominations.forEach(chipValue => {
        const chipButton = document.createElement('button');
        chipButton.textContent = chipValue;
        chipButton.classList.add('chip-btn');
        chipButton.style.padding = '0.5rem 1rem';
        chipButton.style.background = '#4CAF50';
        chipButton.style.color = 'white';
        chipButton.style.border = 'none';
        chipButton.style.borderRadius = '4px';
        chipButton.style.cursor = 'pointer';
        chipButton.onclick = () => {
            if (!isGameOver) {
                if (playerChips >= chipValue) {
                    currentBet += chipValue;
                    playerChips -= chipValue;
                    updateChipsDisplay();
                    updateBetDisplay();
                    displayMessage(`Betting ${chipValue}...`);
                } else {
                    displayMessage("Not enough chips to bet that amount!");
                }
            }
        };
        chipButtonsArea.appendChild(chipButton);
    });

    // Attach event listeners to action buttons
    if (placeBetButton) placeBetButton.onclick = placeBet;
    if (hitButton) hitButton.onclick = playerHit;
    if (standButton) standButton.onclick = playerStand;
    if (doubleButton) doubleButton.onclick = playerDouble;
    console.log("startBlackjackGame: Event listeners attached.");
    console.log("startBlackjackGame: hitButton.onclick:", hitButton ? typeof hitButton.onclick : 'null');
    console.log("startBlackjackGame: standButton.onclick:", standButton ? typeof standButton.onclick : 'null');
    console.log("startBlackjackGame: doubleButton.onclick:", doubleButton ? typeof doubleButton.onclick : 'null');

    // Clear any existing cards
    renderCards([], playerCardsArea);
    renderCards([], dealerCardsArea);

    createDeck();
    shuffleDeck();
    startRound();

    playerCardsArea2 = document.getElementById('player-cards-2');
    playerValueDisplay2 = document.getElementById('player-value-2');
    splitButton = document.getElementById('split-btn');
    if (splitButton) splitButton.onclick = playerSplit;
    if (hitButton) hitButton.onclick = playerHitSplit;
    if (standButton) standButton.onclick = playerStandSplit;

    updateCountStatsDisplay();
    updateActiveCountRow();
}

// Function to reset the game state
function resetBlackjackGame() {
    startBlackjackGame();
}

// Regarding graphics/animations:
// You will need image files for cards (e.g., 2H.png, KD.png) and a dealer image.
// Place these image files in an appropriate directory (e.g., 'images/cards/', 'images/dealer/').
// The JavaScript will then dynamically create <img> elements for cards and the dealer
// and set their src attributes to the paths of these image files.
// Animations can be done using CSS transitions/animations or by manipulating element positions/opacity in JS.
// For chip betting animation, you could move image elements representing chips from the stack to the betting area. 

function renderAllHands() {
  // Render both hands if split, else just the main hand
  if (!playerHands || playerHands.length === 1) {
    renderCards(playerCards, playerCardsArea);
    document.getElementById('player-hand-1-label').style.display = 'none';
    document.getElementById('player-hand-2').style.display = 'none';
  } else {
    // Show both hands
    document.getElementById('player-hand-1-label').style.display = '';
    document.getElementById('player-hand-2').style.display = '';
    renderCards(playerHands[0], playerCardsArea);
    renderCards(playerHands[1], playerCardsArea2);
    // Highlight active hand
    document.getElementById('player-hand-1').style.boxShadow = activeHandIndex === 0 ? '0 0 8px 2px gold' : '';
    document.getElementById('player-hand-2').style.boxShadow = activeHandIndex === 1 ? '0 0 8px 2px gold' : '';
    // Show values for both hands
    playerValueDisplay.textContent = `Value: ${calculateHandValue(playerHands[0])}`;
    playerValueDisplay2.textContent = `Value: ${calculateHandValue(playerHands[1])}`;
  }
}

function enableSplitIfPossible() {
  if (!splitButton) return;
  if (
    !splitInProgress &&
    playerCards.length === 2 &&
    playerCards[0].rank === playerCards[1].rank &&
    playerChips >= currentBet
  ) {
    splitButton.disabled = false;
    splitButton.style.opacity = '1';
  } else {
    splitButton.disabled = true;
    splitButton.style.opacity = '0.5';
  }
}

function playerSplit() {
  if (
    splitInProgress ||
    playerCards.length !== 2 ||
    playerCards[0].rank !== playerCards[1].rank ||
    playerChips < currentBet
  ) {
    displayMessage('Cannot split.');
    return;
  }
  splitInProgress = true;
  playerChips -= currentBet;
  updateChipsDisplay();
  // Create two hands
  playerHands = [
    [playerCards[0], dealCard()],
    [playerCards[1], dealCard()]
  ];
  splitBets = [currentBet, currentBet];
  activeHandIndex = 0;
  // Show both hands
  document.getElementById('player-hand-1-label').style.display = '';
  document.getElementById('player-hand-2').style.display = '';
  renderAllHands();
  updateSplitActionButtons();
  displayMessage('Playing Hand 1');

  updateRunningCountForCards([playerHands[0][1], playerHands[1][1]]);
  cardsDealtThisShoe += 2;
  updateCountStatsDisplay();
}

function updateSplitActionButtons() {
  // Enable/disable buttons for split play
  hitButton.disabled = false;
  hitButton.style.opacity = '1';
  standButton.disabled = false;
  standButton.style.opacity = '1';
  doubleButton.disabled = true;
  doubleButton.style.opacity = '0.5';
  splitButton.disabled = true;
  splitButton.style.opacity = '0.5';
}

function playerHitSplit() {
  if (!splitInProgress) return playerHit();
  playerHands[activeHandIndex].push(dealCard());
  renderAllHands();
  const value = calculateHandValue(playerHands[activeHandIndex]);
  if (value > 21) {
    displayMessage(`Hand ${activeHandIndex + 1} busts!`);
    setTimeout(() => nextSplitHand(), 800);
  }

  if (splitInProgress) {
    updateRunningCountForCards([playerHands[activeHandIndex][playerHands[activeHandIndex].length-1]]);
    cardsDealtThisShoe++;
    updateCountStatsDisplay();
  }
}

function playerStandSplit() {
  if (!splitInProgress) return playerStand();
  setTimeout(() => nextSplitHand(), 200);
}

function nextSplitHand() {
  if (!splitInProgress) return;
  if (activeHandIndex === 0) {
    activeHandIndex = 1;
    renderAllHands();
    displayMessage('Playing Hand 2');
    updateSplitActionButtons();
  } else {
    // Both hands played, dealer's turn
    hitButton.disabled = true;
    standButton.disabled = true;
    doubleButton.disabled = true;
    splitButton.disabled = true;
    displayMessage("Dealer's turn...");
    setTimeout(() => dealerTurnSplit(), 1000);
  }
}

function dealerTurnSplit() {
  // Dealer plays as normal
  renderCards(dealerCards, dealerCardsArea, true);
  while (calculateHandValue(dealerCards) < 17 ||
         (calculateHandValue(dealerCards) === 17 && hasSoft17(dealerCards))) {
    dealerCards.push(dealCard());
    renderCards(dealerCards, dealerCardsArea, true);

    updateRunningCountForCards([dealerCards[dealerCards.length-1]]);
    cardsDealtThisShoe++;
    updateCountStatsDisplay();
  }
  endRoundSplit();
}

function endRoundSplit() {
  isGameOver = true;
  renderCards(dealerCards, dealerCardsArea, true);
  let dealerValue = calculateHandValue(dealerCards);
  let results = [];
  for (let i = 0; i < 2; i++) {
    let playerValue = calculateHandValue(playerHands[i]);
    let bet = splitBets[i];
    if (playerValue > 21) {
      results.push(`Hand ${i+1}: Bust! Dealer wins.`);
    } else if (dealerValue > 21) {
      results.push(`Hand ${i+1}: Dealer busts! You win!`);
      playerChips += bet * 2;
    } else if (playerValue > dealerValue) {
      results.push(`Hand ${i+1}: You win!`);
      playerChips += bet * 2;
    } else if (playerValue < dealerValue) {
      results.push(`Hand ${i+1}: Dealer wins.`);
    } else {
      results.push(`Hand ${i+1}: Push.`);
      playerChips += bet;
    }
  }
  updateChipsDisplay();
  displayMessage(results.join(' '));
  setTimeout(() => startRound(), 3000);

  handsPlayed++;
  updateCountStatsDisplay();
}

function updateRunningCountForCards(cards) {
  for (const card of cards) {
    if (["2","3","4","5","6"].includes(card.rank)) runningCount++;
    else if (["10","J","Q","K","A"].includes(card.rank)) runningCount--;
    // 7-9 are zero
  }
  updateActiveCountRow();
}

function updateCountStatsDisplay() {
  if (!bjCountStats) return;
  const handsRemaining = Math.floor((DECKS*52 - cardsDealtThisShoe) / avgCardsPerHand);
  bjCountStats.textContent = `Count: ${runningCount} | Hands played: ${handsPlayed} | Hands remaining: ${handsRemaining}`;
  updateActiveCountRow();
}

function updateActiveCountRow() {
  if (!bjActiveCountRow) return;
  let suggestion = 'Neutral';
  if (runningCount >= 4) suggestion = 'Bet Big';
  else if (runningCount <= -2) suggestion = 'Bet Small';
  bjActiveCountRow.textContent = `Active Count: ${runningCount} | Suggestion: ${suggestion}`;
}

// Patch: update main action handlers to support split
const origPlayerHit = playerHit;
const origPlayerStand = playerStand;
hitButton = null; standButton = null; doubleButton = null; splitButton = null;

// After getting element references:
// playerCardsArea2 = document.getElementById('player-cards-2');
// playerValueDisplay2 = document.getElementById('player-value-2');
// splitButton = document.getElementById('split-btn');
// splitButton.onclick = playerSplit;
// hitButton.onclick = playerHitSplit;
// standButton.onclick = playerStandSplit;
// In checkBlackjack and after dealInitialCards, call enableSplitIfPossible();
// In startRound, reset split state: playerHands = null; splitBets = null; activeHandIndex = 0; splitInProgress = false; document.getElementById('player-hand-2').style.display = 'none';
// In renderAllHands, always update both hand values if split.
// ... existing code ... 