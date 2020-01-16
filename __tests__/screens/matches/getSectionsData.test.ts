import * as R from 'ramda';
import getSectionsData from '../../../src/screens/matches/getSectionsData';
import {Match, Team} from '../../../src/screens/matches/MatchesContainer';

const matches = require('../../../src/screens/matches/data/matches');
const teams = require('../../../src/screens/matches/data/teams');

describe('getSectionsData()', () => {
  const sectionsData = getSectionsData();

  it('Only one [PASSED GAMES] section', () => {
    expect(sectionsData.length).toBe(1);
  });

  it('All data is in [PASSED GAMES] section', () => {
    expect(sectionsData[0].data.length).toBe(3);

    const fields = [
      'GameID',
      'Status',
      'DateTime',
      'AwayTeam',
      'HomeTeam',
      'AwayTeamID',
      'HomeTeamID',
      'AwayTeamScore',
      'HomeTeamScore',
      'IsClosed',
      'GameEndDateTime',
    ];

    const allFieldsMatched = R.pipe(
      R.zip(matches),
      R.all(([data, expected]) =>
        // @ts-ignore
        R.all(field => data[field] === expected[field])(fields),
      ),
    )({data: sectionsData[0].data});

    expect(allFieldsMatched).toBe(true);
  });

  it('Matches are populated by custom fields', () => {
    const allFieldsMatched =
      R.all((data: Match): boolean => (
          data.AwayTeamEntity === teams.find((team: Team) => team.TeamID === data.AwayTeamEntity.TeamID) &&
          data.HomeTeamEntity === teams.find((team: Team) => team.TeamID === data.HomeTeamEntity.TeamID) &&
          data.isInPast === new Date(data.DateTime) < new Date()
      ),
    )(sectionsData[0].data);

    expect(allFieldsMatched).toBe(true);
  });
});
