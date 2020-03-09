import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchWords } from '../../routines/routines';
import { Button, Grid } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import styles from './styles.module.scss';

const wordPercentage = +process.env.REACT_APP_WORD_PERCENTAGE;
const numberOfLetters = +process.env.REACT_APP_NUMBER_OF_LETTERS;

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
    const { isShowTranslation, shownLetters } = this.state;
    const allowedLettersNumber = (!loading && word) ? Math.floor(wordPercentage * +word['translation'].length / 100) : 0;

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <section className={styles.main}>
          <Grid centered container columns={1}>
            <Grid.Row centered>
              <Grid.Column computer={13} mobile={16}>
                <h1 className={styles.headerCentered}>{t('Do you know this word?')} </h1>
                <p className={styles.mainText}>
                  {word['word']}
                </p>
                {isShowTranslation ? <p className={styles.translationText}>{word['translation']}</p> : null}
                {shownLetters ? <p className={styles.translationText}>{word['translation'].substring(0, shownLetters)}</p> : null}
                {isShowTranslation ?
                  <div className={styles.buttons}>
                    <Button primary onClick={this.getNewWord}>{t('Show next')}</Button>
                  </div> :
                  <div className={styles.buttons}>
                    {shownLetters >= Math.min(allowedLettersNumber, +numberOfLetters) ? null : <Button onClick={this.getTheCue}>{t('Give the cue')}</Button>}
                    <div className={styles.buttonsWrap}>
                      <Button primary onClick={this.getNewWord}>{t('YES')}</Button>
                      <Button secondary onClick={this.showTranslation}>{t('NO')}</Button>
                    </div>
                  </div>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <footer className={styles.footer}>
          <Grid className={styles.footerLine} container>
            <Grid.Row computer={13} mobile={16}>
              <p>Copyright © 2019</p>
            </Grid.Row>
          </Grid>
        </footer>
      </div>);
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
