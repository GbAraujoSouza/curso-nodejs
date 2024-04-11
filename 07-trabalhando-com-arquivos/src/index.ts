import fs from 'node:fs'
import path from 'node:path'
try {
    const folderName = 'tmp';
    const fileName = 'arquivo.txt';
    const filePath = path.resolve(folderName, fileName);
    if (!fs.existsSync(path.resolve(folderName))){
        fs.mkdirSync(path.resolve(folderName))
    }
    if (!fs.existsSync(path.resolve(folderName, fileName))){
        const content = 'this file was created using the node:fs module\n';
        fs.writeFileSync(path.resolve(folderName, fileName), content, 'utf-8')
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const content2 = '\nthis line was created using a string concatenation from the previous lines\n';
    fs.writeFileSync(filePath, `${fileContent + content2}`);

    if(fs.existsSync(path.resolve(folderName, 'nova-pasta-01'))) {
        fs.renameSync(path.resolve(folderName, 'nova-pasta-01'), path.resolve(folderName, 'nova-pasta-02'))
    }else {
        fs.mkdirSync(path.resolve(folderName, 'nova-pasta-02'))
    }

} catch (error) {
    console.log(error)    
}