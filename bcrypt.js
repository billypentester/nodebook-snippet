var bcrypt = require('bcryptjs');

// Generate a hash

var hash = bcrypt.hashSync('billy', 10);

console.log(hash)

// Compare a string to the hash

bcrypt.compare("billy", hash, (err, res) => {
    console.log(res)
});