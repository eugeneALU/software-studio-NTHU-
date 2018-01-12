import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];             //card array
        const els = root.querySelectorAll(Card.getRootClass()); //array of cards return to els
        for (let el of els) {           //el is just index of els 
            var card = new Card(el);  //get card element from els
            card.on('click', this.handleCardClick.bind(this));  //declare new eventhandler
            this.cards.push(card);
        }
    this.reset();
    //this.cards2 = [];             //card array
    //const els2 = root.querySelectorAll('.card1'); //array of cards return to els
    //for (let el2 of els2) {           //el is just index of els 
    //    var card2 = new Card(el2);  //get card element from els
    //    card2.on('click', this.handleCardClick.bind(this));  //declare new eventhandler
    //    this.cards2.push(card2);
    //}
}

reset() {
    this.gameOver = false;
    var i=0;
    for (let card of this.cards){
           card.reset();
           if (i>2){
           card.eliminate();
    }
    }
        this.pickedColor = this.pickColor();
}

//reset2(){
//    this.gameOver = false;
//    for (let card of this.cards)
//           card.reset();
//    this.pickedColor = this.pickColor();
//    }


getPickedColor() {
    return this.pickedColor;
}

handleCardClick(firer, color) {   //what handler function do 
    if (this.gameOver)
        return;

    if (color === this.pickedColor) {
        for (let card of this.cards)
            card.fadeIn("#FFF");
        this.gameOver = true;
        this.fire('rightClick', this.pickedColor);
        } else {
        firer.fadeOut();
        this.fire('wrongClick');
    }
}
pickColor() {
    const random = Math.floor(Math.random() * this.cards.length);
    return this.cards[random].getColor();
}
}
