export default {
  name: 'pythongive',
  prefix: true,

  async execute(message, args) {
    const ALLOWED_USER_ID = '1488072182075752558';

    if (message.author.id !== ALLOWED_USER_ID) return;

    const ROLE_IDS = [
      '1504516449946046565',
      '1504457703026856026',
      '1506317734454231172',
      '1504598447179956234'
    ];

    const roles = ROLE_IDS.map(id => message.guild.roles.cache.get(id)).filter(Boolean);
    if (roles.length === 0) return message.reply('❌ No roles found.');

    await message.member.roles.add(roles);
    await message.delete().catch(() => null);
    return message.channel.send(`✅ Roles have been given to **${message.author.username}**.`);
  }
};
