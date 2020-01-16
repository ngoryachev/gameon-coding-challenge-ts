import * as R from "ramda";
import {Match} from "./MatchesContainer";
import {SectionListData} from "react-native";

export default function getSectionsData({
  matches = require('./data/matches'),
  teams = require('./data/teams')
} = {}): ReadonlyArray<SectionListData<Match>> {
  const now = () => new Date();

  const teamsById = R.groupBy(R.prop('TeamID'), teams);

  return R.pipe(
    R.map((match: Match): Match => ({
      ...match,
      AwayTeamEntity: teamsById[match.AwayTeamID][0],
      HomeTeamEntity: teamsById[match.HomeTeamID][0],
      isInPast: new Date(match.DateTime) < now(),
    } as Match)),
    R.groupBy((match: Match) => match.isInPast ? 'PAST GAMES' : 'UPCOMING  GAMES'),
    R.toPairs,
    R.map(([key, value]) => ({title: key, data: value}))
  )(matches);
}
