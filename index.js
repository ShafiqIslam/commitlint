const args = process.argv.slice(2);
const read = require('fs').readFileSync;

String.prototype.trimAny = function (s) {
    if (s === " ") return this.trim();
    if (s === "]") s = "\\]";
    if (s === "\\") s = "\\\\";
    let regex = new RegExp("^[" + s + "]+|[" + s + "]+$", "g");
    return this.replace(regex, "");
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const message = read(args[1], 'utf-8');
const message_splits = message.replaceAll('\r\n', '\n').trimAny('\n').split('\n\n');
if(message_splits.length < 2) {
    console.log("At least 2 section (subject and types) must be present");
    process.exit(1);
}
if(!message_splits[1].startsWith("Type(s):")) {
    console.log("Type(s) must be present in second section, found: " + message_splits[1]);
    process.exit(1);
}

let message_sections = {
    subject: message_splits[0],
    types: message_splits[1].replace('Type(s): ', '').split(', '),
    scopes: [],
    why: null,
    what: null,
    issues: [],
    references: [],
    co_authors: []
};
for(let i=2; i<message_splits.length; i++) {
    let split = message_splits[i];
    if(split.startsWith("Scope(s): ")) message_sections.scopes = split.replace('Scope(s): ', '').split(', ');
    else if(split.startsWith("Why:\n")) message_sections.why = split.replace('Why:\n', '');
    else if(split.startsWith("What:\n")) message_sections.what = split.replace('What:\n', '');
    else if(split.startsWith("Issue(s):\n- ")) message_sections.issues = split.replace('Issue(s):\n- ', '').split('\n- ');
    else if(split.startsWith("Reference(s):\n- ")) message_sections.references = split.replace('Reference(s):\n- ', '').split('\n- ');
    else if(split.startsWith("Co Authored By:\n- ")) message_sections.co_authors = split.replace('Co Authored By:\n- ', '').split('\n- ');
    else {
        console.log("Invalid section containing: " + split);
        process.exit(1);
    }
}

const CZRC = require('@sheba/commit-template/CZRC.js');
let czrc = new CZRC();
czrc.load();
console.log(czrc);
//const format = require('./formatter.js')(czrc);

console.log(message_sections);
