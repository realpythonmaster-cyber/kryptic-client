export default {
  name: 'removemedia',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ You need **Manage Roles** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('❌ Usage: `!removemedia <@user or userID>`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found in this server.');

    const roleId = args[1];
    let role;

    if (roleId) {
      role = message.guild.roles.cache.get(roleId);
      if (!role) return message.reply(`❌ Role with ID **${roleId}** not found.`);
    } else {
      role = message.guild.roles.cache.find(r => r.name === 'Media');
    }

    if (!role || !member.roles.cache.has(role.id)) {
      return message.reply(`⚠️ ${member.user.tag} doesn't have the **${role?.name || 'Media'}** role.`);
    }

    await member.roles.remove(role);
    return message.reply(`🔴 **${member.user.tag}** has had the **${role.name}** role removed.`);
  }
};
