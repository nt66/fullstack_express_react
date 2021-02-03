/**
 * mongodb crud es6封装
 */
const { MongoClient } = require('mongodb');

const URL = 'mongodb://127.0.0.1:27017/';
const DBNAME = 'tongtang';

class DB {
  // 单例模式
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  // 构造函数
  constructor() {
    this.dbClient = null;
    this.connect();
  }

  // 连接 (如果需要动态指定url和dbname，可以在connect中传入参数)
  connect() {
    return new Promise((resovle, reject) => {
      MongoClient.connect(URL, (err, client) => {
        if (err) {
          reject(err)
        } else {
          this.dbClient = client.db(DBNAME);
          resovle(this.dbClient);
        }
      })
    });
  }

  /**
   * 查找
   * @param {String} collectionName 表名
   * @param {*} json 查找条件
   */
  find(collectionName, json) {
    return new Promise((res, rej) => {
      this.connect().then(db => {
        const collection = db.collection(collectionName);
        collection.find(json).toArray((err, data) => {
          if (err) {
            rej(err);
            return;
          }
          res(data);
        })
      })
    })
  }

  /**
     * 插入数据
     * @param {String} collectionName 表名
     * @param {*} json 插入数据
     */
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  }

  /**
   * 更新
   * @param {String} collectionName 表名
   * @param {*} json1 查找条件
   * @param {*} json2 更新的数据
   */
  update(collectionName, json1, json2) {
    return new Promise((res, rej) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(json1, { $set: json2 }, (err, result) => {
          if (err) {
            rej(err);
            return;
          }
          res(result);
        })
      })
    });
  }

  /**
     * 删除
     * @param {String} collectionName 表名
     * @param {*} json 查找条件
     */
  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  }
}

module.exports = DB.getInstance();
