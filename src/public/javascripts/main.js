class cards {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    getCard() {
        return this.rank + this.suit;
    }
    getImg() {

    }
}

function findSum(hand) {
    let sum = 0;
    hand.forEach(x => {
        if (x.rank === 'A') {
            sum += 1;
        }
        else if (x.rank === 'J') {
            sum += 11;
        }
        else if (x.rank === 'Q') {
            sum += 12;
        }
        else if (x.rank === 'K') {
            sum += 13;
        }
        else {
            sum += parseInt(x.rank);
        }
    });
    return String(sum);

}

function shuffle(deck) {
    const duplicate = deck.slice(0);
    const copy = [];
    let n = duplicate.length;
    let i;

    while (n) {
        i = Math.floor(Math.random() * duplicate.length);
        if (i in duplicate) {
            copy.push(duplicate[i]);
            delete duplicate[i];
            n--;
        }
    }
    return copy;
}
function displayResult(status, playerSum = undefined, computerSum = undefined) {
    if (status === "bust") {
        document.querySelector('#gameDiv').style.display = "none";
        const messageDiv = document.createElement('div');
        const message = document.createElement('h3');
        message.innerHTML = "Over 21! You Lost!";
        messageDiv.appendChild(message);
        document.body.appendChild(messageDiv);
    }
    if (status === "compare") {
        if (computerSum && playerSum) {
            document.querySelector('#gameDiv').style.display = "none";
            const messageDiv = document.createElement('div');
            const message = document.createElement('h3');
            console.log(typeof computerSum, typeof playerSum, computerSum, playerSum);
            if (parseInt(computerSum) > parseInt(playerSum)) {
                message.innerHTML = `You Lost! \n Computer's total points: ${computerSum}\n Your total points: ${playerSum}`;
            }
            else if (parseInt(computerSum) === parseInt(playerSum)) {
                message.innerHTML = "It's a tie!"; 
            }
            else {
                message.innerHTML = `You Won! \n Computer's total points: ${computerSum}\n Your total points: ${playerSum}`;
            }
            messageDiv.appendChild(message);
            document.body.appendChild(messageDiv);              
        }
        else {
            document.querySelector('#gameDiv').style.display = "none";
            const messageDiv = document.createElement('div');
            const message = document.createElement('h3');
            message.innerHTML = "Error retrieving results";
            messageDiv.appendChild(message);
            document.body.appendChild(messageDiv); 
        }
        
    }

    if (status === "win") {
        document.querySelector('#gameDiv').style.display = "none";
        const messageDiv = document.createElement('div');
        const message = document.createElement('h3');
        console.log(typeof computerSum, typeof playerSum, computerSum, playerSum);
        message.innerHTML = `Computer Busted! You Won! \n Computer's total points: ${computerSum}\n Your total points: ${playerSum}`;
        messageDiv.appendChild(message);
        document.body.appendChild(messageDiv); 

    }
}

function hit(evt) {
    console.log(evt.currentTarget.myParam);
    const div = document.querySelector('#playerHand');
    console.log(div);
    const cardsArray = evt.currentTarget.myParam[1];
    const copy = cardsArray.slice(0);
    const card = copy.splice(cardsArray.length - 1, 1);
    evt.currentTarget.myParam[0].push(...card);
    evt.currentTarget.myParam[1] = copy;
    const playerSum = findSum(evt.currentTarget.myParam[0]);
    if (playerSum > 21) {
        displayResult("bust");
        return;
    }

    const nextCard = document.createElement("img");
    nextCard.src = `../img/cards/${card[0].getCard()}.svg`;
    nextCard.width = '200';
    nextCard.style.display = 'inline-block';
    nextCard.style.marginRight = '10px';
    console.log(evt.currentTarget.myParam[0]); 
    evt.currentTarget.myParam[2] = playerSum;
    console.log(evt.currentTarget.myParam[2]);
    div.insertBefore(nextCard, document.querySelector('#nextMove'));
    document.querySelector("#displayText").innerHTML = `Player Hand - Total: ${playerSum}`;
 

}

function stand(evt) { 
    const div = document.querySelector('#gameDiv');
    const cardsArray = evt.currentTarget.myParam[1];
    const copy = cardsArray.slice(0);
    const card = copy.splice(cardsArray.length - 1, 1);
    const computerSumBefore = findSum(evt.currentTarget.myParam[0]);
    evt.currentTarget.myParam[0].push(...card);
    evt.currentTarget.myParam[1] = copy;
    console.log(evt.currentTarget.myParam);
    const computerSum = findSum(evt.currentTarget.myParam[0]); 
    console.log(computerSumBefore, computerSum, card[0].rank);
    if (parseInt(computerSumBefore) > 21) {
        displayResult("win", evt.currentTarget.myParam[2], computerSum);
        return;
    }
    else if (parseInt(computerSumBefore) >= 15 && parseInt(computerSumBefore) <= 21) {
        displayResult("compare", evt.currentTarget.myParam[2], computerSumBefore);
        return;
    }
    else {
        const nextCard = document.createElement("img");
        nextCard.src = `../img/cards/unknown.svg`;
        nextCard.width = '190';
        nextCard.style.display = 'inline-block';
        nextCard.style.marginRight = '10px';
        console.log(evt.currentTarget.myParam[0]); 
        div.insertBefore(nextCard, document.querySelector('#playerHand'));
    }
    
}

function Game(deck, hand) {
    const gameDiv = document.createElement("div");
    gameDiv.className = "gameDiv";
    gameDiv.id = "gameDiv";
    const computerHand = hand.slice(0,2);
    const playerHand = hand.slice(2);
    const computerHandDiv = document.createElement("div");
    computerHandDiv.className = "computerHand";
    computerHandDiv.id = "computerHand";
    const computerHandText = document.createElement("h3"); 
    computerHandText.innerHTML="Computer Hand - Total: ?";
    computerHandDiv.appendChild(computerHandText);
    computerHandDiv.style.textAlign = "center";

    const computerHand1 = document.createElement("img");
    const computerHand2 = document.createElement("img");

    computerHand1.src = `../img/cards/${computerHand[0].getCard()}.svg`;
    computerHand1.width = '200';
    computerHand1.style.display = 'inline-block';
    computerHand1.style.marginRight = '10px'; 
    computerHand2.src = `../img/cards/unknown.svg`;
    computerHand2.width = '185';
    computerHand2.style.dispaly = 'inline-block';
    computerHandDiv.appendChild(computerHand1);
    computerHandDiv.appendChild(computerHand2);  

    gameDiv.appendChild(computerHandDiv);
    const playerHandDiv = document.createElement("div");
    playerHandDiv.className = "playerHand";
    playerHandDiv.id = "playerHand"; 
    const playerHandText = document.createElement("h3"); 
    let playerSum = findSum(playerHand);
    playerHandText.innerHTML=`Player Hand - Total: ${playerSum}`;
    playerHandText.className = "displayText";
    playerHandText.id ="displayText"; 
    playerHandDiv.appendChild(playerHandText);
    playerHandDiv.style.textAlign = "center";
    const playerHand1 = document.createElement("img");
    const playerHand2 = document.createElement("img");
    playerHand1.src = `../img/cards/${playerHand[0].getCard()}.svg`;
    playerHand1.width = '200';
    playerHand1.style.display = 'inline-block';
    playerHand1.style.marginRight = '10px'; 
    playerHand2.src = `../img/cards/${playerHand[1].getCard()}.svg`;
    playerHand2.width = '200';
    playerHand2.style.marginRight = '10px'; 
    playerHand2.style.dispaly = 'inline-block';

    const nextMove = document.createElement("div");
    const hitBtn = document.createElement("input");
    const standBtn = document.createElement("input");
    nextMove.className = 'nextMove';
    nextMove.id = 'nextMove';
    hitBtn.value = "  Hit  ";
    hitBtn.type = "submit";
    hitBtn.style.marginRight = "15px";
    standBtn.value = "Stand";
    standBtn.type = "submit";
    nextMove.appendChild(hitBtn);
    nextMove.appendChild(standBtn);

    playerHandDiv.appendChild(playerHand1);
    playerHandDiv.appendChild(playerHand2);  
    playerHandDiv.appendChild(nextMove);
    gameDiv.appendChild(playerHandDiv);
    document.body.appendChild(gameDiv);

    hitBtn.addEventListener('click', hit, false);
    standBtn.addEventListener('click', stand, false);
    hitBtn.myParam = [playerHand, deck, playerSum];
    standBtn.myParam = [computerHand, deck, playerSum];
}


function checkSuit (x) {
    if (x === 1) {
        return "❤️";
    }
    else if (x === 2) {
        return "♣️";
    }
    else if (x === 3) {
        return "♦️";
    }
    else if (x === 4) {
        return "♠️";
    }
}

const rankMap = {
    '0': 'K',
    '1': 'A',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    '11': 'J',
    '12': 'Q',
    '13': 'K'
};
function setAttributes(el, attrs) {
    for(const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }



function generateDeck(deck) {
    const deckNum = [...Array(52).keys()].map(i => i + 1);
        deckNum.forEach(x => {
            const rank = (x % 13 === 0) ? 'K' : rankMap[x % 13 + ''];
            const suit = checkSuit(Math.ceil(x / 13));
            const card = new cards(suit, rank);
            deck.push(card);
    });
}

function formSubmit(evt) {
    evt.preventDefault();
    const div = document.querySelector('#start');
    const input = document.querySelector('input[type="text"]');
    div.classList.add('hidden');
    console.log('link clicked!');
    console.log(input.value);
    let deck = [];
    generateDeck(deck);
    deck = shuffle(deck);
    if (input.value !== '') {
        const [a,b,c,d] = input.value.split(',');
        let [fa,fb,fc,fd] = [false, false, false, false, false];
        const index = [];
        const hand = [];

        for (let i = 0; i < deck.length; i++) {
            if (fa && fb && fc && fd) {
                break;
            }
            if (deck[i].rank === rankMap[a] && !fa && !index.includes(i)) {
                fa = true;
                hand.push(deck[i]);
                index.push(i);
            }
            if (deck[i].rank === rankMap[b] && !fb && !index.includes(i)) {
                fb = true;
                hand.push(deck[i]);
                index.push(i);
            }
            if (deck[i].rank === rankMap[c] && !fc && !index.includes(i)) {
                fc = true;
                hand.push(deck[i]);
                index.push(i);
            }
            if (deck[i].rank === rankMap[d] && !fd && !index.includes(i)) {
                fd = true;
                hand.push(deck[i]);
                index.push(i);
            }
        }
        deck = deck.filter((x, i) => {
            if (!index.includes(i)) {
                console.log(x);
                return x;
            }
        });
        Game(deck, hand);
    }
    else {
        const hand = deck.splice(0,4);
        Game(deck, hand);

    }
} 

function main() {
    const button = document.querySelector('#playBtn');
    button.addEventListener('click', formSubmit);
}
document.addEventListener('DOMContentLoaded', main);
