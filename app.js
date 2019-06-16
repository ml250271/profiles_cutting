// fake data:
const profileSize = 10;
const piecesToCut = [7, 6, 5, 4, 3, 2, 2, 9, 2, 4, 9, 8, 6];




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
    }) 
    resultArray.sort((a, b) => { return b.reduce((c, d) => c+d) - a.reduce((c, d) => c+d)});
    console.table('rarr', resultArray);
};

mainCounting(piecesToCut);