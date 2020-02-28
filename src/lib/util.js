const nanoid = require("nanoid");
const { EventEmitter } = require("events");
const util = require("util");

const MongoPrimary = {
  type: String,
  default: () => nanoid(10)
};

exports.MongoPrimary = MongoPrimary;

// EventEmitter를 상속받은 몽고디비의 실시간 변화를 감지하기 위한 관찰자 및 알람역할 클래스
// class DBNotify extends EventEmitter
function DBNotify() {
  EventEmitter.call(this);
}

util.inherits(DBNotify, EventEmitter);

exports.DBNotify = DBNotify;

DBNotify.prototype.subscribe = function subscribe(channel, listener) {
  this.on(channel, listener);
};

DBNotify.prototype.unsubscribe = function unsubscribe(channel, listener) {
  this.removeListener(channel, listener);
};

DBNotify.prototype.publish = function publish(channel, data) {
  this.emit(channel, data);
};

const dbNotify = new DBNotify();

exports.dbNotify = dbNotify;
