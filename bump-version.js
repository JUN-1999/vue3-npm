const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('No version provided, defaulting to minor bump.');
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    const currentVersion = packageJson.version;
    const parts = currentVersion.split('.');
    parts += 1;
    packageJson.version = parts.join('.');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Version updated to ${packageJson.version}`);
} else {
    const version = args;
    if (!version.match(/^\d+\.\d+\.\d+$/)) {
        console.log('Invalid version format.');
        return;
    }
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Version updated to ${version}`);
}

