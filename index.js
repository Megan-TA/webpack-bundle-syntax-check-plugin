const acorn = require("acorn");
const fs = require('fs')

class BundleSyntaxCheckerPlugin {
    constructor({ esVersion } = { esVersion: 5 }) {
        this.esVersion = esVersion;
    }

    apply(compiler) {
        compiler.hooks.emit.tap("BundleSyntaxCheckerPlugin", (compilation) => {
            for (const [filename, asset] of Object.entries(compilation.assets)) {

                if (!/(\.js$)|(\.js\?.*)/.test(filename)) {
                    continue;
                }

                const source = asset.source();

                try {
                    acorn.parse(source, {
                        ecmaVersion: this.esVersion,
                    });
                } catch (err) {
                    if (err instanceof SyntaxError) {
                        throw this.buildError({
                            err,
                            source,
                            filename,
                        })
                    } else {
                        throw err;
                    }
                }
            }
        });
    }

    buildError({ err, source, filename }) {
        fs.writeFile('./error-source.js', source, () => {})
        return new SyntaxError(`Invalid ES${this.esVersion} at ${filename}: ${err}`);
    }
}

module.exports = BundleSyntaxCheckerPlugin; 

module.exports.BundleSyntaxCheckerPlugin = BundleSyntaxCheckerPlugin;