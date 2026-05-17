import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName('acceptmedia')
    .setDescription('Give the Media role to a user')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to give Media role to').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('roleid').setDescription('Optional: specific role ID to give instead of Media').setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    await InteractionHelper.safeDefer(interaction, { ephemeral: false });
    const target = interaction.options.getMember('user');
    const roleId = interaction.options.getString('roleid');

    if (!target) {
      return InteractionHelper.safeEditReply(interaction, {
        embeds: [createEmbed({ title: '❌ Error', description: 'User not found in this server.', color: 'error' })]
      });
    }

    let role;
    if (roleId) {
      role = interaction.guild.roles.cache.get(roleId);
      if (!role) return InteractionHelper.safeEditReply(interaction, {
        embeds: [createEmbed({ title: '❌ Error', description: `Role with ID **${roleId}** not found.`, color: 'error' })]
      });
    } else {
      role = interaction.guild.roles.cache.find(r => r.name === 'Media');
      if (!role) {
        role = await interaction.guild.roles.create({
          name: 'Media',
          color: '#FF4655',
          reason: 'Kryptic Client Bot - Media role auto-created',
        });
      }
    }

    if (target.roles.cache.has(role.id)) {
      return InteractionHelper.safeEditReply(interaction, {
        embeds: [createEmbed({ title: '⚠️ Already Has Role', description: `${target.user.tag} already has the **${role.name}** role.`, color: 'warning' })]
      });
    }

    await target.roles.add(role);
    return InteractionHelper.safeEditReply(interaction, {
      embeds: [createEmbed({
        title: '✅ Role Granted',
        description: `**${target.user.tag}** has been given the **${role.name}** role.`,
        color: 'success',
        thumbnail: target.user.displayAvatarURL(),
      })]
    });
  }
};
