import Component from './component.js';
import Role from './role.js';
import Turn from './turn.js';


export default class Banner extends Component {
    static getRootClass() {
        return '.banner';
    }

    constructor(root) {
        super(root);

        this.turn=new Turn(root.querySelector('.turn'));
        this.rolex=new Role(root.querySelector('.rolex'));
        this.roleo=new Role(root.querySelector('.roleo'));

    }

    setwin(whowin){
        if (whowin==0){
            this.roleo.win++;
            this.roleo.root.textContent=this.roleo.win;
        }
        else if (whowin==1){
            this.rolex.win++;
            this.rolex.root.textContent=this.rolex.win;
        }
    }
}
