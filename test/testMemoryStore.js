const assert = require('assert');
const MemoryStore = require('../src/memoryStore.js');

describe('MemoryStore', () => {
  describe('addTable', () => {
    it('should add a new table into the memory store', () => {
      const memoryStore = new MemoryStore();
      memoryStore.addTable('sessions');

      const tables = ['sessions'];
      assert.deepStrictEqual(memoryStore.tables(), tables);
    });
  });
});
