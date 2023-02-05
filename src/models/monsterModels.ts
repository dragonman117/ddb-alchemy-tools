
export interface getMonsterRequest{
    id: string;
    token: string;
}

export const STATS: {[key: number]: string} = {
    1: "str",
    2: "dex",
    3: "con",
    4: "int",
    5: "wis",
    6: "cha",
}
export const STATSFULL: {[key: number]: string} = {
    1: "strength",
    2: "dexterity",
    3: "constitution",
    4: "intelligence",
    5: "wisdom",
    6: "charisma",
}

export const MOVEMENT: {[key: number]: string} ={
    1: "walking",
    2: "unknown",
    3: "climb",
    4: "fly",
}

export interface MonsterData {
    collectionUserId:            number;
    isReleased:                  boolean;
    url:                         string;
    conditionImmunitiesHtml:     string;
    sensesHtml:                  string;
    skillsHtml:                  string;
    stats:                       Stat[];
    senses:                      Sense[];
    savingThrows:                SavingThrow[];
    skills:                      Skill[];
    languages:                   Language[];
    hitPointDice:                HitPointDice;
    swarm:                       null;
    movements:                   Movement[];
    homebrewStatus:              number;
    id:                          number;
    entityTypeId:                number;
    name:                        string;
    alignmentId:                 number;
    sizeId:                      number;
    typeId:                      number;
    armorClass:                  number;
    armorClassDescription:       string;
    averageHitPoints:            number;
    passivePerception:           number;
    isHomebrew:                  boolean;
    challengeRatingId:           number;
    sourceId:                    number;
    sourcePageNumber:            number;
    isLegendary:                 boolean;
    isMythic:                    boolean;
    hasLair:                     boolean;
    avatarUrl:                   string;
    largeAvatarUrl:              string;
    basicAvatarUrl:              string;
    version:                     null;
    subTypes:                    any[];
    environments:                number[];
    tags:                        any[];
    sources:                     Source[];
    damageAdjustments:           number[];
    conditionImmunities:         any[];
    specialTraitsDescription:    string;
    actionsDescription:          string;
    reactionsDescription:        string;
    legendaryActionsDescription: string;
    mythicActionsDescription:    string;
    bonusActionsDescription:     string;
    characteristicsDescription:  string;
    lairDescription:             string;
    languageDescription:         string;
    languageNote:                string;
    hideCr:                      boolean;
    isLegacy:                    boolean;
}

export interface HitPointDice {
    diceCount:      number;
    diceValue:      number;
    diceMultiplier: number;
    fixedValue:     number;
    diceString:     string;
}

export interface Language {
    languageId: number;
    notes:      string;
}

export interface Movement {
    movementId: number;
    speed:      number;
    notes:      null;
}

export interface SavingThrow {
    statId:        number;
    bonusModifier: null;
}

export interface Sense {
    senseId: number;
    notes:   string;
}

export interface Skill {
    skillId:         number;
    value:           number;
    additionalBonus: null;
}

export interface Source {
    sourceId:   number;
    pageNumber: number;
    sourceType: number;
}

export interface Stat {
    statId: number;
    name:   null;
    value:  number;
}
