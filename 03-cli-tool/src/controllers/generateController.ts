import { EnumChoicesBoilerplate } from 'src/enum/choices-boilerplate.enum';
import { IAnswers } from 'src/interface/answers.interface';
import shellJs from 'shelljs';
import { EnumGitRepos } from 'src/enum/gitRepos.enum';
import path from 'path';
import fs from 'fs';

class GenerateController {
  public gen(answers: IAnswers) {
    try {
      switch (answers.tech) {
        case EnumChoicesBoilerplate.NODE_TS:
          shellJs.cd(path.resolve());
          shellJs.exec(
            `git clone ${EnumGitRepos.NODE_TS} ./${answers.projectName}`,
          );
          console.log('Boilerplate successfuly created');

          shellJs.exit(0);
        case EnumChoicesBoilerplate.WEBPACK:
          shellJs.cd(path.resolve());
          shellJs.exec(
            `git clone ${EnumGitRepos.WEBPACK} ./${answers.projectName}`,
          );
          console.log('Boilerplate successfuly created');
          shellJs.exit(0);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const GenFile = new GenerateController();
