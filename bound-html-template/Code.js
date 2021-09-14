/* 

Testing Templated HTML in container-bound GAS
=============================================

These are tests to combine the

* use of html-based dialogs from container-bound scripts in Google Sheets, Docs, Slides or Forms
  - https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_slides_or_forms_user_interface
* with data obtained from the container to which the script is bound
* and displaying it via Templated HTML
  - // https://developers.google.com/apps-script/guides/html/templates

1. First a container-bound static dialog
2. then using a getData function in a template
3. and finally the simpler code/html of a container-bound push HTML template

*/


// Add the Menu to the container to execute the test
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Testing')
      .addItem('Show Dialog', 'showDialogStatic')
      .addToUi();
// Change the function name to showDialogXxxxx as per the function below you want to test
}


function showDialogStatic() {
  // As our script is container-bound (in the Sheet) we do not use a doGet, but call the dialog
  // help - https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_slides_or_forms_user_interface

  var html = HtmlService.createHtmlOutputFromFile('BasicStatic');

  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Static page');
}


function showDialogFunc() {
  // but this time we create a template to pass to the dialog
  var html = HtmlService.createTemplateFromFile('FuncFromTemplate');

  // so we also need to pass the evaluation of the template into the dialog
  // credit - https://stackoverflow.com/q/26894830
  SpreadsheetApp.getUi()
      .showModalDialog(html.evaluate(), 'Data from table');
  // otherwise you get the error "Exception: Invalid argument: userInterface"
}
function getData() {
  // Here is the function called from the template
  // https://developers.google.com/apps-script/guides/html/templates#calling_apps_script_functions_from_a_template
  // except it's container-bound so doesn't need to open the Sheet by ID

  return SpreadsheetApp
      .getActiveSheet()
      .getDataRange()
      .getValues();

  // alternative to test without the bound data
  // return [["A","1","!"],["B","2","@"],["C","3","£"]];
}


function showDialogPush() {
  // but perhaps the simplest in the code (and html) is a push to template
  // https://developers.google.com/apps-script/guides/html/templates#pushing_variables_to_templates
  // but it doesn't need to be called doGet()

  // we use a Template instead of static html output
  var html = HtmlService.createTemplateFromFile('PushToTemplate');

  // we don't need to Open the container by Id
  html.data = SpreadsheetApp
      .getActiveSheet()
      .getDataRange()
      .getValues();

  // but we still need to pass the template evaluation into the dialog
  SpreadsheetApp.getUi()
      .showModalDialog(html.evaluate(), 'Data pushed from table');
}

