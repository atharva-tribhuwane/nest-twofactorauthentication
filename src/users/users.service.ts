import { Injectable } from '@nestjs/common';
import { UsersSchema } from './users.model';
import { Users, UsersDocument } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
const speakeasy = require('speakeasy');
@Injectable()
export class UsersService {
    constructor(
        @InjectModel('users') private readonly usersModel: Model<UsersDocument>
    ) { }

    async createUser(req, res, user): Promise<Users | string> {
        let use = await this.usersModel.find({ email: "abcd@email.com" });
        console.log(user);
        let usser = await this.usersModel.create(user);
        // const newUser = new this.usersModel(user);
        // newUser.save();
        console.log('userrr', usser);
        return user;
    }

    async verifyUser(req, res, body): Promise<any> {
        let user = await this.usersModel.find({ _id: body.userId });
        // console.log('ussserrrr',user[0].temp_secret);
        const { base32: secret } = user[0].temp_secret;
        let token = body.token;
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });

       if(verified){
        // await this.usersModel.findOneAndUpdate()
        return ({ verified: true });
       }
       else{
        return ({ verified: false });
       }
    }
}
