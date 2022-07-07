const Table = require('./table.js');

class MemoryStore {
  #tables;
  constructor() {
    this.#tables = [];
  }

  addTable(tableName) {
    this[tableName] = new Table(tableName, { records: [] });
    this.#tables.push(tableName);
  }

  tables() {
    return [...this.#tables];
  }
}

module.exports = MemoryStore;
