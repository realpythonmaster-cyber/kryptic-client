export default {
  name: 'unban',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply('❌ You need **Ban Members** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('❌ Usage: `!unban <userID>`');

    const reason = args.slice(1).join(' ') || 'No reason provided';

    const bannedUsers = await message.guild.bans.fetch();
    const bannedUser = bannedUsers.get(userId);

    if (!bannedUser) {
      return message.reply('❌ That user is not banned.');
    }

    await message.guild.members.unban(userId, reason);
    return message.reply(`✅ **${bannedUser.user.tag}** has been unbanned.\n📝 Reason: ${reason}`);
  }
};
