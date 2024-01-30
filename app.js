const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        headless: true,  //put false if you want to see the browser while running test
    },
    authStrategy: new LocalAuth()
});

console.log("working..");
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true});
});
let chats;
client.on('ready', async () => {
    console.log('Client is ready!');
    chats = await client.getChats();
    console.log(chats);
    let inter = setInterval(()=>{
        client.sendMessage(chats[0].id._serialized,`Your number: +${chats[0].id.user}`);
        setTimeout(() => {
            clearInterval(inter);
        }, 4000);
    },3000)
});
client.on('message', async message => {
    console.log(message);
    if(message.body === 'Hi') {
     message.reply('Hello! How are you?');
    }
   });
client.initialize();
