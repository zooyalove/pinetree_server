import { EventEmitter } from "events";

// EventEmitter를 상속받은 몽고디비의 실시간 변화를 감지하기 위한 관찰자 및 알람역할 클래스
// class DBNotify extends EventEmitter
let _instance: DBNotify;

class DBNotify extends EventEmitter {
  constructor() {
    super();
    if (_instance) {
      return _instance;
    }

    _instance = this;
  }

  subscribe(channel: string, listener: any) {
    this.on(channel, listener);
  }

  unsubscribe(channel: string, listener: any) {
    this.removeListener(channel, listener);
  }

  publish(channel: string, data: any) {
    this.emit(channel, data);
  }
}

export default DBNotify;
