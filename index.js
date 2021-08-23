const Discord = require('discord.js')
const bot = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const moment = require('moment')
const db = require('quick.db')
require('discord-reply')
const fs = require('fs')
const disbut = require('discord-buttons');
let Enmap = require("enmap")
let canvacord = require("canvacord")
bot.points = new Enmap({ name: "points" })
const express = require("express");
const app = express();
const enmap = require('enmap');
const fetch = require("node-fetch");



bot.login('ODY5NjU5MTQ3MTQwOTkzMTM1.YQBbMg.Unmk_eRRk_OJZczQiim7i6KUEtA')

const prefix = "-"

bot.on('ready',() => {
    console.log("Online")
});

bot.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "help") {
        message.reply('Hi Me')
    }
});

// USER

bot.on("message", message=>{
    if(message.content.startsWith(prefix+"user")){
    var userr = message.mentions.users.first() || message.author;
    var memberr = message.mentions.members.first() || message.member;
    let userinfo = userr.displayAvatarURL({ size: 2048 , dynamic: true });
    let embed = new Discord.MessageEmbed()
    . setColor("BLACK")
    .setAuthor(userr.username,userr.avatarURL({dynamic:true}))
    .setThumbnail(userinfo)
    .addField(`Joind Discord :`,`\`${moment(userr.createdAt).format('YYYY/M/D')} ${moment(userr.createdAt).format('LTS')}\`\n**${moment(userr.createdAt, "YYYYMMDD").fromNow()}**`,true)
    .addField(`Joined Server :`,`\`${moment(memberr.joinedAt).format('YYYY/M/D')} ${moment(memberr.joinedAt).format('LTS')}\`\n**${moment(memberr.joinedAt, "YYYYMMDD").fromNow()}**`,true)
  .setFooter(userr.tag,userr.avatarURL({dynamic:true}))
    message.channel.send(embed)
    }
  })

// ----------------------------------------

// Feeling

    bot.on('message',message => {
        if(message.content.startsWith(prefix + 'set-channel')){
     const args = message.content.split(" ").slice(1).join(' ');
let ch = message.mentions.channels.first()||message.guild.channels.cache.filter(c=> c.type == 'text').get(args);
if(!ch)return message.channel.send(`872836561367072798`);
db.set(`ch_${message.guild.id}`,ch.id);
    message.channel.send('Done')
        }})

bot.on("message", async message => {
  if(message.channel.type == "dm") return;
  if(message.author.bot)return;
  let data = db.fetch(`ch_${message.guild.id}`);
  if(data){
    if(message.channel.id !== data)return;
message.delete();
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, 
message.author.displayAvatarURL({dynamic:true}))
.setDescription(message.content)
.setColor('#d1d1d1')
.setThumbnail(message.author.avatarURL({dynamic:true}))
message.channel.send(embed).then(e=>{
  e.react(`❤`)
})
  }
})

// ----------------------------------------

// Warning 

bot.on("message", async message => {
    if (message.content.startsWith(prefix + "warn")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        var user = message.mentions.members.first()
        if (!user) return message.reply(`منشن شخص`)
        var warnmsg = message.content.split(" ").slice(2).join(" ").trim()
        if (!warnmsg) return message.reply("اكتب التحذير")
        let data = db.fetch(`warns_${message.guild.id}_${user.id}`)
        if (data === null) {
            await db.set(`warns_${message.guild.id}_${user.id}`, [`${warnmsg}`])
        } else {
            await db.push(`warns_${message.guild.id}_${user.id}`, `${warnmsg}`)
        }
        message.channel.send("تم التحذير")
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
            .setColor("RED")
            .setDescription(` تم تحذيرك السبب : **${warnmsg}**`)
            .setFooter(message.guild.name, message.guild.iconURL())
        user.send(embed).catch(err => messsage.channel.send(`\`\`\`Error\n${err}\`\`\``))
 
    }
})

bot.on("message", message => {
    if (message.content.startsWith(prefix + "removewarn")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        var user = message.mentions.members.first()
        if (!user) return message.reply(`منشن شخص`)
        db.delete(`warns_${message.guild.id}_${user.id}`)
        message.channel.send("تم نزع التحذيرات")
    }
})

bot.on("message", message => {
    if (message.content.startsWith(prefix + "showwarns")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        var user = message.mentions.members.first()
        if (!user) return message.reply(`منشن شخص`)
        let data = db.get(`warns_${message.guild.id}_${user.id}`)
        if (data === null) {
            return message.reply("لا توجد اي تحذيرات")
        }
 
        let counter = 1
        let warns = data.map(d => `\`${counter++}-${d}\`\n\n`)
 
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true })).setDescription(`${warns}`)
        message.channel.send(embed)
    }
})

// ----------------------------------------


// اي شخص يدخل البوت يغير النيكنيم حقة

// bot.on('guildMemberAdd', message => {
//    if (message.guild.id === "752862655538003979")//ايدي سيرفرك
//    {
//     let user = message.author;
//    message.setNickname(` Gamer - ${message.user.username} `);
//    }
// });    

// ----------------------------------------


// يقعد في روم 24 ساعة

//setInterval(() => {
//   const channelid = "872845747215798313" //ايدي الروم
//   const channel = bot.channels.cache.get(channelid);
//   if (!channel) return
//   channel.join()
// }, 1000);
  
// ----------------------------------------


// -avatar 

bot.on('message', message =>{
    
    if(message.content.startsWith(prefix + 'avatar')){
        let args = message.content.substring(prefix.length).split(" ");
        
        const user = message.mentions.users.first()
        if (!user && !args[1]) {
           
           const uavatar = message.author.avatarURL({ size: 4096, dynamic: true })
           const embed3 = new Discord.MessageEmbed()
               .setTitle(`${message.member.user.username} avatar`)
               .setDescription(`[Avatar URL of **${message.member.user.username}**](${uavatar})`)
               .setColor('BLACK')
               .setImage(uavatar)
           message.channel.send(embed3)
       } 
      


       if (args[1] === 'server') {
        
        const savatar = message.guild.iconURL({ size: 4096, dynamic: true })
        const embed2 = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} avatar`)
            .setDescription(`[Avatar URL of **${message.guild.name}**](${savatar})`)
            .setColor('BLACK')
            .setImage(savatar)
        message.channel.send(embed2)
       
       }
       
               
               
       
               if (user) {
                   const avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
       
       
                   const embed = new Discord.MessageEmbed()
                       .setTitle(`${user.username} avatar`)
                       .setDescription(`[Avatar URL of **${user.username}**](${avatar})`)
                       .setColor('BLACK')
                       .setImage(avatar)
                   message.channel.send(embed)
               }
       }
  })

// ----------------------------------------

// Anti Links

bot.on("message", async message => {
    if (message.content.includes("https://") || message.content.includes("http://") || message.content.includes("discord.gg")) {
      if(message.member.hasPermission("ADMINISTRATOR")) return;
      if (!message.channel.guild) return;
  if (message.channel.guild === "أيدي الروم") return;
   message.author.send("⚠️ **`تحذير شفهي لك السبب : نشر روابط`**");
      message.delete();
    }
  });
  
// ----------------------------------------

// يمسح الكلام كل 5 دقايق

 
// ----------------------------------------

//  welcome command

bot.on('message', message => {
  if(message.content.startsWith(prefix + "sc")){
    if(!message.guild) return;
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Dont Have Prems \`MANAGE_GUILD\`**')
    let ch = message.mentions.channels.first()
    if(!ch) return message.channel.send('**Please Mention This Room**')
    db.set(`ch-${message.guild.id}`, ch)
    message.channel.send(`**Done Select This Room ${ch}**`)

bot.on("guildMemberAdd", m => {
 let embed = new Discord.MessageEmbed()
  .setColor('WHITE')
  .setTitle('**New Member. **')
  .setDescription(`**
   Member: ${m}
   Count: ${m.guild.memberCount} **`)
  .setFooter(`${m.guild.name}`, m.guild.iconURL({ dynamic: true }))
  .setTimestamp()
  ch.send(embed)
});

      }
})

// ----------------------------------------


// Clear Chat

bot.on("message",async message =>{
  let command = message.content.toLowerCase().split(" ")[0];
      command = command.slice(prefix.length);
  if (command == "clear" || command == "مسح") { 
  message.delete({timeout: 0})
      if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
       if(!message.guild.member(bot.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);
   
      let args = message.content.split(" ").slice(1)
      let messagecount = parseInt(args);
      if (args > 100) return message.channel.send(`\`\`\`javascript
  i cant delete more than 100 messages 
  \`\`\``).then(messages => messages.delete(5000))
  if(!messagecount) messagecount = '50';
      message.channel.messages.fetch({limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
      message.channel.send(`\`\`\`js
  ${msgs.size} messages cleared
  \`\`\``).then(messages => 
  messages.delete({timeout:5000}));
      })
    }    
  });
  
// ----------------------------------------


// التقديم على الادارة

let roomid = "873178125587075125";
bot.on("message", message => { 
  if(message.content.startsWith(prefix + "admin")) {
 
        if(!message.channel.guild) return;
                if(message.author.bot) return;
        let channel = bot.channels.cache.get(roomid);
            if(channel) {
            message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
              m.edit(`**<@${message.author.id}> Name | اسمك **`)
              m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m1) => {
                  m1 = m1.first();
                  var name = m1.content;
                  m1.delete();
                  m.edit(`**Loading | جاري التحميل**`).then( (m) =>{
                      m.edit(`**<@${message.author.id}> Age|عمرك**`)
                      setTimeout(() => {
                        m.delete()
                      }, 10000);
                      m.channel.awaitMessages( m2 => m2.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m2) => {
                          m2 = m2.first();
                          var age = m2.content;
                          m2.delete()
                          message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
                            m.edit(`***<@${message.author.id}>  Account Age|عمر حسابك في الديسكورد**`)
                            setTimeout(() => {
                              m.delete()
                            }, 10000);
                            m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m3) => {
                                m3 = m3.first();
                                var ask = m3.content;
                                m3.delete();
                                message.channel.send(`**Loading | جاري التحميل**`).then( (m) =>{
                                  m.edit(`***<@${message.author.id}>  you agree to the rules of the staff | هل ستوافق علئ قانون السيرفر**`)
                                  setTimeout(() => {
                                    m.delete()
                                  }, 10000);
                                  m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m4) => {
                                      m4 = m4.first();
                                      var ask2 = m4.content;
                                      m4.delete();
                                      message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
                                        m.edit(`***<@${message.author.id}> Duration of your reaction | مدة تفاعلك **`)
                                        m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m5) => {
                                            m5 = m5.first();
                                            var ask3 = m5.content;
                                            m5.delete();
                      m.edit(`** *<@${message.author.id}> تم ارسال تقديمك سيتم الرد عليك قريبا **`).then( (mtime)=>{
                        setTimeout(() => {
                          let embed = new Discord.MessageEmbed()
                          .setAuthor(message.author.username, message.author.avatarURL()) 
                          .setColor('#c3cdff')
                        .setTitle(`\`Apply Administartion\` \n سوف يتم الرد عليك قريبا من الادارة , \n > ID: <@${message.author.id}>`)
                        .addField('> \`اسمك:\`', ` ** ${name} ** ` , true)
                        .addField('> \`عمرك:\`', ` ** ${age} ** ` , true)
                        .addField('> \`كم لك في البي سي:\`',`** ${ask} ** ` , true)
                        .addField('> \`هل تعرف القوانين:\` ',` ** ${ask2} ** ` , true)
                        .addField('> \`ساعات تواجدك: ?\`',` ** ${ask3} ** ` , true)
                        .addField('> حسابك انشأ :',` \`${message.author.createdAt} \` ` , true)
                        channel.send(embed)
                        }, 2500);
                        setTimeout(() => {
                          mtime.delete()
                        }, 3000);
 
                  })
                })
                })
              })
            })
          })
        })
        })
              })
          })
        })
    }
}
        });

// ----------------------------------------


// تقديم المبرمجين

let romid = "874359018993381456";
bot.on("message", message => { 
  if(message.content.startsWith(prefix + "dev")) {
 
        if(!message.channel.guild) return;
                if(message.author.bot) return;
        let channel = bot.channels.cache.get(romid);
            if(channel) {
            message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
              m.edit(`**<@${message.author.id}> Name | اسمك **`)
              m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m1) => {
                  m1 = m1.first();
                  var name = m1.content;
                  m1.delete();
                  m.edit(`**Loading | جاري التحميل**`).then( (m) =>{
                      m.edit(`**<@${message.author.id}> Age|عمرك**`)
                      setTimeout(() => {
                        m.delete()
                      }, 10000);
                      m.channel.awaitMessages( m2 => m2.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m2) => {
                          m2 = m2.first();
                          var age = m2.content;
                          m2.delete()
                          message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
                            m.edit(`***<@${message.author.id}> What are your experiences in Discord ? | ايش خبراتك البرمجية ؟**`)
                            setTimeout(() => {
                              m.delete()
                            }, 10000);
                            m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m3) => {
                                m3 = m3.first();
                                var ask = m3.content;
                                m3.delete();
                                message.channel.send(`**Loading | جاري التحميل**`).then( (m) =>{
                                  m.edit(`***<@${message.author.id}>  What will help us? | ايش راح تفيدنا ؟**`)
                                  setTimeout(() => {
                                    m.delete()
                                  }, 10000);
                                  m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m4) => {
                                      m4 = m4.first();
                                      var ask2 = m4.content;
                                      m4.delete();
                                      message.channel.send(`**Loading | جاري التحميل **`).then( (m) =>{
                                        m.edit(`***<@${message.author.id}> Duration of your reaction | مدة تفاعلك **`)
                                        m.channel.awaitMessages( m1 => m1.author == message.author,{ max: 1, time: 60*1000 } ).then ( (m5) => {
                                            m5 = m5.first();
                                            var ask3 = m5.content;
                                            m5.delete();
                      m.edit(`** *<@${message.author.id}> تم ارسال تقديمك سيتم الرد عليك قريبا **`).then( (mtime)=>{
                        setTimeout(() => {
                          let embed = new Discord.MessageEmbed()
                          .setAuthor(message.author.username, message.author.avatarURL()) 
                          .setColor('#c3cdff')
                        .setTitle(`\`Apply Administartion\` \n سوف يتم الرد عليك قريبا من الادارة , \n > ID: <@${message.author.id}>`)
                        .addField('> \`اسمك:\`', ` ** ${name} ** ` , true)
                        .addField('> \`عمرك:\`', ` ** ${age} ** ` , true)
                        .addField('> \`خبراته في البرمجة :\`',`** ${ask} ** ` , true)
                        .addField('> \`راح تفيدنا :\` ',` ** ${ask2} ** ` , true)
                        .addField('> \`ساعات تواجدك: ?\`',` ** ${ask3} ** ` , true)
                        .addField('> حسابك انشأ :',` \`${message.author.createdAt} \` ` , true)
                        channel.send(embed)
                        }, 2500);
                        setTimeout(() => {
                          mtime.delete()
                        }, 3000);
 
                  })
                })
                })
              })
            })
          })
        })
        })
              })
          })
        })
    }
}
        });

// ----------------------------------------


// login

bot.on("message", seez =>{
    if(seez.content === "login") {
        const embed = new Discord.MessageEmbed()
        .setTitle('**تم تسجيل دخولك**')
        .setColor('#03ff46')
        .setTimestamp()
        seez.lineReply(embed)
    }
});

// ----------------------------------------


// logout

bot.on("message", seez =>{
    if(seez.content === "logout") {
        const embed = new Discord.MessageEmbed()
        .setTitle('**تم تسجيل خروجك**')
        .setColor('#FF0000')
        .setTimestamp()
        seez.lineReply(embed)
    }
});

// ----------------------------------------

// rank + top

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type === `dm`) return;

  const key = `${message.guild.id}-${message.author.id}`;
  bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 1
  });

  var msgl = message.content.length / (Math.floor(Math.random() * (message.content.length - message.content.length / 100 + 1) + 100));

  if (msgl < 10) {
 
    var randomnum = Math.floor((Math.random() * 1) * 1) / 100

    bot.points.math(key, `+`, randomnum, `points`)
    bot.points.inc(key, `points`);
  }

  else {
  
    var randomnum = 1 + Math.floor(msgl * 20) / 100
   
    bot.points.math(key, `+`, randomnum, `points`)
    bot.points.inc(key, `points`);
  }
  
  const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, `points`)));

  if (bot.points.get(key, `level`) < curLevel) {

    const embed = new Discord.MessageEmbed()
      .setTitle(`Ranking of:  ${message.author.username}`)
      .setTimestamp(`https://media.discordapp.net/attachments/756329106953601225/796545377212956682/5221_MEE6_LEVLEUP.gif`)
      .setDescription(`You've leveled up to Level: **\`${curLevel}\`**! (Points: \`${Math.floor(bot.points.get(key, `points`) * 100) / 100}\`) `)
      .setColor("GREEN");
  
    message.channel.send(`<@` + message.author.id + `>`);
    message.channel.send(embed);

    bot.points.set(key, curLevel, `level`);
  }

  if (message.content.toLowerCase().startsWith(prefix + `rank`)) {
    console.error(` By Oliver ! `)
    let rankuser = message.mentions.users.first() || message.author;
    bot.points.ensure(`${message.guild.id}-${rankuser.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, message.guild.memberCount);
    let i = 0;
  
    for (const data of top10) {
      await delay(15);
      try {
        i++;
        if (bot.users.cache.get(data.user).tag === rankuser.tag) break;
      } catch {
        i = `Error counting Rank`;
        break;
      }
    }
    const key = `${message.guild.id}-${rankuser.id}`;

    let curpoints = Number(bot.points.get(key, `points`).toFixed(2));
   
    let curnextlevel = Number(((Number(1) + Number(bot.points.get(key, `level`).toFixed(2))) * Number(10)) * (( Number(1) + Number(bot.points.get(key, `level`).toFixed(2))) * Number(10)));
  
    if (bot.points.get(key, `level`) === undefined) i = `No Rank`;
   
    let tempmsg = await message.channel.send(
      new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Loding...","https://media.discordapp.net/attachments/756329106953601225/796545377212956682/5221_MEE6_LEVLEUP.gif"))

    let color;
    let x = ["dnd","idle","online","streaming"]
    let x3 = Math.floor(Math.random() * x.length);
    const rank = new canvacord.Rank()
      .setAvatar(rankuser.displayAvatarURL({ dynamic: false, format: 'png' }))
      .setCurrentXP(Number(curpoints.toFixed(4)), "#EFFBFB")
      .setRequiredXP(Number(curnextlevel.toFixed(2)),"#585858")
      .setStatus(`${x[x3]}`, true, 7)
      .renderEmojis(true)
      .setProgressBar("#2EFEF7")
      .setRankColor("#EFFBFB")
      .setLevelColor("#EFFBFB")
      .setUsername(rankuser.username, "#EFFBFB")
      .setRank(Number(i), "Rank", true)
      .setLevel(Number(bot.points.get(key, `level`)), "LEVEL", true)
      .setDiscriminator(rankuser.discriminator, color)
    rank.build()
      .then(async data => {
    
        const attachment = new Discord.MessageAttachment(data, "NiroCard.png");
        
        const embed = new Discord.MessageEmbed()
          .setTitle(`Ranking of:  ${rankuser.username}`)
          .setColor("#2EFEF7")
          .setImage("attachment://NiroCard.png")
          .attachFiles(attachment)
      
        await message.channel.send(embed);
       
        await tempmsg.delete();
        return;
      });
  }
  if (message.content.toLowerCase() === `${prefix}top`) {
    
    const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, 10);
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}: Leaderboard`)
      .setTimestamp()
      .setDescription(`Top 10 Ranking:`)
      .setColor("ORANGE");
    
    let i = 0;
    
    for (const data of top10) {
      await delay(15); try {
        i++;
        embed.addField(`**${i}**. ${bot.users.cache.get(data.user).tag}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
      } catch {
        i++; 
        embed.addField(`**${i}**. ${bot.users.cache.get(data.user)}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
      }
    }
    
    return message.channel.send(embed);
  }
      if (message.content.toLowerCase() === `${prefix}ranklklklk`) {
 message.channel.send( new Discord.MessageEmbed().setDescription(`**\`\`\`
- Bot Orders

- ${prefix}rank
- ${prefix}top
- ${prefix}uptime
\`\`\`**`).setFooter(`${bot.user.username} is ready to ranking you

# - NّIّROّ DّّّّّEVّّّّّّّEّّّLّOّMEّّّNّTّّّ`).setImage(`https://media.discordapp.net/attachments/756329106953601225/796545377212956682/5221_MEE6_LEVLEUP.gif`))
  }
})
function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

// ----------------------------------------


// Youtupe

bot.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.indexOf(prefix) != 0) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

if (command === "yt" || command === "يوتيوب" || command === "youtube" || command === "Youtube") {
const chn = message.member.voice.channel
const channel = message.member.voice.channelID;
if (!chn) return message.channel.send("**عليك دخول روم صوتي اولاً**");
if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(`**لا امتلك صلاحية \`Create Invite\`**`) 

fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
method: "POST",
body: JSON.stringify({
max_age: 3600, // نظام الدقائق , يعني 86400 = يوم كامل
max_uses: 0, // عدد القادرين على دخول البث
target_application_id: "755600276941176913", // لا تغيره ما راح يشتغل اليوتيوب بدونه
target_type: 2, // خليه مثل ما هو
temporary: false, // (هذا مؤقت للبث) خليه مثل ما هو
validate: null // خليه مثل ما هو ما يحتاج تغيره ابداً
}),
 headers: {
 "Authorization": `Bot ${bot.token}`, // خليه مثل ما هو لا  تغيره
 "Content-Type": "application/json" // خليه مثل ما هو لا  تغيره
}
})
 .then(json => json.json())
 .then(link => {
  if (link.error || !link.code) return message.channel.send("**هُناك خطأ**");
   const embedy  = {
   fields: {
   name: 'YouTube Broadcast',
   value: `[اضغط هنا](https://discord.gg/${link.code})`
  }
 }
message.channel.send({ embed: embedy });
})
 .catch((err) => {
  message.channel.send(`**هُناك مشكلة عليك اصلاحها**`); 
  console.log(err)
 })
}
});

// ----------------------------------------


