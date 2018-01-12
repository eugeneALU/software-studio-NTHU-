import Component from './component.js';
import Mode from './modebutton.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

       /* const easy= root.querySelector('#easy');
        const hard= root.querySelector('#hard');
        const nightmare= root.querySelector('#nightmare');*/
        this.brand = root.querySelector('.brand');
  
        this.easy =new Mode(root.querySelector('#easy'));
        this.hard =new Mode(root.querySelector('#hard'));
        this.nightmare =new Mode(root.querySelector('#nightmare'));
       /* this.easy.on('click',this.handleMode1Click.bind(this));
        this.hard.on('click',this.handleMode2Click.bind(this));
        this.nightmare.on('click',this.handleMode3Click.bind(this));*/
        /*for(let i of mo){
            const mode = new Mode(i);
            mode.on('click',this.handleModeClick.bind(this));
            this.modes.push(mode);
        }*/
        this.reset();
    }

    reset() {
        this.easy.setbackground();
        this.hard.resetbackground();
        this.nightmare.resetbackground();
    }
    /*handleMode1Click(){
        this.easy.setbackground();
        this.hard.resetbackground();
        this.nightmare.resetbackground();
        return 1;
    }
    handleMode2Click(){
        this.easy.resetbackground();
        this.hard.setbackground();
        this.nightmare.resetbackground();
        return 2;
    }
    handleMode3Click(){
        this.easy.resetbackground();
        this.hard.resetbackground();
        this.nightmare.setbackground();
        return 3;
    }*/
}
