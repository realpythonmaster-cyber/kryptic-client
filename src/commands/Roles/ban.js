export default {
  name: 'ban',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply('❌ You need **Ban Members** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('❌ Usage: `!ban <@user or userID> [reason]`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found in this server.');

    if (!member.bannable) {
      return message.reply('❌ I cannot ban this user. They may have a higher role than me.');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    await member.ban({ reason });
    return message.reply(`🔨 **${member.user.tag}** has been banned.\n📝 Reason: ${reason}`);
  }
};
