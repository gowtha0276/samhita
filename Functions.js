const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/samhita', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});
const User = require('./models/user');
const sgMail=require('./signup_mail_sender')



var p_id = undefined;



function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



class myobject {


    async getdata() {
        const randomnumber = getRandom(1000, 9999)
        var user = await User.findOne({
            'userid': randomnumber
        });
        if (user) {
            return this.getdata();
        }
        return randomnumber
    }

    async checkuser(mail,phonenum) {
        var emailcheck = await User.countDocuments({
            'email': mail
        });
        var phonecheck = await User.countDocuments({
            'phone': phonenum
        });
        if (emailcheck > 0 || phonecheck > 0)
            return 0;
        return 1;
    }

    async getid() {
        var data = await this.getdata();
        return data
    }

    
    async update(p_name,mail,phonenum,p_college,p_password) {
        
        if (await this.checkuser(mail,phonenum) == 0) {
            return 0;
        }
        p_id = await this.getid()
        const me = new User({
            userid: p_id,
            name: p_name,
            email: mail,
            phone: phonenum,
            college: p_college,
            password: p_password
        })
        await me.save()
        
        await sgMail.send({
        to: mail,
        from: 'gowtha0276bin@gmail.com',
        subject: 'Samhita',
        text: 'You successfully registered for the event'
        })

        return 1;
    }


    async checkloginuser(mail,p_password) {
        
        var emailcheck = await User.findOne({
            'email': mail
        });
        
        if (emailcheck)
           {
                const passwordindb=emailcheck.password;
                if(passwordindb!=p_password)
                    return 0;
                return 1;
           } 
        return 0;
    }
}

module.exports=myobject





















// let myObj=new myobject()
// async function a() {
//     if (await myObj.checkloginuser('gowtha0276bin@gmail.com','ssd') == 1)
//         console.log("suc")
//     else
//         console.log("fai")
// }
// a();






















