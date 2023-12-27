import "./watchdog.js"
//import "./rulesandregulations.js"
import "./spells/spells.js"
import "./lobby.js"
import { Team } from "./team.js"
import { system, world, Player } from "@minecraft/server"

const { fromCodePoint } = String

system.runInterval(() => {
  const players = world.getPlayers()
  for (const player of players) {
    if (!(player instanceof Player)) return
    const health = player.getComponent("health")
    player.nameTag = `${player.name}\n${Math.round(health.value)} ${fromCodePoint(0xE108)}`
  }
})

world.beforeEvents.chatSend.subscribe((event) => {
  const { message, sender } = event
  event.cancel = true;
  var team = new Team("team")
  system.run(() => team.addMember(sender))
  if (sender.hasTag("owner")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§gOwner§r] ${sender.name} >> ${message}"}]}`)
  } else if (sender.hasTag("admin")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§cAdmin§r] ${sender.name} >> ${message}"}]}`)
  } else if (sender.hasTag("mod")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§aMod§r] ${sender.name} >> ${message}"}]}`)
  } else if (!sender.hasTag("owner" || "admin" || "mod")) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§7Player§r] ${sender.name} >> ${message}"}]}`)
  }
})