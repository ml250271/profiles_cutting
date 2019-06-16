// fake data:
const profileSize = 10;
const piecesToCut = [7, 6, 5, 4, 3, 2, 2, 9, 9, 9];

function countMinNumOfProfiles(pieces = [], size) {
    let sum = pieces.reduce( (sum, val) => { return sum + val }, 0);
    return Math.ceil(sum / size);
    
}

const numOfProfiles = countMinNumOfProfiles(piecesToCut, profileSize);
console.log(`Minimun number of profiles needed is: ${numOfProfiles}`);


// array of (unused) profiles. ex: [0,0,0,0,0] - 5 unused pr

function makeProfilesArr(num) {
    let profilesArr = [];
    for (let i=0; i <= num; i++) {
        profilesArr.push(0);
        }
            return profilesArr;        
};
let profilesArr = makeProfilesArr(numOfProfiles);
console.log(`Profiles array: ${profilesArr}`);

