const createRoll = () => ({
    subrolls : [],
    result : 0
 });

const createGame = () => {
    let rolls = new Array(12).fill('').map( a => createRoll());
    let currentFrame = 0;

    const roll = pins => {
        calcFrameInsertion(pins);
        recalc();
    }

    const getScore = () => rolls.reduce((ac,roll, idx)=> idx<10 ? ac+roll.result : ac,0)

    const subrollSum = (a,b) => a+b;

    const calcFrameInsertion = pins => {
        if(rolls[currentFrame].subrolls.length < 2 && rolls[currentFrame].subrolls.reduce(subrollSum,0) < 10) {
            rolls[currentFrame].subrolls.push(pins)
        } else {
            currentFrame += 1;
            rolls[currentFrame].subrolls.push(pins)
        }
    }
    const recalc = () => {
        rolls.forEach( (roll, index) => {
            const sum = roll.subrolls.reduce(subrollSum, 0);
            if(index < 10){
                if(sum < 10){
                    roll.result = sum;
                } else {
                    if(roll.subrolls.length == 2 ){
                        roll.result = sum + rolls[index+1].subrolls[0]
                    }
                    if(roll.subrolls.length == 1){
                        roll.result = sum + rolls[index+1].subrolls[0] + ( rolls[index+1].subrolls[1] || rolls[index+2].subrolls[0])
                    }
                }
            }
        })
    }

    return {roll, getScore, rolls } // rolls is exported only for testing purposes

 }



 module.exports = {createGame}