import { PermissionFlagsBits } from 'discord.js';

export default {
  name: 'acceptmedia',
  prefix: true,

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return message.reply('❌ You need **Manage Roles** permission to use this command.');
    }

    const userId = args[0]?.replace(/[<@!>]/g, '');
    if (!userId) return message.reply('❌ Usage: `!acceptmedia <@user or userID>`');

    const member = await message.guild.members.fetch(userId).catch(() => null);
    if (!member) return message.reply('❌ User not found in this server.');

    const DEFAULT_ROLE_ID = '1504482302493855764';
    const role = message.guild.roles.cache.get(DEFAULT_ROLE_ID);
    if (!role) return message.reply('❌ Default role not found. Please check the role ID.');

    if (member.roles.cache.has(role.id)) {
      return message.reply(`⚠️ ${member.user.tag} already has the **${role.name}** role.`);
    }

    await member.roles.add(role);
    return message.reply(`✅ **${member.user.tag}** has been given the **${role.name}** role.`);
  }
};
