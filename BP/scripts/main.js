import "./watchdog.js"
import "./spells/leap.js"
import { system, world, Player } from "@minecraft/server"

const { fromCodePoint } = String

system.runInterval(() => {
  const players = world.getAllPlayers()
  for (const player of players) {
    if (!(player instanceof Player)) return
    const health = player.getComponent("health")
    entity.nameTag = `${entity.typeId}\n${Math.round(health.current)} ${fromCodePoint(0xE108)}`
  }
})

world.beforeEvents.chatSend.subscribe((event) => {
  const { message, sender } = event
  event.cancel = true;
  if (sender.hasTag("owner")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§gOwner§r] ${sender.name} §l>>§r ${message}"}]}`)
  } else if (sender.hasTag("admin")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§cAdmin§r] ${sender.name} §l>>§r ${message}"}]}`)
  } else if (sender.hasTag("mod")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§aMod§r] ${sender.name} §l>>§r ${message}"}]}`)
  } else if (!sender.hasTag("owner" || "admin" || "mod")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§7Player§r] ${sender.name} §l>>§r ${message}"}]}`)
  }
})
