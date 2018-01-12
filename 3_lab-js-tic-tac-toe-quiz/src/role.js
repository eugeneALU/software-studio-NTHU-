import Component from  './component.js';
import './role.css';


export default class Role extends Component {
    static getRootClass() {
        return '.role';
    }

    constructor(root) {
      super(root);

      this.win=0;
      this.reset();
    }

    reset() {
        this.root.textContent='-';
        this.win=0;
    }
}
