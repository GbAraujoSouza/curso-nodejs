import fs from 'fs';
import { EnumErrors } from './enum/errors.enum';
export const questions = [
  {
    type: 'list',
    name: 'tech',
    message: 'Which boilerplate should I create?',
    choices: ['NodeJs + Typescipt', 'Webpack'],
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project Name:',
    validate(folderName: string) {
      if (!folderName.trim()) return EnumErrors.ERROR_EMPTY_NAME;
     if (folderName.match(/([^\w\s-]|^\s)/))
        return EnumErrors.ERROR_SPECIAL_CHARACTERS;

      if (folderName.match(/^\s/))
        return EnumErrors.ERROR_FIRST_BLANK_CHARACTER;

      if (fs.existsSync(folderName) && fs.lstatSync(folderName).isDirectory())
        return EnumErrors.ERROR_NOT_UNIQUE_DIRECTORY_NAME;
      return true;
    },
  },
];
