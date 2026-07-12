# Concepts Demonstrated
# 1. Consistent Hashing

Keys are distributed dynamically between nodes using hashing.

Benefits:

Scalability
Minimal data movement
Better load balancing
# 2. Node Join / Leave

The system supports:

Adding new nodes
Removing nodes

Only a small portion of data changes location.

# 3. Caching Layer

A small LRU-style cache is implemented using Map().

Benefits:

Faster reads
Reduced node access
Better performance
# 4. Fault Tolerance

Node failures are simulated by disabling nodes.

The system still responds using available active nodes.

# 5. Transparency

Users interact only with:

put(key, value)
get(key)

The system hides:

node management
hashing
cache handling
failure handling
- Example Data Used
user:101 → { "name": "Alice" }
user:102 → { "name": "Bob" }
user:103 → { "name": "Charlie" }
user:104 → { "name": "Diana" }
user:105 → { "name": "Eve" }
user:106 → { "name": "Frank" }
 # Conclusion

This project demonstrates the core principles of distributed systems using a simple Node.js simulation.
It provides a simplified understanding of how modern distributed databases and cloud systems work internally.