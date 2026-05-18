export default {
  name: 'buy',
  prefix: true,

  async execute(message, args) {
    const allowedRoles = ["1504516449946046565", "1504457703026856026", "1504515609084297419", "1504515896130142469"];
    const blockedRoles = ["1504482302493855764", "1504517201158340658", "1504481754981859420", "1504876725530525807", "1504458859719299142"];

    const hasAllowed = message.member.roles.cache.some(r => allowedRoles.includes(r.id));
    const hasBlocked = message.member.roles.cache.some(r => blockedRoles.includes(r.id));

    if (!hasAllowed || hasBlocked) {
      await message.delete().catch(() => null);
      return message.author.send('❌ You do not have perms to use this command.').catch(() => null);
    }

    await message.delete().catch(() => null);
    return message.channel.send(
      `Interested in purchasing Platinum Client? It supports Fabric 1.21.1 and works on Windows & Linux with multiple launchers including Minecraft Launcher, Modrinth App, and Feather Client. Monthly and Lifetime plans are available, and we accept PayPal, LTC, and Donut SMP Money ( 700M )`
    );
  }
};
