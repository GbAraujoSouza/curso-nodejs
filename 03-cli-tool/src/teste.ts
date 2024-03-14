import shell from 'shelljs';
import path from 'path';
import { accessSync, constants } from 'fs';
const foldersSrc = shell.ls('src');
const folders = shell.ls('sr');
console.log("============");

const dir = path.resolve();
console.log(dir)
accessSync(dir, constants.R_OK)
