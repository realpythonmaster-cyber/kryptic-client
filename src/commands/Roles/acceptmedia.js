export default {
  name: 'acceptmedia',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ You need **Manage Roles** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('❌ Usage: `!acceptmedia <@user or userID>`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found in this server.');

    // Check if a role ID was provided, otherwise default to Media role
    const roleId = args[1];
    let role;

    if (roleId) {
      role = message.guild.roles.cache.get(roleId);
      if (!role) return message.reply(`❌ Role with ID **${roleId}** not found.`);
    } else {
      role = message.guild.roles.cache.find(r => r.name === 'Media');
      if (!role) {
        role = await message.guild.roles.create({
          name: 'Media',
          color: '#FF4655',
          reason: 'Kryptic Client Bot - Media role auto-created',
        });
      }
    }

    if (member.roles.cache.has(role.id)) {
      return message.reply(`⚠️ ${member.user.tag} already has the **${role.name}** role.`);
    }

    await member.roles.add(role);
    return message.reply(`✅ **${member.user.tag}** has been given the **${role.name}** role.`);
  }
};
