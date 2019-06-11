# commitlint
Lint commit message to suit [my taste](https://github.com/ShafiqIslam/dotfiles/blob/master/.gitmessage).

# Install
```
npm install @sheba/commitlint
```

# Usage
With [husky](https://github.com/typicode/husky), in your runcom `.huskyrc` or `.huskyrc.js`:
```
{
  "hooks": {
    ...
    "commit-msg": "node node_modules/@sheba/commitlint/index.js -E $HUSKY_GIT_PARAMS",
    ...
  }
}
```
