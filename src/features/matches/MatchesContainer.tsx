import React from 'react';
import Matches from './Matches';
import * as R from 'ramda';

const matches = require('./matches');
const teams = require('./teams');

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

export interface Team {
  TeamID: number;
  Key: string;
  City: string;
  Name: string;
  PrimaryColor: string;
  SecondaryColor: string;
  TertiaryColor: string;
  QuaternaryColor: string;
  WikipediaLogoUrl: string;
}

export interface Match {
  GameID: number;
  Status: 'Final' | 'Pending';
  DateTime: string;
  AwayTeam: string;
  HomeTeam: string;
  AwayTeamID: number;
  HomeTeamID: number;
  AwayTeamScore: number;
  HomeTeamScore: number;
  IsClosed: boolean;
  GameEndDateTime: string;
  // client level fields
  AwayTeamEntity: Team;
  HomeTeamEntity: Team;
  isInPast: boolean;
}

export default class MatchesContainer extends React.Component {
  render = () => {
    return <Matches data={data} />;
  };
}
