import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const PREFIX = '!';
const prefixCommands = new Map();

// Load all prefix commands from commands/Roles
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rolesPath = path.join(__dirname, '../commands/Roles');

try {
  const files = readdirSync(rolesPath).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(rolesPath, file)).href);
    const cmd = mod.default;
    if (cmd?.name) prefixCommands.set(cmd.name, cmd);
  }
  logger.info(`Loaded ${prefixCommands.size} prefix commands`);
} catch (err) {
  logger.error('Failed to load prefix commands:', err);
}

export default {
  name: Events.MessageCreate,
  async execute(message, client) {
    try {
      if (message.author.bot || !message.guild) return;

      // Handle prefix commands
      if (message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = prefixCommands.get(commandName);
        if (command) {
          try {
            await command.execute(message, args, client);
          } catch (err) {
            logger.error(`Error executing prefix command ${commandName}:`, err);
            message.reply('❌ An error occurred while running that command.');
          }
        }
      }
    } catch (error) {
      logger.error('Error in messageCreate event:', error);
    }
  }
};
