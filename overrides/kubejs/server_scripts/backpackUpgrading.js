//priority: 0
onEvent('block.right_click', event =>{
    let {block, item} = event
    if (event.hand != MAIN_HAND) {return}
    if (block.entityId != "sophisticatedbackpacks:backpack") {return}

    let data = block.getEntityData()
    let bpTag = block.entityData.backpackData.tag
    let slots = 0
    let upgradeSlots = 0
    if (bpTag.leather == undefined) {
        data.backpackData.tag.leather = parseInt(0)
        data.backpackData.tag.string = parseInt(0)
        data.backpackData.tag.pocket = parseInt(0)
        data.backpackData.tag.obelisk = parseInt(0)
        data.backpackData.tag.pcb = parseInt(0)
        //data.backpackData.tag. <others> = parseInt(0)
        block.mergeEntityData(data)
        bpTag = block.entityData.backpackData.tag
    }

    if (item == Item.of("minecraft:leather").id && bpTag.leather < 4) {slots = 1; data.backpackData.tag.leather++}
    else if (item == Item.of("minecraft:string").id && bpTag.string < 2) {slots = 1; data.backpackData.tag.string++}
    else if (item == Item.of("kubejs:leather_pocket").id && bpTag.pocket < 2) {slots = 6; data.backpackData.tag.pocket++}
    else if (item == Item.of("forbidden_arcanus:arcane_crystal_obelisk").id && bpTag.obelisk < 1) {upgradeSlots = 1; data.backpackData.tag.obelisk++}
    else if (item == Item.of("kubejs:finalpcb").id && bpTag.pcb < 2) {upgradeSlots = 1; data.backpackData.tag.pcb++}
    else {return}
    
    data.backpackData.tag.inventorySlots += slots
    data.backpackData.tag.upgradeSlots += upgradeSlots
    block.mergeEntityData(data)
    event.cancel()
})

onEvent("recipes", event =>{
    event.smithing("kubejs:leather_pocket", "minecraft:bundle", "minecraft:iron_ingot")
    event.remove({output:"sophisticatedbackpacks:upgrade_base"})
    event.shaped("sophisticatedbackpacks:upgrade_base", [" T ", "TDT", " T "], {T:"kubejs:runic_tablet", D:"forbidden_arcanus:polished_darkstone"})
    event.remove({output: /sophisticatedbackpacks\:stack_upgrade_tier/})
    event.smithing("sophisticatedbackpacks:stack_upgrade_tier_1", "sophisticatedbackpacks:upgrade_base", "minecraft:anvil")
    event.smithing("sophisticatedbackpacks:stack_upgrade_tier_2", "sophisticatedbackpacks:stack_upgrade_tier_1", "ars_nouveau:source_gem")
    event.smithing("sophisticatedbackpacks:stack_upgrade_tier_3", "sophisticatedbackpacks:stack_upgrade_tier_1", "forbidden_arcanus:aureal_bottle")
    event.smithing("sophisticatedbackpacks:stack_upgrade_tier_4", "sophisticatedbackpacks:stack_upgrade_tier_1", "forbidden_arcanus:orb_of_temporary_flight")
    event.remove({output:/sophisticatedbackpacks\:.*_backpack/})
    event.shapeless("sophisticatedbackpacks:gold_backpack", ["sophisticatedbackpacks:backpack", "create:brass_sheet"])
    event.shapeless("sophisticatedbackpacks:iron_backpack", ["sophisticatedbackpacks:backpack", "kubejs:radiant_coil"])
    event.shapeless("sophisticatedbackpacks:diamond_backpack", ["sophisticatedbackpacks:backpack", "pneumaticcraft:module_expansion_card"])
    event.shapeless("sophisticatedbackpacks:netherite_backpack", ["sophisticatedbackpacks:gold_backpack", "pneumaticcraft:printed_circuit_board"])
})