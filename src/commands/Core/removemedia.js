import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removemedia')
    .setDescription('Remove the Media role from a user')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to remove Media role from').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('roleid').setDescription('Optional: specific role ID to remove instead of Media').setRequired(false)
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
    }

    if (!role || !target.roles.cache.has(role.id)) {
      return InteractionHelper.safeEditReply(interaction, {
        embeds: [createEmbed({ title: '⚠️ No Role', description: `${target.user.tag} doesn't have the **${role?.name || 'Media'}** role.`, color: 'warning' })]
      });
    }

    await target.roles.remove(role);
    return InteractionHelper.safeEditReply(interaction, {
      embeds: [createEmbed({
        title: '🔴 Role Removed',
        description: `**${target.user.tag}** has had the **${role.name}** role removed.`,
        color: 'error',
      })]
    });
  }
};
