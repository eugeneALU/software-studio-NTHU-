import Component from './component.js';
import Cell from './cell.js';


export default class Grid extends Component {
    static getRootClass() {
        return '.grid';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.turn = 0; //start from O
        this.cells = [];
        const els = root.querySelectorAll(Cell.getRootClass());
        for (let el of els) {
            const cell = new Cell(el);
            cell.on('click', this.handleCellClick.bind(this));
            this.cells.push(cell);
        }
    }

    reset(){
      this.gameOver=false;
      for (let cell of this.cells){
          cell.reset();
      }
      this.turn = 0;
    }

      handleCellClick(firer){
          if ( this.gameOver) return;
          if (this.turn==0 && firer.role==2){
              firer.root.textContent="O";
              firer.root.style.padding='2rem 3.4rem';
              firer.role=0;
              this.turn=1;
          }
          else if (this.turn==1 && firer.role==2){
              firer.root.textContent="X";
              firer.root.style.padding='2rem 3.4rem';
              firer.role=1;
              this.turn=0;   //change turns
          }
          this.fire('changeturn');
          this.fire('checkwin');
      }
      

      checkwin(){
          //const index = this.cells.indexOf(firer);
          //console.log(index);
          if(this.cells[0].role==this.cells[1].role && this.cells[1].role==this.cells[2].role){
              if(this.cells[0].role==0)
                  return 0; //O win
              else if(this.cells[0].role==1)
                  return 1; //X win 
          }
         if(this.cells[3].role==this.cells[4].role && this.cells[4].role==this.cells[5].role){
              if(this.cells[3].role==0)
                  return 0; //O win
              else if(this.cells[3].role==1)
                  return 1; //X win 
          }
           if(this.cells[6].role==this.cells[7].role && this.cells[7].role==this.cells[8].role){
              if(this.cells[6].role==0)
                  return 0; //O win
              else if(this.cells[6].role==1)
                  return 1; //X win 
          }

           if(this.cells[0].role==this.cells[3].role && this.cells[3].role==this.cells[6].role){
              if(this.cells[0].role==0)
                  return 0; //O win
              else if(this.cells[0].role==1)
                  return 1; //X win 
          }
          if(this.cells[1].role==this.cells[4].role && this.cells[4].role==this.cells[7].role){
              if(this.cells[1].role==0)
                  return 0; //O win
              else if(this.cells[1].role==1)
                  return 1; //X win 
          }
          if(this.cells[2].role==this.cells[5].role && this.cells[5].role==this.cells[8].role){
              if(this.cells[2].role==0)
                  return 0; //O win
              else if(this.cells[2].role==1)
                  return 1; //X win 
          }

          if(this.cells[0].role==this.cells[4].role && this.cells[4].role==this.cells[8].role){
              if(this.cells[0].role==0)
                  return 0; //O win
              else if(this.cells[0].role==1)
                  return 1; //X win 
          }
          if(this.cells[2].role==this.cells[4].role && this.cells[4].role==this.cells[6].role){
              if(this.cells[2].role==0)
                  return 0; //O win
              else if(this.cells[2].role==1)
                  return 1; //X win 
          }
          return 2; //no one win 
      }
}
