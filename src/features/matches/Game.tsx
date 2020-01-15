import {Dimensions, StyleProp, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Circle, Column, Row} from '../../components';
import {Match} from './MatchesContainer';
import sizes from '../../styles/sizes';
import {Filler, Spacer} from '../../utils/uiUtils';
import moment from 'moment';

const style: any = { fontSize: 14, fontWeight: 'bold' };
const style_: any = { fontSize: 16, fontWeight: 'bold' };
const LogoAndText = (props: {code: string; city: string; name: string}) => (
  <Column alignCenter style={{ minWidth: 80 }}>
    <Circle size={60} borderColor='black'>
      <Text style={style}>{props.code}</Text>
    </Circle>
    <Spacer h={10} />
    <Text style={style}>{props.city}</Text>
    <Text style={style}>{props.name}</Text>
  </Column>
);

const Score = (props: Match) => (
  <Row>
    <Text style={style_}>1</Text>
    <Text style={style_}>:</Text>
    <Text style={style_}>0</Text>
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
      <Text style={{flex: 1, textAlign: 'center'}}>{moment(props.DateTime).format('MM/DD/YYYY h:mm A')}</Text>
    </Row>
    <Spacer h={10} />
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
