import {action, computed, makeAutoObservable, observable, runInAction} from 'mobx';
import { resetGlobalState } from 'mobx/dist/internal';

class Store {
  timer = 0

  person = {
    name: 'alice',
    age: 23,
    sex: 'boy'
  }

  list: {name: string; age: number}[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action
  addTimer() {
    this.timer += 1
    console.log(this.timer)
  }

  @action
  changeAge () {
    this.person.age++
  }

  @action
  otherFetch () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('other data')
      })
    }).then((res: string) => {
      return Promise.resolve(res)
    })
  }

  @action
  getListData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{name: 'ss', age: 12}, {name: 'jsdo', age: 34}])
      }, 2000)
    }).then((res: {name: string; age: number}[]) => {
      runInAction(() => { this.list = res})
      return this.otherFetch()
    })
  }

  get computedTimer () {
    return 2 * this.timer
  }
}

const AppState = observable({
});

export default AppState