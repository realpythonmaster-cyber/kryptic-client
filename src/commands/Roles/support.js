export default {
  name: 'support',
  prefix: true,

  async execute(message, args) {
    await message.delete().catch(() => null);
    return message.channel.send(
      `Hello! Please explain your issue in detail and include any important information or screenshots if needed. I'll review everything and help you as soon as possible. Please be patient while waiting for a response.`
    );
  }
};
