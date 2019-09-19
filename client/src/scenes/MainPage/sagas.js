import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as wordService from '../../services/wordService';
import {
  fetchWords
} from '../../routines/routines';

function* currentWordRequest() {
  try {
    yield put(fetchWords.request());
    const response = yield call(wordService.getCurrentWord);
    yield put(fetchWords.success(response));
  } catch (error) {
    yield put(fetchWords.failure(error.message));
  } finally {
    yield put(fetchWords.fulfill());
  }
}

function* watchCurrentWordRequest() {
  yield takeEvery(fetchWords.TRIGGER, currentWordRequest);
}


export default function* profileSagas() {
  yield all([
    watchCurrentWordRequest(),
  ]);
}
