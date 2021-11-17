const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretkey = "mihir";
const iv = crypto.randomBytes(16);
const key = crypto.createHash('sha256').update(String(secretkey)).digest('base64').substr(0, 32);

const encrypt = (token,res) => {
    const cipher = crypto.createCipheriv(algorithm,key,iv);
    const encrypted = Buffer.concat([cipher.update(token),cipher.final()]);
        return {
            'iv': iv.toString('hex'),
            'encryptedjwt': encrypted.toString('hex')
        }
}

const decrypt = async (token) => {

//    const tok = `${(token.split(' ')[1])}`;
    //console.log(tok);
    // console.log("token", token)
        var tok = token.slice(7);
        let realtoken = tok.replace(/'/g,'"');
        console.log(realtoken);
        var toke = JSON.parse(realtoken);
        console.log(toke);
        //console.log(`${realtoken}`);
        //console.log(JSON.parse('{\"iv\":\"e27a1197991a53a7e3186157723139f9\",\"encryptedjwt\":\"ba07866903ac64aebda737381403393c1abb870d3c2e7162f2eeaf6a2d0aa7ce0ed20c3d7c9889ded5651faea76dc8444f42f64c2eb8fdecc43ec5f0ec707c414fccf506a07c864a6f61f314136d1a4e46299dc84a0d21c7502811dc91308787fd939ef2578cd6fb6f41529f63a24102a3041aaa5b502766b6eaf4492f950280bd4f0bccc291b21e7e13a5fc7c587ac28dc5230904610e3f91b4e3dc811338846c8e96db3950f817f4e26f3725d4f7d5\"}'));
    //   console.log("1",tok[1][0]);
    // console.log(JSON.parse(JSON.stringify(tok[1])))
    // let newStr1 = tok[1].replace(/\\/g,'');
    // let newStr = newStr1.replace(/'/g,'');
    // console.log(newStr)
    //     console.log(tok[1]);
    //  var data = JSON.parse(JSON.stringify(newStr))
    //  console.log(data);
    // console.log(JSON.parse('{\"iv\":\"e27a1197991a53a7e3186157723139f9\",\"encryptedjwt\":\"ba07866903ac64aebda737381403393c1abb870d3c2e7162f2eeaf6a2d0aa7ce0ed20c3d7c9889ded5651faea76dc8444f42f64c2eb8fdecc43ec5f0ec707c414fccf506a07c864a6f61f314136d1a4e46299dc84a0d21c7502811dc91308787fd939ef2578cd6fb6f41529f63a24102a3041aaa5b502766b6eaf4492f950280bd4f0bccc291b21e7e13a5fc7c587ac28dc5230904610e3f91b4e3dc811338846c8e96db3950f817f4e26f3725d4f7d5\"}'));
    //console.log("mihir",Buffer.from(token.iv,'hex'));
    const decipher = crypto.createDecipheriv(algorithm,key,Buffer.from(token.iv,'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(token.encryptedjwt,'hex')),decipher.final()]);
    return decrypted.toString();
    }
     
module.exports = {encrypt,decrypt};