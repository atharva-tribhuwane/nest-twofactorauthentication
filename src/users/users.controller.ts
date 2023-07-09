import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { addUser } from './adduser.dto';
const speakeasy = require('speakeasy');
// import {speakeasy} from 'speakeasy';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('test')
    helloworld(@Req() req, @Res() res): any {
        return {message:"Hello world"};
    }

    @Post('addUser')
    async addUser(@Req() req, @Res() res, @Body() adduserdto:any):Promise<any>{
        try{
            const temp_secret = speakeasy.generateSecret();
            console.log('tempsec', temp_secret);
            let user = req.body;
    
            let temp = {...user,temp_secret};
    
            // return res.status(200).send(temp);
            let usser = await this.usersService.createUser(req,res,temp);
            return res.status(200).send(usser);
        }
        catch(err){
            res.status(500).send(err);
        }
    }

    @Post('verifyUser')
    async verifyUser(@Req() req, @Res() res, @Body() adduserdto:any):Promise<any>{
        try{
            let {userId, token} = req.body;
            let use = await this.usersService.verifyUser(req,res,{userId,token});
            return res.status(200).send(use);
        }
        catch(error){
            res.status(500).send(error);
        }
    }
}
