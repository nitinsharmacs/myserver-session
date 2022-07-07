## session(options)

* it gives session handler that takes the req, res and next.
* It looks for the session cookie
* if no cookie found, just injects the fake session in req.
* if cookie exits, it gets the session from the store, makes a session and injects into the req

## Session

APIs

* save : saves the session into the store
* destroy : deletes the session from the store
* regenerate [experimental] : regenerates the session with new expiration

## Store

APIs

* find
* insert
* delete

### Mechanism

* It takes a store where to store the session data
* It can also take database to store the session data

``` js
const memoryStore = new MemoryStore('sessions');
// sessions is name of the collection where sessions would be stored

const store = new Store(memoryStore);

store.insert(session);

store.find(sessionId);

store.delete(sessionId);
```

* Internally, store uses the provided memory store / db store methods to access the session data.

## MemoryStore

Temporary store db

APIs

* collection.find
* collection.insert
* collection.delete

