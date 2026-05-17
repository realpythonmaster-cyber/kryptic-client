export default {
  name: 'media',
  prefix: true,

  async execute(message, args) {
    const allowedRoles = ["1504516449946046565", "1504457703026856026", "1504515609084297419", "1504515896130142469"];
    const blockedRoles = ["1504482302493855764", "1504517201158340658", "1504481754981859420", "1504876725530525807", "1504458859719299142"];

    const hasBlocked = message.member.roles.cache.some(r => blockedRoles.includes(r.id));
    const hasAllowed = message.member.roles.cache.some(r => allowedRoles.includes(r.id));

    if (hasBlocked || !hasAllowed) {
      return message.reply('❌ You do not have perms.');
    }

    await message.delete().catch(() => null);
    return message.channel.send(
      `Hello! Please send me your TikTok account link so I can review your content, editing quality, and overall engagement. You must already have previous Minecraft content posted on your account. Please only send your account if you are serious.`
    );
  }
};
