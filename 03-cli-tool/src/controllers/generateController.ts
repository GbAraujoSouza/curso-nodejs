import { EnumChoicesBoilerplate } from "src/enum/choices-boilerplate.enum";
import { IAnswers } from "src/interface/answers.interface";
import shellJs from 'shelljs';
import { EnumGitRepos } from "src/enum/gitRepos.enum";
import path from "path";

class GenerateController {
  public gen(answers: IAnswers) {
    try {
      switch (answers.tech) {
        case EnumChoicesBoilerplate.NODE_TS:
          shellJs.cd(path.resolve())
          shellJs.exec(`git clone ${EnumGitRepos.NODE_TS}`)          
          break;
        case EnumChoicesBoilerplate.SCSS:
          shellJs.cd(path.resolve())
          shellJs.exec(`git clone ${EnumGitRepos.SCSS}`)          
          break;
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const GenFile = new GenerateController(); 