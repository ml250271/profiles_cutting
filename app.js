// fake data:
const profileSize = 10;
const piecesToCut = [7, 6, 5, 4, 3, 2, 2, 9, 2, 4, 9, 8, 6];

function countMinNumOfProfiles(pieces = [], size) {
    let sum = pieces.reduce( (sum, val) => { return sum + val }, 0);
    return Math.ceil(sum / size);
    
}

let numOfProfiles = countMinNumOfProfiles(piecesToCut, profileSize);
console.log(`Minimun number of profiles needed is: ${numOfProfiles}`);


// array of (unused) profiles. ex: [0,0,0,0,0] - 5 unused pr

// function makeProfilesArr(num) {
//     let profilesArr = [];
//     for (let i=0; i <= num; i++) {
//         profilesArr.push(0);
//         }
//             return profilesArr;        
// };
// let profilesArr = makeProfilesArr(numOfProfiles);
// console.log(`Profiles array: ${profilesArr}`);



function mainCounting(pieces) {
    let resultArray = [];
    pieces.sort((a, b) => b - a);  // [9,7,6,5,4,3,2,2]; 
    console.log('sorted pieces ' + pieces);
    

    pieces.forEach(piece => {
        const availablePlace = resultArray.findIndex((subarray)=> {
            return (profileSize - subarray.reduce((a, b) => a+b) >= piece) 
        });  
        
        if (availablePlace < 0) {
            resultArray.push([piece])
        }else {
            resultArray[availablePlace].push(piece);
        } 
        console.table('rarr', resultArray);
    }) 
};

mainCounting(piecesToCut);