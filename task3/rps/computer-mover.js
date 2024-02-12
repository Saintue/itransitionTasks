import rng from 'randomnumbergenerator-js';
import crypto from 'crypto';
export class computerMover {
  static move(gameArr) {
    return rng(1, gameArr.length - 1);
  }
  static encryptMove(move) {
    const key = crypto.randomBytes(256).toString('base64');
    let encryptedMove = crypto
      .createHmac('sha3-256', key)
      .update(move.toString())
      .digest('hex');
    return [encryptedMove, key];
  }
}
