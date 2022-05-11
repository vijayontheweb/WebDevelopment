const fs = require('fs');

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
//ASYNC
fs.mkdir('myDirAsync', { recursive: true }, (err) => {
    console.log('INSIDE MKDIR CALLBACK')
    if (err) throw err;
});
try {
    //SYNC
    fs.mkdirSync('myDirSync');
    //USING ARGV
    const folderName = process.argv[2] || 'defaultFolder';
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, "Hello");
    fs.writeFileSync(`${folderName}/app.js`, "Hello");
    fs.writeFileSync(`${folderName}/app.css`, "Hello");
    console.log('AFTER MKDIR CALLBACK')
} catch (e) {
    console.log('SOMETHING WENT WRONG');
    console.log(e);
}
