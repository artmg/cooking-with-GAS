# Cooking with GAS

A selection of useful patterns for Google Apps Script (GAS)

## Clasp

### Installing Clasp

As Apps Script development uses JavaScript, it is logical that the `clasp` Command Line Apps Script Program(?) uses the JavaScript runtime called Node.JS. Node.JS is a widely used platform, so check first in case you have it already.

```
node -v
npm -v
```

If not, we recommend the ‘long term stable’ version that avoids excessive updates and issues, use your preferred package manager to install it, e.g. `choco install nodejs-lts` or e.g. `brew install node@14` (see other versions in https://formulae.brew.sh/formula/node ) 
Once you have node.JS installed, then install clasp:

```
npm install -g @google/clasp

# Authenticate clasp with the Google account you want to use
clasp login
# help - clasp command reference - https://github.com/google/clasp
```

* Enable the Apps Script API in your account https://script.google.com/home/usersettings 
* Check for any scripts in your account: https://script.google.com/home/all 
* `clasp clone scriptid` any that are not yet in the repo
* Note that any projects should have a .gitignore file to disregard the `.clasp.json` files, as the link between projects and their scripts should be per-environment and may vary. These will be set up on the first clasp clone

Now you are set up to push and pull with git and then reflect the changes the other way with clasp.

_Do we need to change ‘clasp settings’ to handle multiple containers?_

As an alternative to manually using clasp on larger projects, consider gasgit.

### Clasp and Git

Ensure you are logged in in the right Google User context for the project you want to work on. To diagnose the current clasp context see `~/.clasprc.json`

#### Initial clone

* Pick a shortname for the doc/sheet containing the script project
* Get the ID from the Container (URL or Project Settings)
* Add the section to environments.md using ID and shortname

```
mkdir shortname
cd shortname
clasp clone ID
# this ensures that the .clasp.json goes into the container subfolder
```

#### Development Workflow

##### Online script editor

Develop on Google servers using their cloud-based script IDE

```
Github    Google       Github
   \     /      \     /
    Local   v^   Local
           Edit
```

* Open a command prompt in your local repo folder
* Check which environment is current
	 - See environments.md
* Get up to date with the upstream code
    - git pull
* Make sure your local repo matches the code in projects
    - clasp pull
See if there was any delta
    - git status
	- You can push it if you want …
* Or you can worry about it later and go back to upstream
    - git stash
* Get ready to do your code modification
    - clasp push
Now you can edit using the online Script Editor

#### VSCode

```
Github    Google    Github
   \     /         /
    Local   ------/
      v^  
     Edit
```
Use the Microsoft free client IDE on your own PC working on local files



## Footnotes

(repo formerly called https://github.com/artmg/GappsScript/)

