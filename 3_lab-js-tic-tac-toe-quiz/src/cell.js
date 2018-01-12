import Component from  './component.js';
import './cell.css';

export default class Cell extends Component{
      static getRootClass() {
      return '.cell';
    }

    constructor(root) {
        super(root);

        this.role=2; //0 for O  1 for X 2 for nothing
        root.addEventListener("click", this.handleDomClick.bind(this));
        this.reset();
    }

    reset() {
        this.root.textContent=" ";
        this.root.style.padding='5rem';
      this.role=2;
    }

    handleDomClick(e) {
      this.fire('click');
    }
}
