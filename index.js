const czrc = require('@sheba/commit-template').czrc;
const message_string = require('fs').readFileSync(process.argv.slice(2)[1], 'utf-8');
const message_splits = message_string.replaceAll('\r\n', '\n').trimAny('\n').split('\n\n');

function exit(message) {
    console.log(message);
    process.exit(1);
}

if(message_splits.length < 2) {
    exit("At least 2 section (subject and types) must be present");
}
if(!message_splits[1].startsWith("Type(s):")) {
    exit("Type(s) must be present in second section, found: " + message_splits[1]);
}

let message = {
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
    if(split.startsWith("Scope(s): ")) message.scopes = split.replace('Scope(s): ', '').split(', ');
    else if(split.startsWith("Why:\n")) message.why = split.replace('Why:\n', '');
    else if(split.startsWith("What:\n")) message.what = split.replace('What:\n', '');
    else if(split.startsWith("Issue(s):\n- ")) message.issues = split.replace('Issue(s):\n- ', '').split('\n- ');
    else if(split.startsWith("Reference(s):\n- ")) message.references = split.replace('Reference(s):\n- ', '').split('\n- ');
    else if(split.startsWith("Co Authored By:\n- ")) message.co_authors = split.replace('Co Authored By:\n- ', '').split('\n- ');
    else {
        exit("Invalid section containing: " + split);
    }
}


console.log(message);
