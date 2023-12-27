import { ActionFormData } from "@minecraft/server-ui"
import { DynamicPropertiesDefinition, MinecraftEntityTypes, world, Player, system } from "@minecraft/server"

let rulesForm = new ActionFormData()

rulesForm.title("Rules & Regulations")
rulesForm.body("Follow the Rules and Regulations:\n1.  No cheating,\n2.  Don't get AFK in games,\n3.  No teaming in solo games,\n4.  No spamming,\n5.  Don't use modified clients,\n6.  No racism,\n7.  No swearing,\n8.  Be respectful of others,\n\n9.  Help others,\n10. Find friends,\n11. Enjoy!\n\nIf you don't obey these Rules it will result many days of punishment.")
rulesForm.button("Accept")
rulesForm.button("Deny")

world.beforeEvents.itemUse.subscribe((events) => {
  const { itemStack, source } = events
  if (itemStack.typeId == "minecraft:diamond_sword") {
    if (!(source instanceof Player)) return
    events.cancel = true
    system.run(() => {
      rulesForm.show(source).then((events) => {
        const { selection } = events
        if (selection == 1) {
          source.runCommandAsync(`kick ${source.name} \"Not obeying the rules\"`)
        }
      })
    })
  }
})

/*
world.afterEvents.worldInitialize.subscribe((events) => {
  let def = new DynamicPropertiesDefinition();

  def.defineBool("hasAcceptedRules")
  events.propertyRegistry.registerEntityTypeDynamicProperties(def, MinecraftEntityTypes.player);
});

world.afterEvents.playerJoin.subscribe((events) => {
  
})*/