import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Column, Row} from '../../components';
import {Match} from './MatchesContainer';
import sizes from '../../styles/sizes';
import {Filler, Spacer} from '../../utils/uiUtils';

const LogoAndText = (props: {code: string; city: string; name: string}) => (
  <Column alignCenter>
    <Text>{props.code}</Text>
    <Spacer h={10} />
    <Text>{props.city}</Text>
    <Text>{props.name}</Text>
  </Column>
);

const Score = (props: Match) => (
  <Row>
    <Text>1</Text>
    <Text>:</Text>
    <Text>0</Text>
  </Row>
);

const Game = (props: Match) => (
  <Column
    style={{
      borderRadius: sizes.borderRadius,
      borderWidth: 1,
      borderColor: 'black',
      padding: sizes.padding,
    }}>
    <Row>
      <Text style={{flex: 1, textAlign: 'center'}}>Лига чемпионов</Text>
    </Row>
    <Row alignCenter>
      <Filler />
      <LogoAndText code={props.HomeTeam} city={props.HomeTeamEntity.City} name={props.HomeTeamEntity.Name} />
      <Filler />
      {props.IsClosed ? <Score {...props} /> : <Text>VS</Text>}
      <Filler />
      <LogoAndText code={props.AwayTeam} city={props.AwayTeamEntity.City} name={props.AwayTeamEntity.Name} />
      <Filler />
    </Row>
  </Column>
);

export default Game;

const screenPaddings = 16;
const listWidth = Dimensions.get('window').width - screenPaddings * 2;

const styles = StyleSheet.create({});
