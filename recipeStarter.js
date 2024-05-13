/*async function starterTest(){
  return await recipeStarter(
    [
      ["test1", "3", "egg", "fish; 3", "egg; 1", "tree; 2"],
      ["test2", "3", "egg", "fish; 4", "egg; 2", "tree; 3"],
      ["test3", "3", "egg", "fish; 5", "egg; 3", "tree; 4"],
      ["test4", "3", "egg", "fish; 6", "egg; 4", "tree; 5"]
    ]    
  );
}*/

async function onOpen(e){
  await recipeStarter();
}

//later on, this should run on open and use Range objects to pull values from
//posts all recipes of a given game into the crafting tally sheet (with yield given and notes, not ingredients)
//should delete the entire crafting tally list and start printing from blank cells whenever it starts being edited
const tally = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("crafting tally");
async function recipeStarter() {//rename to sheetRange later
  //clear the entries in crafting tally
  tally.getRange("a2:d").clearContent();
  const sheetArr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("stardew").getRange("a2:C").getValues();

  return new Promise((resolve)=>{
    //for each filled recipe entry, print to console for now
    const result = [];
    for(var i = 0; i < sheetArr.length; i++){
      if(sheetArr[i][0] != ""){
        result.push(sheetArr[i]);//if i put in "length", it'll stop at the actual end index
      }
    }

    tally.getRange(`a2:c${result.length+1}`).setValues(result);
    console.log(`result:
    ${result}
    range:
    a2:c${result.length+1}`);
    resolve("success");
  });
  
}
