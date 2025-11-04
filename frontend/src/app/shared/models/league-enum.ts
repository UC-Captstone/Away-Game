export enum LeagueEnum {
  NBA = 'NBA',
  NFL = 'NFL',
  MLB = 'MLB',
  NHL = 'NHL',
  MLS = 'MLS',
}

export const LeagueIdMap: Record<LeagueEnum, string> = {
  [LeagueEnum.NBA]: 'nba-uuid',
  [LeagueEnum.NFL]: 'nfl-uuid',
  [LeagueEnum.MLB]: 'mlb-uuid',
  [LeagueEnum.NHL]: 'nhl-uuid',
  [LeagueEnum.MLS]: 'mls-uuid',
};
