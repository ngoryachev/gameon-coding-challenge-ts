import React from 'react';
import Matches from './Matches';

const matches = require('./matches');
const teams = require('./teams');

const now = () => new Date();

const teamsById = teams.reduce((memo, item) => {
  memo[item.TeamID] = item;
  return memo;
}, {});

const matchesWithTeams = matches.map(match => ({
  ...match,
  AwayTeamEntity: teamsById[match.AwayTeamID],
  HomeTeamEntity: teamsById[match.HomeTeamID],
  isInPast: new Date(match.DateTime) < now(),
}));

const pastMatches = matchesWithTeams.filter(({isInPast}) => isInPast);
const upcomingMatches = matchesWithTeams.filter(({isInPast}) => !isInPast);

const data = [
  {
    title: 'Past',
    data: pastMatches,
  },
  {
    title: 'Upcoming',
    data: upcomingMatches,
  },
];
export interface Team {
  TeamID: number,
  Key: string,
  City: string,
  Name: string,
  PrimaryColor: string,
  SecondaryColor: string,
  TertiaryColor: string,
  QuaternaryColor: string,
  WikipediaLogoUrl: string,
}

export interface Match {
  GameID: number,
  Status: "Final" | "Pending",
  DateTime: string,
  AwayTeam: "WAS",
  HomeTeam: "CHA",
  AwayTeamID: number,
  HomeTeamID: number,
  AwayTeamScore: number,
  HomeTeamScore: number,
  IsClosed: boolean,
  GameEndDateTime: string,
  // client level fields
  AwayTeamEntity: Team,
  HomeTeamEntity: Team,
  isInPast: boolean,
}

export default class MatchesContainer extends React.Component {
  render = () => {
    return <Matches data={data} />;
  };
}
