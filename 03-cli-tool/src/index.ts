import inquirer from 'inquirer';

const questions = [
  {
    type: 'list',
    name: 'tech',
    message: 'Which boilerplate should I create?',
    choices: ['NodeJs + Typescipt', 'Scss'],
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project Name: ',
  },
];
class Init {
  constructor() {
    inquirer.prompt(questions).then((answers) => {
      console.log(answers);
    });
  }
}
new Init();
