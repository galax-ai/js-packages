/**
 * Enable customized settings
 * @module Feature_Settings
 *
 * "settings": {
 *     "key": 1,
 *     "env:development": {
 *         "key": 2
 *     },
 *     "stage:ppe": {
 *         "key": 3
 *     }
 * }
 */

import { InvalidConfiguration } from '@galaxar/types';
import { _ } from '@galaxar/utils';
import Feature from '../Feature';

const KEY_ENV = 'env:';
const KEY_STAGE = 'stage:';
const Stage = process.env.STAGE_ENV;

export default {
    /**
     * This feature is loaded at init stage
     * @member {string}
     */
    stage: Feature.INIT,

    /**
     * Load the feature
     * @param {App} app - The cli app module object
     * @param {object} settings - Customized settings
     * @returns {Promise.<*>}
     */
    load_: function (app, settings) {
        let result = {};
        let envSettings;
        let stageSettings;

        _.each(settings, (value, key) => {
            if (key.startsWith(KEY_ENV)) {
                let envKey = key.substring(KEY_ENV.length);
                if (envKey === app.env) {
                    envSettings = value;
                    if (!_.isPlainObject(value)) {
                        throw new InvalidConfiguration('Invalid env settings', app, `settings.${key}`);
                    }
                }
            } else if (Stage && key.startsWith(KEY_STAGE)) {
                let stageKey = key.substring(KEY_ENV.length);
                if (stageKey === Stage) {
                    stageSettings = value;
                    if (!_.isPlainObject(value)) {
                        throw new InvalidConfiguration('Invalid stage settings', app, `settings.${key}`);
                    }
                }
            } else {
                result[key] = value;
            }
        });

        app.settings = Object.assign(result, envSettings, stageSettings);
    },
};
