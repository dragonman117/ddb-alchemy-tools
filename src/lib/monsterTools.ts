import {UrlTools} from "./urlTools";
import {MonsterData, MOVEMENT, STATS, STATSFULL} from "../models/monsterModels";
import {AlchemyCharacter, AlchemyMovementMode, AlchemyProficiency} from "../models/alchemy";

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
    res.abilityScores = source.stats.map((stat) => {
        const statName = STATS[stat.statId];
        return {name: statName, value: stat.value};
    });
    res.currentHp = source.averageHitPoints;
    res.armorClass = source.armorClass;
    res.speed = source.movements.filter((movement) => movement.movementId == 1)[0].speed;
    res.movementModes = source.movements.map((movement) => {
        return {mode: MOVEMENT[movement.movementId], distance: movement.speed} as AlchemyMovementMode;
    });
    res.imageUri = source.avatarUrl;
    res.proficiencies = source.savingThrows.map((sense) => {
        return {name: STATSFULL[sense.statId], type: "save"} as AlchemyProficiency;
    });
    return res;
}