import React from 'react';
import Matches from './Matches';

const matches = require('./matches');
const teams = require('./teams');

const now = new Date();

const teamsAsHash = teams.reduce((memo, item) => {
  memo[item.TeamID] = item;
  return memo;
}, {});

const matchesWithTeams = matches.map(match => ({
  ...match,
  AwayTeamEntity: teamsAsHash[match.AwayTeamID],
  HomeTeamEntity: teamsAsHash[match.HomeTeamID],
  isInPast: match => new Date(match.DateTime) < now,
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
}

export default class MatchesContainer extends React.Component {
  render = () => {
    return <Matches data={data} />;
  };
}
