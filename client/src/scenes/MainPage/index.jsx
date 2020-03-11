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

    this.getNewWord = this.getNewWord.bind(this);
  }

  componentDidMount() {
    this.props.fetchWords();
  }

  getNewWord() {
    this.props.fetchWords();
    this.setState({
      isShowTranslation: false,
      shownLetters: 0
    });
  }

  render() {
    const { loading, word, t } = this.props;

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
