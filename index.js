const commit_template = require('@sheba/commit-template');
const decompose = commit_template.formatter.toObject;
const DecomposingError = commit_template.errors.decompose;
const message_string = require('fs').readFileSync(process.argv.slice(2)[1], 'utf-8');

function exit(message) {
    console.log(message);
    process.exit(1);
}

let message = null;
try {
    message = decompose(message_string);
} catch (e) {
    if (e instanceof DecomposingError) {
        exit(e.message);
    } else {
        throw e;
    }
}
