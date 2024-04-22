export class ChengYu {
  word: string;
  pinyin: string[];
  initials: string[];
  finals: string[];
  finalsToneless: string[];

  constructor(word: string, pinyin: string[], initials: string[], finals: string[], finalsToneless: string[]) {
    this.word = word;
    this.pinyin = pinyin;
    this.initials = initials;
    this.finals = finals;
    this.finalsToneless = finalsToneless;
  }
}
