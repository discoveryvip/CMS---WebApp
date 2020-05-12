function onOpen() {
  SpreadsheetApp.getUi().createMenu('Adv').addItem('Tester', 'popup').addToUi();
}

//**THIS POPUP IS A TESTER TO PREP DATA BEFOR GO LIVE**
function popup() {
  var htmlTemplate = HtmlService.createTemplateFromFile('index');
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheets = ss.getSheets();
  var holderArray = [];
  for(var x=0; x< sheets.length; x++){
     var sheetName = sheets[x].getName();
    if(sheetName != 'Access' && sheetName != 'Home'){
     holderArray.push(sheetName);
    }
   }
  htmlTemplate.data = {
    content: holderArray,
    home: findDataHome()
  }
  var html = htmlTemplate.evaluate().setHeight(600).setWidth(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'My Portal');
}
 

function eOutput(data) {
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheetName = data.project;
  var message = '';
  var success = false;
  var dataout = {};
  
  var sheet = ss.getSheetByName(sheetName);
  if(sheet == null){ message = "Sheet not found!"; } else {
    message = 'Sheet Found';
    success = true;
    dataout = sheet.getRange(1,1,sheet.getLastRow(),3).getValues();
  }
  
  var response = {
    success : success,
    message : message,
    data : dataout
  
  }
  
   Logger.log(response);
   return response;
}

function findDataHome() {
  var ss = SpreadsheetApp.openById('1oS0J7f7QdwSLXBRpT8xm7U3y6uR7yxDKCZQfBLuN40U');
  var sheet = ss.getSheetByName('Home');
  //get rang start in cell 1,1/ get last row will get everything to the last row. / 2 = get 2 columns. get values
  var dataHome = sheet.getRange(1,1,sheet.getLastRow(),2).getValues();
  return dataHome;
}


 //***COMMENTED OUT THIS CODE BUT KEEPING HERE FOR REFERENCE***
 //function popup() {
 // var holder = '';
 // var ui = SpreadsheetApp.getUi()
 // var response = ui.alert('Hola El Mundo', ui.ButtonSet.YES_NO);
 // if(response ==ui.Button.YES) {
 //   holder = "You got it!";
 // } else {
 //   holder = "NO!";
 // }
 //  var htmlOutput = HtmlService.createHtmlOutput(holder).setTitle('Your response');
 // //this will create a window in the sidebar with your message 
 // ui.showSidebar(htmlOutput);
 //}


// **THIS IS A UTILITY/ HELPER FUNCTION TO INCLUDE HTMLJS PAGES IN THE HTML MASTER PAGE.
// **THIS SHOULD REALLY GO IN A NEW FILE CALLED utils.gs
function include(filename) {
//file name is passed to the html service and we get the content of the file
   return HtmlService.createHtmlOutputFromFile(filename).getContent();

}