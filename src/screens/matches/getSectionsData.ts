import * as R from "ramda";
import {Match} from "./MatchesContainer";

export default function getSectionsData() {
  const matches = require('./data/matches');
  const teams = require('./data/teams');

  const now = () => new Date();

  const teamsById = R.groupBy(R.prop('TeamID'), teams);

  const data = R.pipe(
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

  return data;
}
