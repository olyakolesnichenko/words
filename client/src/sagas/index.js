import { all } from 'redux-saga/effects';

import wordsSagas from '../scenes/MainPage/sagas';

export default function* rootSaga() {
  yield all([
    wordsSagas()
  ]);
}
