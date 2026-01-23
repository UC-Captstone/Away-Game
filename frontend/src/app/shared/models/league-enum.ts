export enum LeagueEnum {
  NBA = 'NBA',
  NFL = 'NFL',
  MLB = 'MLB',
  NHL = 'NHL',
  MLS = 'MLS',
}

export const LeagueIdMap: Record<LeagueEnum, number> = {
  //Nathan: adjust later
  [LeagueEnum.NBA]: 1,
  [LeagueEnum.NFL]: 28,
  [LeagueEnum.MLB]: 2,
  [LeagueEnum.NHL]: 3,
  [LeagueEnum.MLS]: 4,
};
