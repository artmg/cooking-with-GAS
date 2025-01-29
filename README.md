# Cooking with GAS

A selection of useful patterns for Google Apps Script (GAS)

## Global scope is Project

When you declare variables outside of a function, their scope is 'global'. As explained in this [stackoverflow answer](https://stackoverflow.com/a/57781757) all parts of individual `.gs` files in an Apps Script project are treated as one at runtime, so global variables may be accessed by any function in any script file, regardless of which script file they are declared in.

## Script and deployment types

Most scripts at first tend to be container-bound, because you add them to an existing Doc or Sheet. Bound scripts can use [simple triggers](https://developers.google.com/apps-script/guides/triggers) too, see below.

## Triggers

Simple triggers are only available in container-bound scripts, and react to events within the containers. If you want something more advanced, using authorisation or timers or standalone code, you will need an [Installable Trigger](https://developers.google.com/apps-script/guides/triggers/installable). Time-driven triggers are like cron jobs, although Add-ons cannot be triggered more frequently than hourly. 

The trigger will be installed in the project containing the function that they call. They run in the context of the account in which they were installed, even if they respond to an event like the doc being opened by someone else. You can check your installed triggers at https://script.google.com/

If you want to [manage triggers programmatically](https://developers.google.com/apps-script/guides/triggers/installable#manage_triggers_programmatically) use the Script service, by calling `ScriptApp.newTrigger(functionName)`, which returns a [`TriggerBuilder`](https://developers.google.com/apps-script/reference/script/trigger-builder). You then find the installed triggers using `ScriptApp.getProjectTriggers();` in the project. 

## Version control and deployment

See the main article on the open-source tool called `clasp` used to develop and manage Apps Script projects from a terminal rather than the Workspace editor in if Docs and Sheets.

### Alternatives

Instead of using clasp and local github repos, you might prefer a simpler workflow using the [Google Apps Script GitHub Assistant chrome extension](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo). Note, however, that the pull from github just does a direct overwrite of Apps Script files, not a merge.

### Further ideas

see https://docs.joshuatz.com/cheatsheets/google-apps-scripts/ for suggestions including:

* coding with: 
	* Google native services, 
	* third party external services, 
	* generic web services
* debugging, 
* environment control and secrets



## Footnotes

(repo formerly called https://github.com/artmg/GappsScript/)

