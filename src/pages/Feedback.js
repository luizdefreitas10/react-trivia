import React from 'react';
import { connect } from 'react-redux';
import { number, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = { rankingPage: false };
  }

  componentDidMount = () => this.memoryCard();

  rankingRedirect = () => this.setState({ rankingPage: true });

  memoryCard = () => {
    const { playerData: { name, gravatarEmail: picture, score } } = this.props;
    const data = { name, picture, score };

    const localStorageVerify = localStorage.getItem('ranking');
    if (localStorageVerify !== null) {
      const oldRankingData = [
        ...JSON.parse(localStorageVerify),
        { name, picture, score },
      ];
      return localStorage.setItem('ranking', JSON.stringify(oldRankingData));
    }

    localStorage.setItem('ranking', JSON.stringify([data]));
  };

  render() {
    const { rankingPage } = this.state;
    const { assertions, score } = this.props;
    const MIN_OF_ASSERTIONS = 3;
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">
          {assertions < MIN_OF_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ (event) => {
            event.preventDefault();
            this.rankingRedirect();
          } }
        >
          Ranking
        </button>
        { rankingPage && <Redirect to="/ranking" /> }
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
  playerData: shape({
    gravatarEmail: string.isRequired,
    name: string.isRequired,
    score: number.isRequired,
    assertions: number.isRequired,
    totalQuestions: number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  playerData: state.player,
});

export default connect(mapStateToProps)(Feedback);
