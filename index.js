const args = process.argv.slice(2);
const read = require('fs').readFileSync;

String.prototype.trimAny = function (s) {
    if (s === " ") return this.trim();
    if (s === "]") s = "\\]";
    if (s === "\\") s = "\\\\";
    let regex = new RegExp("^[" + s + "]+|[" + s + "]+$", "g");
    return this.replace(regex, "");
};

const message = read(args[1], 'utf-8');
const message_splits = message.trimAny('\r\n').split('\r\n\r\n');
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
    types: message_splits[1],
    scopes: [],
    why: null,
    what: null,
    issues: [],
    references: [],
    co_authors: []
};
for(let i=2; i<message_splits.length; i++) {
    let split = message_splits[i];
    if(split.startsWith("Scope(s):")) message_sections.scopes = split;
    else if(split.startsWith("Why:")) message_sections.why = split;
    else if(split.startsWith("What:")) message_sections.what = split;
    else if(split.startsWith("Issue(s):")) message_sections.issues = split;
    else if(split.startsWith("Reference(s):")) message_sections.references = split;
    else if(split.startsWith("Co Authored By:")) message_sections.co_authors = split;
    else {
        console.log("Invalid section containing: " + split);
        process.exit(1);
    }
}

console.log(message_sections);
