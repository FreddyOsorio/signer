const crypto = require('crypto');

var u_id = crypto.randomUUID();

console.log("u_id: ", u_id);

// string to be hashed
const str = "BankQikSecretBridge";

// secret or salt to be hashed with
const secret = "cvOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

// create a sha-256 hasher
const sha256Hasher = crypto.createHmac("sha256", secret);

// hash the string
// and set the output format
const hash = sha256Hasher.update(str).digest("hex");

// A unique sha256 hash 
console.log("hash: ",hash);
