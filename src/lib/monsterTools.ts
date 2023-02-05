import {UrlTools} from "./urlTools";
import {
    ALIGNMENT, CONDITIONS, DAMAGE_IMMUNITIES, DAMAGE_IMMUNITIES_SPECIAL, DAMAGE_RESISTANCES, DAMAGE_RESISTANCES_SPECIAL,
    LANGUAGES,
    MONSTER_TYPE,
    MonsterData,
    MOVEMENT, PROFICIENCY_BONUS,
    SENSES,
    SIZE,
    STATS,
    STATSFULL
} from "../models/monsterModels";
import {
    AlchemyCharacter,
    AlchemyDamageMod,
    AlchemyMovementMode,
    AlchemyProficiency,
    AlchemySense
} from "../models/alchemy";

export async function monsterTools(id: string, urlTool: UrlTools): Promise<any | null> {
    const [monsterUrl, monsterHeader] = urlTool.getMonsterUrl(id);
    const res = await fetch(monsterUrl, { method: "GET", headers: monsterHeader as HeadersInit });
    if (res.status == 200)
        return (await res.json()).data[0] as MonsterData;
    else
        return null;
}

export function monsterParse(source: MonsterData): AlchemyCharacter{
    const res = {} as AlchemyCharacter;
    res.name = source.name;
    res.isNPC = true;
    res.race = "Monster"
    res.exp = PROFICIENCY_BONUS[source.challengeRatingId].xp;
    res.proficiencyBonus = PROFICIENCY_BONUS[source.challengeRatingId].proficiencyBonus;
    res.challengeRating = PROFICIENCY_BONUS[source.challengeRatingId].name;
    res.abilityScores = source.stats.map((stat) => {
        const statName = STATS[stat.statId];
        return {name: statName, value: stat.value};
    });
    res.currentHp = source.averageHitPoints;
    res.hitDice = source.hitPointDice.diceString;
    res.maxHp = source.hitPointDice.diceCount * source.hitPointDice.diceValue + source.hitPointDice.fixedValue;
    res.alignment = ALIGNMENT[source.alignmentId];
    res.armorClass = source.armorClass;
    res.size = SIZE[source.sizeId];
    res.speed = source.movements.filter((movement) => movement.movementId == 1)[0].speed;
    res.senses = source.senses.map((sense) => {
        return {name: SENSES[sense.senseId], distance: parseInt(sense.notes, 10)} as AlchemySense;
    });
    res.type = MONSTER_TYPE[source.typeId];
    res.movementModes = source.movements.map((movement) => {
        return {mode: MOVEMENT[movement.movementId], distance: movement.speed} as AlchemyMovementMode;
    });
    res.imageUri = source.avatarUrl;
    res.proficiencies = source.savingThrows.map((sense) => {
        return {name: STATSFULL[sense.statId], type: "save"} as AlchemyProficiency;
    });
    res.proficiencies.push(...source.languages.map((language) => {
        return {name: LANGUAGES[language.languageId], type: "language"} as AlchemyProficiency;
    }));
    res.conditionImmunities = source.conditionImmunities.map((condition) => CONDITIONS[condition]);
    res.damageImmunities = source.damageAdjustments.filter((damage) => damage in DAMAGE_IMMUNITIES).map((damage) => {
        return { damageType: DAMAGE_IMMUNITIES[damage]} as AlchemyDamageMod
    });
    source.damageAdjustments.filter((damage) => damage in DAMAGE_IMMUNITIES_SPECIAL).forEach((damage) => {
        res.damageImmunities.push(...DAMAGE_IMMUNITIES_SPECIAL[damage]);
    });
    res.damageResistances = source.damageAdjustments.filter((damage) => damage in DAMAGE_RESISTANCES).map((damage) => {
        return {damageType: DAMAGE_RESISTANCES[damage]} as AlchemyDamageMod;
    });
    source.damageAdjustments.filter((damage) => damage in DAMAGE_RESISTANCES_SPECIAL).forEach((damage) => {
        res.damageResistances.push(...DAMAGE_RESISTANCES_SPECIAL[damage]);
    });
    return res;
}