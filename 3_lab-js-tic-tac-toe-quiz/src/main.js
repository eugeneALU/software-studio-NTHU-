import Component from  './component.js';
import Banner from  './banner.js';
import Grid from  './grid.js';
import Reset from  './reset.js';
import Window from  './window.js';
import './main.css';

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
}

export default class Main extends Component {
    static getRootClass() {
        return '.body';
    }
    constructor(root) {
        super(root);
        this.grid=new Grid(root.querySelector('.grid'));
        this.grid.on('changeturn',this.handleChangeTurn.bind(this));
        this.grid.on('checkwin',this.handleWin.bind(this));
        this.banner =new Banner(root.querySelector('.banner'));
        this.reset =new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
        this.window =new Window(root.querySelector('.window'));
        this.window.on('click', this.handleWindowClick.bind(this))
    }

    handleChangeTurn(firer){
        this.banner.turn.changeturn(firer.turn);
        
    }

    handleRestClick() {
      this.grid.reset();
      this.banner.turn.reset();
      this.banner.rolex.reset();
      this.banner.roleo.reset();
      this.reset.reset();
      this.window.reset();
    }

    handleWin(firer){
        if(firer.gameOver) return;
        var whowin=firer.checkwin();
        if (whowin!=2){
            this.banner.setwin(whowin);
            if (whowin==0){
                this.window.showOwin();
            }
            else {
                this.window.showXwin();
            }
            firer.gameOver= true;
        }
        else {
            var count=0;
            for (let cell of firer.cells){
                if(cell.role!=2){
                    count++;
                }
                if(count==9) { 
                    this.window.showDraw();
                }          
            }
         }
        }   
        handleWindowClick(){
            this.grid.reset();
            this.window.reset();
        }

}
