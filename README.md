# minecraft-homebridge
Hooking [ScriptCraft](https://github.com/walterhiggins/ScriptCraft) to [homebridge](https://github.com/nfarina/homebridge), using [homebridge-http-webhooks](https://github.com/benzman81/homebridge-http-webhooks).

# Installation & Use
1. Install [homebridge](https://github.com/nfarina/homebridge) and [homebridge-http-webhooks](https://github.com/benzman81/homebridge-http-webhooks) and make sure it works all fine and dandy. This isn't terribly difficult with `npm` on Linux.
2. Install [ScriptCraft](https://github.com/walterhiggins/ScriptCraft) *not* using Canary.
3. Merge the `/.homebridge/config.json` file with your own. You'll need to change the IPs listed on each webhook to your homebridge server's own local IP.
4. Merge the `/scriptcraft/plugins` folder with your own. You'll also need to change the IPs and switch IDs in `webhook.js`.
5. Join your server. Check `webhook.js` for the command format and usage. Have fun.

# Known Issues / Shortcomings
- The links aren't saved if you shut down the Minecraft server.
- When the switch changes state, the redstone signal doesn't update unless you manually trigger a block update; you can do this by setting up a small logical redstone clock on the other side of the block to trigger an update every clock cycle.
- The command format kind of sucks.
- This readme kind of sucks.
- Because I only set this up for switches, you need to say weird things like 'Turn on the Front Door.' Kind of funny, though.
- I tested this on Minecraft / ScriptCraft 1.10.2, and I'm not going to guarantee it works on anything else.

# I know I just listed a bunch of shortcomings but here's why it doesn't suck
- Dude, holy crap, you can control your Minecraft house with HomeKit.
- That's so cool, I'm making a second bullet point just for it.
- Actually, you can control any redstone circuit, all with the same command format.
- Super lightweight.
- Probably going to address some of the issues in the future, so it'll suck less. Look forward to that.
