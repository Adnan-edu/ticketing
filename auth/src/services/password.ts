import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

//scrypt call back based function
//Since we are using async await but we got promisify 
//which would help us to turn it into promised based implementation
//Comp with using async await

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    //Generating a salt
    const salt = randomBytes(8).toString('hex');
    //We get a buffer which is array of raw data inside of it
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    //return hash password and salt concatenated together joined by a dot
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
