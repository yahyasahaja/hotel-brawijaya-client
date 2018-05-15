//MODULES
import { observable, action } from 'mobx'

//STORE
class Step {
  @observable currentStep = 1

  @action
  inc() {
    this.currentStep++
  }
}

export default new Step()