import Component from './component.js';

import './turn.css';


export default class Turn extends Component {
    static getRootClass() {
        return '.turn';
    }

    constructor(root) {
      super(root);

      this.reset();
    }

    reset() {
        this.root.textContent = "Turn:O";
    }

    changeturn(turn){
      if (turn==0){
        this.root.textContent = "Turn:O";
      }
      else {
        this.root.textContent = "Turn:X";
      }
    }

}
