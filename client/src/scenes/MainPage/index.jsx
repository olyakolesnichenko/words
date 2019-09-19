import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWords } from '../../routines/routines';
import { Button, Grid } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import styles from './styles.module.scss';

class MainPage extends Component {

  componentDidMount() {
    this.props.fetchWords();
  }

  render() {
    const { loading, word } = this.props;

    console.log(word);

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <section className={styles.main}>
          <Grid centered container columns={1}>
            <Grid.Column computer={13} mobile={16}>
              <h1 className={styles.headerCentered}>Do you know this word?</h1>
              <p className={styles.mainText}>
                {word}
              </p>
              <Button primary>YES</Button>
              <Button secondary>NO</Button>
            </Grid.Column>
          </Grid>
        </section>

        <footer className={styles.footer}>
          <Grid className={styles.foterLine} container>
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
  word: PropTypes.string.isRequired,
  fetchWords: PropTypes.func.isRequired
};

const mapStateToProps = ({
                           words: {
                             loading,
                             currentWord
                           }
                         }) => ({
  loading,
  word: currentWord
});

const mapDispatchToProps = {
  fetchWords
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
