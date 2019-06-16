// fake data:
const profileSize = 10;
const piecesToCut = [7, 6, 5, 4, 3, 2, 2];

function minNumOfProfiles(pieces = [], size) {
    let sum = pieces.reduce( (sum, val) => { return sum + val }, 0);
    return Math.ceil(sum / size);
    
}

console.log(`Minimun number of profiles needed is: ${minNumOfProfiles(piecesToCut, profileSize)}`);


