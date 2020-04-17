const createRoll = () => ({
    subrolls : [],
    result : 0
 });

class Engine {

    constructor() {
        this.rolls = new Array(14).fill('').map( a => createRoll())
        this.currentFrame = 0;
    }

    calcFrame(pins){
        if(this.rolls[this.currentFrame].subrolls.length < 2 && this.rolls[this.currentFrame].subrolls.reduce((a,b) => a+b,0) < 10) {
            this.rolls[this.currentFrame].subrolls.push(pins)
        } else {
            this.currentFrame += 1;
            this.rolls[this.currentFrame].subrolls.push(pins)
        }
    }

    roll(pins){
        this.calcFrame(pins)
        this.recalc();
    }

    getScore(){
        return this.rolls.reduce((ac,roll, idx)=> idx<10 ? ac+roll.result : ac,0)
    }

    recalc(){
        this.rolls.forEach( (roll, index) => {
            const sum = roll.subrolls.reduce( (a,b) => a+b, 0);

            if(sum < 10){
                roll.result = sum;
            }else{
                if(roll.subrolls.length == 2 ){
                    roll.result = sum + this.rolls[index+1].subrolls[0]
                }

                if(roll.subrolls.length == 1){
                    roll.result = sum + this.rolls[index+1].subrolls[0] + ( this.rolls[index+1].subrolls[1] || this.rolls[index+2].subrolls[0])
                }
            }
        })
    }
 }


 module.exports = Engine