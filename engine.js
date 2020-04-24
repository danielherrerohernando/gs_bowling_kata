const createRoll = () => ({
    subrolls : [],
    result : 0
 });

const numOfFrames = 10;
const maxSumPerFrame = 10;

const createGame = () => {
    const rolls = new Array(12).fill('').map( a => createRoll());
    let currentFrame = 0;

    const roll = pins => {
        insertData(pins);
        updateFramesScore();
    }

    const getScore = () => rolls.reduce((ac,roll, idx)=> idx<10 ? ac+roll.result : ac,0)

    const subrollSum = (a,b) => a+b;

    const insertData = pins => {
        if(rolls[currentFrame].subrolls.length < 2 && rolls[currentFrame].subrolls.reduce(subrollSum,0) < maxSumPerFrame) {
            rolls[currentFrame].subrolls.push(pins)
        } else {
            currentFrame += 1;
            rolls[currentFrame].subrolls.push(pins)
        }
    }

    const updateFramesScore = () => {
        rolls.forEach( (roll, index) => {
            const sum = roll.subrolls.reduce(subrollSum, 0);
            if(index >= numOfFrames) return
            if(sum < maxSumPerFrame){
                roll.result = sum;
            } else {
                if(roll.subrolls.length == 2 ){
                    roll.result = sum + rolls[index+1].subrolls[0]
                }
                if(roll.subrolls.length == 1){
                    roll.result = sum + rolls[index+1].subrolls[0] + ( rolls[index+1].subrolls[1] || rolls[index+2].subrolls[0])
                }
            }
        })
    }

    return {roll, getScore, rolls } // rolls is exported only for testing purposes

 }



 module.exports = {createGame}