import bcrypt from "bcrypt";

export interface IHashing {
  compare: (text: String, hash: String) => Promise<boolean>;
  hash: (text: String) => String;
}

export default class Hash implements IHashing {
  async compare(text: String, hash: String) {
    const isSame = await bcrypt.compare(text, hash);
    return isSame;
  }
  hash(text: String) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS) || 10);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
  }
}
