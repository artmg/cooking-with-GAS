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


See [Code.js](Code.js)
