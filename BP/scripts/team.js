import { world, Player } from "@minecraft/server"

export class Team {
	#teamName
	/** @param {string} teamName */
    constructor(teamName) {
    	this.teamName = teamName
    }

    addMember(player) {
    	if (!(player instanceof Player)) return
    	player.setDynamicProperty("isInTeam?", true)
	    player.setDynamicProperty("currentlyMemberOf", this.teamName)
    	world.getDimension('overworld').runCommandAsync(`tell @a You have joined the ${this.teamName} team.`)
    }

    removeMember(player) {
    	if (!(player instanceof Player)) return
    	player.setDynamicProperty("isInTeam?", false)
	    player.clearDynamicProperty("currentlyMemberOf")
		console.log(`You have left the ${this.teamName} team.`)
    }
};