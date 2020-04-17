
const gameTurns = 10

 class BowlingGame {

    static getScore(){

    }


 }

const createRoll = () => ({
    subrolls : [],
    result : 0
 });

 class Engine {
    rolls = new Array(10).map( a => createRoll())
     currentFrame = 0;


    roll(pins){
        if(this.rolls[this.currentFrame].subrolls.length < 2 && this.rolls[this.currentFrame].subrolls.reduce( (a,b) => a+b) < 10) {
            this.rolls[this.currentFrame].subrolls.push(pins)
        } else {
            currentFrame += 1;
            this.rolls[this.currentFrame].subrolls.push(pins)
        }
        this.recalc();
    }

    recalc(){
        this.rolls.forEach( (roll, index) => {
            const sum = roll.subrolls.reduce( (a,b) => a+b);

            if(sum < 10 ){
                roll.result = sum;
            }else{
                if(roll.subrolls.length == 2 ){
                    roll.result = sum + this.rolls[index+1].subrolls[0]
                }

                if(roll.subrolls == 1){
                    roll.result = sum + this.rolls[index+1].subrolls[0] + ( this.rolls[index+1].subrolls[1] || this.rolls[index+2].subrolls[0])
                }
            }

        })

    }

 }