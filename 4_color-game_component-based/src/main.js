import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.easy.on('click',this.handleMode1Click.bind(this));
        this.navbar.hard.on('click',this.handleMode2Click.bind(this));
        this.navbar.nightmare.on('click',this.handleMode3Click.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));   //two kinds of event 

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleRestClick() {
        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.reset.reset();
        this.board.reset(this.deck.getPickedColor());
    }

    handleMode1Click(){
        this.navbar.easy.setbackground();
        this.navbar.hard.resetbackground();
        this.navbar.nightmare.resetbackground();
        this.deck.reset();
        this.reset.reset();
        this.board.reset(this.deck.getPickedColor());
        this.root.style.backgroundColor = "#232323";
    }
    handleMode2Click(){
        this.navbar.easy.resetbackground();
        this.navbar.hard.setbackground();
        this.navbar.nightmare.resetbackground();
        this.deck.reset();
        this.reset.reset();
        this.board.reset(this.deck.getPickedColor());
        this.root.style.backgroundColor = "#232323";
    }
    handleMode3Click(){
        this.navbar.easy.resetbackground();
        this.navbar.hard.resetbackground();
        this.navbar.nightmare.setbackground();
        this.deck.reset();
        this.reset.reset();
        this.board.reset(this.deck.getPickedColor());
        this.root.style.backgroundColor = "#232323";
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
