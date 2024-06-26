async function starterTest(){
  /*  return await recipeStarter(//stardew args
      [
        ["test1", "3", "egg", "fish; 3", "egg; 1", "tree; 2"],
        ["test2", "3", "egg", "fish; 4", "egg; 2", "tree; 3"],
        ["test3", "3", "egg", "fish; 5", "egg; 3", "tree; 4"],
        ["test4", "3", "egg", "fish; 6", "egg; 4", "tree; 5"]
      ]    
    )
    
    var temp = await (condenseIngredient(//remember to uncomment the const tally once you're done
      [
        ["fish; 3", "egg; 1", "tree; 2"],
        ["fish; 4", "egg; 2"],//2 entries only
        ["fish; 5", "egg; 3", "", "tree; 4"],//should have fish5|egg3 only
        ["fish; 6", "egg; 4", "tree; 5"]
      ]    
    ));
    console.log(temp);;*/
  }
  
  async function onOpen(e){
    await recipeStarter();
  }
  
  /*later on, this should run on open and use Range objects to pull values from
    posts all recipes of a given game into the crafting tally sheet (with yield given and notes, not ingredients)
    should delete the entire crafting tally list and start printing from blank cells whenever it starts being edited
  */
  const tally = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("crafting tally");
  async function recipeStarter() {//rename to sheetRange later
    //clear the entries in crafting tally
    const tallyRangeStr = "B2:E";
    tally.getRange(tallyRangeStr).clearContent();
    const sheetArr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("stardew").getRange("A2:C").getValues();
    const ingredientArr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("stardew").getRange("D2:Z").getValues();
  
    //load all the first 3 columns of sheetArr into a condensed arr, with 1 cell from the condensed column
    //return a 2d column of condensed entries
    const condensedSheetCol = await condenseIngredient(ingredientArr);
    const resultArr = [];
    //combine
    for(var i = 0; i < condensedSheetCol.length; i++)
      resultArr.push([...sheetArr[i], condensedSheetCol[i][0]]);
    
    /*console.log(`result arr after combining the ingredient rows, then combining that arr with sheetArr:`);
    console.log(resultArr)*/
  
    //for each filled recipe entry in the result, push/copy to tally's B2:D row
    const coords = await rangeStarter("B", 2, resultArr);
    console.log("rangeStarter result while in recipeStarter:");
    console.log(coords);
    return await rangeTransfer(tally, coords, resultArr);
  }
  
  //condense the ingredients from D:Z then put in the 4th col
  function condenseIngredient(rangeArr){
    return new Promise((resolve)=>{
      const result = [];
      for(var row = 0; row < rangeArr.length; row++){
        var temp = "";
        for(var col = 0; col < rangeArr[row].length; col++){
          //no more entries for the inner loop
          if(rangeArr[row][col] == "")
            break;
          
          if(col == 0)//could make this part quicker later tbh
            temp = rangeArr[row][col];
          else
            temp = `${temp}|${rangeArr[row][col]}`;
        }
        
        result.push([temp]);
      }
      resolve(result);
    });
  }