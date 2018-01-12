import Component from './component.js';

import './modebutton.css';

export default class Mode extends Component {
    static getRootClass() {
        return '.mode';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        this.reset();
    }

    reset() {
        //do nothing  
    }

    setbackground(){
        this.root.style.backgroundColor='blue';
        this.root.style.color='white';

    }
    resetbackground(){
        this.root.style.backgroundColor='white';
        this.root.style.color='black';
    }

    handleDomClick(e) {
        this.fire('click');
    }
}