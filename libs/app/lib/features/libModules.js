/**
 * Load lib modules
 * @module Feature_LibModules
 *
 * @example
 *
 *  'libModules': {
 *      '<name>': {
 *          npmModule: false, // whether is a npm module
 *          options: { // module options
 *          },
 *          settings: { // can override module defined settings
 *          }
 *      }
 *  }
 */

import path from 'node:path';
import { _, batchAsync_ } from '@galaxar/utils';
import { fs, isDir_ } from '@galaxar/sys';
import { InvalidConfiguration } from '@genx/types';
import Feature from '../Feature';
import LibModule from '../LibModule';

export default {
    /**
     * This feature is loaded at plugin stage.
     * @member {string}
     */
    type: Feature.PLUGIN,

    /**
     * Load the feature.
     * @param {App} app - The app module object.
     * @param {object} entries - Lib module entries.
     * @returns {Promise.<*>}
     */
    load_: async (app, entries) => {
        return batchAsync_(entries, async (config, name) => {
            let options = {
                env: app.env,
                logWithAppName: app.options.logWithAppName,
                ...config.options,
            };

            let appPath;

            if (config.npmModule) {
                appPath = app.toAbsolutePath('node_modules', name);
            } else {
                appPath = path.join(app.libModulesPath, name);
            }

            let exists = (await fs.pathExists(appPath)) && (await isDir_(appPath));
            if (!exists) {
                throw new InvalidConfiguration(`Lib [${name}] not exists.`, app, `libModules.${name}`);
            }

            let lib = new LibModule(app, name, appPath, options);

            lib.on('configLoaded', () => {
                if (!_.isEmpty(config.settings)) {
                    lib.config.settings = { ...lib.config.settings, ...config.settings };
                    app.log('verbose', `Lib settings of [${lib.name}] is overrided.`);
                }
            });

            let relativePath = path.relative(app.workingPath, appPath);
            app.log('verbose', `Loading lib [${lib.name}] from "${relativePath}" ...`);

            await lib.start_();

            app.registerLib(lib);

            app.log('verbose', `Lib [${lib.name}] is loaded.`);
        });
    },
};
