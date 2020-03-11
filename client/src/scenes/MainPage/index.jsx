import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchWords } from '../../routines/routines';
import Spinner from '../../components/Spinner';
import WordWrapper from '../../containers/WordWrapper';

class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowTranslation: false,
      shownLetters: 0
    };
    this.getNewWord = this.getNewWord.bind(this);
    this.getTheCue = this.getTheCue.bind(this);
    this.showTranslation = this.showTranslation.bind(this);
  }

  componentDidMount() {
    this.props.fetchWords();
  }
  getTheCue() {
    this.setState({
      shownLetters: this.state.shownLetters+1
    });
  }

  getNewWord() {
    this.props.fetchWords();
    this.setState({
      isShowTranslation: false,
      shownLetters: 0
    });
  }

  showTranslation() {
    this.setState({
      isShowTranslation: true,
      shownLetters: 0
    });
  }

  render() {
    const { loading, word, t } = this.props;

    console.log(loading, word );

    return loading ? (
      <Spinner />
    ) : (
      <WordWrapper word={word} getNewWord={this.getNewWord} t={t}/>
    );
  }
}


MainPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  word: PropTypes.object.isRequired,
  fetchWords: PropTypes.func.isRequired,
  t: PropTypes.any.isRequired
};

const mapStateToProps = ({words: {
  loading,
  currentWord
}}) => ({
  loading,
  word: currentWord
});

const mapDispatchToProps = {
  fetchWords
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(MainPage));
