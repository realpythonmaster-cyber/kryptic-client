export default {
  name: 'removerole',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ You need **Manage Roles** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    const roleArg = args[1];
    if (!userId || !roleArg) return message.reply('❌ Usage: `!removerole <@user or userID> <roleID or role name>`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found.');

    const role = message.guild.roles.cache.get(roleArg) ||
      message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
    if (!role) return message.reply(`❌ Role **${roleArg}** not found.`);

    if (!member.roles.cache.has(role.id)) {
      return message.reply(`⚠️ ${member.user.tag} doesn't have the **${role.name}** role.`);
    }

    await member.roles.remove(role);
    return message.reply(`🔴 Removed **${role.name}** from **${member.user.tag}**.`);
  }
};
