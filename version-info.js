const { gitDescribeSync } = require('git-describe');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const versionInfo = {
    git: gitDescribeSync(),
    pkg: {
        version: pkg.version,
        name: pkg.name
    }
}


var versionInfoJson = JSON.stringify(versionInfo, null, 2);

fs.writeFileSync('version-info.json', versionInfoJson);