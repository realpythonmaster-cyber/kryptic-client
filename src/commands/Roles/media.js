export default {
  name: 'media',
  prefix: true,

  async execute(message, args) {
    await message.delete().catch(() => null);
    return message.channel.send(
      `Hello! Please send me your TikTok account link so I can review your content, editing quality, and overall engagement. You must already have previous Minecraft content posted on your account. Please only send your account if you are serious.`
    );
  }
};
