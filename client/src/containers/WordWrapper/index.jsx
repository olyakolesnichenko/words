import React, {useState} from 'react';
import {Button, Grid} from 'semantic-ui-react';
import styles from './styles.module.scss';

const WordWrapper = ({word, getNewWord, t}) => {

  const [isShowTranslation, setShowTranslation] = useState(false);
  const [countShownLetters, setShownLetters] = useState(0);

  const getTheHint = () => {
    setShownLetters(countShownLetters + 1);
  };

  const showTranslation = () => {
    setShowTranslation(true);
    setShownLetters(0);
  };
  const wordPercentage = +process.env.REACT_APP_WORD_PERCENTAGE;
  const numberOfLetters = +process.env.REACT_APP_NUMBER_OF_LETTERS;
  const allowedLettersNumber = word ? Math.floor(wordPercentage * +word['translation'].length / 100) : 0;

  return (
    <div>
      <section className={styles.main}>
        <Grid centered container columns={1}>
          <Grid.Row centered>
            <Grid.Column computer={13} mobile={16}>
              <h1 className={styles.headerCentered}>{t('Do you know this word?')} </h1>
              <p className={styles.mainText}>{word['word']}</p>
              {isShowTranslation ? <p className={styles.translationText}>{word['translation']}</p> : null}
              {countShownLetters ?
                <p className={styles.translationText}>{word['translation'].substring(0, countShownLetters)}</p> : null}
              {isShowTranslation ?
                <div className={styles.buttons}>
                  <Button primary onClick={() => getNewWord()}>{t('Show next')}</Button>
                </div> :
                <div className={styles.buttons}>
                  {countShownLetters >= Math.min(allowedLettersNumber, +numberOfLetters) ? null :
                    <Button onClick={() => getTheHint()}>{t('Give the cue')}</Button>}
                  <div className={styles.buttonsWrap}>
                    <Button primary onClick={() => getNewWord()}>{t('YES')}</Button>
                    <Button secondary onClick={() => showTranslation()}>{t('NO')}</Button>
                  </div>
                </div>}
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
};


export default WordWrapper;
