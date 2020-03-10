import { EventEmitter } from "events";

// EventEmitter를 상속받은 몽고디비의 실시간 변화를 감지하기 위한 관찰자 및 알람역할 클래스
// class DBNotify
const _emitter = new EventEmitter();

class DBNotify {
  subscribe(channel: string, listener: any) {
    _emitter.on(channel, listener);
  }

  unsubscribe(channel: string, listener: any) {
    _emitter.removeListener(channel, listener);
  }

  publish(channel: string, data: any) {
    _emitter.emit(channel, data);
  }
}

const dbNotify: DBNotify = new DBNotify();

export default dbNotify;
