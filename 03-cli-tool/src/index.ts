#!/usr/bin/env node
import inquirer from 'inquirer';
import { questions } from './questions';
import {GenFile} from './controllers/generateController';

class Init {
  constructor() {
    inquirer.prompt(questions).then((answers: any) => {
      return GenFile.gen(answers);
    });
  }
}
new Init();
