import React from 'react';
import MatchesScreen from './MatchesScreen';
import getSectionsData from "./getSectionsData";

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

const sectionsData = getSectionsData();

export default function() {
  return <MatchesScreen sectionData={sectionsData} />;
}
