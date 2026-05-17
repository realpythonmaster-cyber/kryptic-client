export default {
  name: 'giverole',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ You need **Manage Roles** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    const roleArg = args[1];
    if (!userId || !roleArg) return message.reply('❌ Usage: `!giverole <@user or userID> <roleID or role name>`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found.');

    // Try by ID first, then by name
    const role = message.guild.roles.cache.get(roleArg) ||
      message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
    if (!role) return message.reply(`❌ Role **${roleArg}** not found.`);

    await member.roles.add(role);
    return message.reply(`✅ Gave **${role.name}** to **${member.user.tag}**.`);
  }
};
