import Component from './component.js';

export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        this.reset();
    }

    reset() {
        this.root.style.width="0%";
        this.root.style.height="0%";
        this.root.textContent="";
    }

    showXwin() {
        this.root.style.width="50%";
        this.root.style.height="25%";
        this.root.textContent="X WIN";
    }
    showOwin(){
        this.root.style.width="50%";
        this.root.style.height="25%";
        this.root.textContent="O WIN";
    }
    showDraw(){
        this.root.style.width="50%";
        this.root.style.height="25%";
        this.root.textContent="DRAW";
    }

    handleDomClick(e) {
        this.fire('click');
    }
}
