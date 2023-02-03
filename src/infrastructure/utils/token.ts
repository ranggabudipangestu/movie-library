import jwt from "jsonwebtoken";

export interface IJwt {
  encode: (data: any) => string;
  decode: (token: string) => jwt.JwtPayload;
}

export default class Jwt implements IJwt {
  private secret: string = process.env.SECRET_KEY || 'secretKey';

  encode(data: any) {
    return jwt.sign(
      {
        data
      },
      this.secret,
      { expiresIn: "1h" }
    );
  }

  decode(token: string) {
    return jwt.verify(token, this.secret) as jwt.JwtPayload;
  }

  async validToken(token) {
    if (!token) throw new Error('UNAUTHORIZED')
    let verifiedJToken:any
    try {
      verifiedJToken = new Jwt().decode(token)
      
    } catch (err) {
      throw new Error('INVALID_TOKEN')
    }

    if(Number(verifiedJToken.exp) * 1000 < new Date().getTime()){
      throw new Error("TOKEN_EXPIRED")
    }
  }
}

