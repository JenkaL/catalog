export default class StorageCache {
  constructor($cacheFactory, cacheStorageIdentifier, itemIdentifier) {
    this.cache = $cacheFactory(cacheStorageIdentifier);
    this.id = itemIdentifier;
  }

  get(id) {
    let returnObj = this.cache.get(id);

    return !!returnObj ? returnObj : {};
  }

  put(data) {
    this.cache.put(data[this.id], data);
  }

  remove(id) {
    this.cache.remove(id);
  }

  removeAll() {
    this.cache.removeAll();
  }
}
