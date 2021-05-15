/**
 * APIs: 
 *   People v1
 */


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Contacts')
      .addItem('Refresh Contacts', 'refreshContacts')
      .addToUi();
}

function refreshContacts()
{
  var ClientColumn = {
    CLID: 1,
    ACTIVE: 2,
    TIMESTAMP: 3,
    EMAIL: 4,
    NAME: 5, 
    ADDRESS: 6,
    PHONE_NUMBER: 7, 
    DATE_OF_BIRTH: 8,
    EMERGENCY_CONTACT: 19
  };

  // Contact and Group manipulation syntax credit https://stackoverflow.com/a/64102037

  // Delete Group and all Contacts in it
  var groupName = "ActiveClients";
  var groups = People.ContactGroups.list()["contactGroups"];
  var groupOld = groups.find(group => group["name"] === groupName);
  if (groupOld) {
    // there _MUST_ be a simpler syntax for this
    var groupOldResourceName = groupOld["resourceName"];
    debugger
    People.ContactGroups.remove(resourceName=groupOldResourceName,{deleteContacts: true}); 
  }

  // Re-Add Group
  var groupResource = {
    contactGroup: {
      name: groupName
    }
  }
  group = People.ContactGroups.create(groupResource);
  var groupResourceName = group["resourceName"];


  // Loop through people to add
  // credit prasanthmj/addcontacts.js https://gist.github.com/prasanthmj/4c97d8cecfe83700f9d7e2050bbd2055
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  var last_row = range.getLastRow();
  var people_added = 0;
//  var names_list = ''; 
  for(var r=2;r<=last_row;r++)
  {
    if (range.getCell(r,ClientColumn.ACTIVE).getValue() == 'Y')
    {
//      names_list += ' ' + range.getCell(r,ClientColumn.NAME).getValue();

      // CREATE CONTACT - help https://developers.google.com/people/api/rest/v1/people
      var contactResource = {
        "names": [{
          "unstructuredName": range.getCell(r,ClientColumn.NAME).getValue()
        }],
        "phoneNumbers": [{
          'value': range.getCell(r,ClientColumn.PHONE_NUMBER).getValue()
        }],
        "emailAddresses": [{
          'value': range.getCell(r,ClientColumn.EMAIL).getValue()
        }],
        "biographies": [{
          'value': 'Emergency Contact:\n' + range.getCell(r,ClientColumn.EMERGENCY_CONTACT).getValue()
        }]
      }
      var contactResourceName = People.People.createContact(contactResource)["resourceName"];

      // ADD CONTACT TO GROUP:
      var membersResource = {
        "resourceNamesToAdd": [
          contactResourceName
        ]
      }
      People.ContactGroups.Members.modify(membersResource, groupResourceName);

      people_added++
    }
  }

  var html = HtmlService.createHtmlOutput(people_added + ' people added: ')
//  var html = HtmlService.createHtmlOutput(people_added + ' people added: ' + names_list)
  SpreadsheetApp.getUi() 
      .showModalDialog(html, 'Refresh Contacts');
}
