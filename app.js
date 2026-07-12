// Distributed Key-Value Store with Consistent Hashing and Cache

class Node {
    constructor(name) {
      this.name = name;
      this.data = {};
      this.active = true;
    }
  }
  
  class DistributedKeyValueStore {
    constructor() {
      this.nodes = [];
      this.cache = {};
    }
  
    // Simple hash function
    hash(key) {
      let hash = 0;
  
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
  
      return hash;
    }
  
    // Add node
    addNode(nodeName) {
      const node = new Node(nodeName);
      this.nodes.push(node);
  
      console.log(`Node ${nodeName} joined`);
    }
  
    // Remove node
    removeNode(nodeName) {
      this.nodes = this.nodes.filter(
        (node) => node.name !== nodeName
      );
  
      console.log(`Node ${nodeName} removed`);
    }
  
    // Get node using consistent hashing
    getNode(key) {
      if (this.nodes.length === 0) {
        return null;
      }
  
      const index = this.hash(key) % this.nodes.length;
  
      return this.nodes[index];
    }
  
    // Store data
    put(key, value) {
      const node = this.getNode(key);
  
      if (!node || !node.active) {
        console.log(`No active node for ${key}`);
        return;
      }
  
      node.data[key] = value;
  
      console.log(`${key} stored in ${node.name}`);
    }
  
    // Get data
    get(key) {
  
      // Check cache first
      if (this.cache[key]) {
        console.log(`${key} fetched from cache`);
        return this.cache[key];
      }
  
      const node = this.getNode(key);
  
      if (!node || !node.active) {
        console.log(`Node unavailable for ${key}`);
        return null;
      }
  
      const value = node.data[key];
  
      // Save to cache
      if (value) {
        this.cache[key] = value;
      }
  
      console.log(`${key} fetched from ${node.name}`);
  
      return value;
    }
  
    // Simulate node failure
    failNode(nodeName) {
      const node = this.nodes.find(
        (node) => node.name === nodeName
      );
  
      if (node) {
        node.active = false;
        console.log(`${nodeName} failed`);
      }
    }
  
    // Recover node
    recoverNode(nodeName) {
      const node = this.nodes.find(
        (node) => node.name === nodeName
      );
  
      if (node) {
        node.active = true;
        console.log(`${nodeName} recovered`);
      }
    }
  
    // Display nodes
    showNodes() {
      console.log("\nNodes Status:");
  
      this.nodes.forEach((node) => {
        console.log({
          name: node.name,
          active: node.active,
          data: node.data,
        });
      });
    }
  
    // Display cache
    showCache() {
      console.log("\nCache Content:");
      console.log(this.cache);
    }
  }
  
  // Create distributed store
  const store = new DistributedKeyValueStore();
  
  // Add nodes
  store.addNode("Node-A");
  store.addNode("Node-B");
  store.addNode("Node-C");
  
  // Insert sample data
  store.put("user:101", { name: "Alice" });
  store.put("user:102", { name: "Bob" });
  store.put("user:103", { name: "Charlie" });
  store.put("user:104", { name: "Diana" });
  store.put("user:105", { name: "Eve" });
  store.put("user:106", { name: "Frank" });
  
  // Show nodes
  store.showNodes();
  
  // Fetch data
  console.log(store.get("user:101"));
  console.log(store.get("user:102"));
  
  // Show cache
  store.showCache();
  
  // Simulate node failure
  store.failNode("Node-B");
  
  // Try fetching after failure
  console.log(store.get("user:101"));
  
  // Recover node
  store.recoverNode("Node-B");
  
  // Fetch again
  console.log(store.get("user:101"));