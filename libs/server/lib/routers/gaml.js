import path from 'node:path';
import { globSync } from 'glob';
import { _, naming, text, hasMethod, esmCheck } from '@galaxar/utils';

/**
 * Gaml router.
 * @module Router_Gaml
 */

const appendId = (baseEndpoint, idName) => (idName ? `${baseEndpoint}/:${idName}` : baseEndpoint);

/**
 * Create a gaml router.
 * @param {*} app
 * @param {string} baseRoute
 * @param {object} options
 * @property {string} [options.resourcesPath]
 * @property {object|array} [options.middlewares]
 * @example
 *  '<base path>': {
 *      gaml: {
 *          resourcesPath:
 *          middlewares:
 *      }
 *  }
 *
 *  route                          http method    function of ctrl
 *  /:resource                     get            find
 *  /:resource                     post           post
 *  /:resource/:id                 get            findById
 *  /:resource/:id                 put            updateById
 *  /:resource/:id                 del            deleteById
 */
const gamlRouter = (app, baseRoute, options) => {
    const Router = app.tryRequire('@koa/router');

    let resourcePath = path.resolve(app.sourcePath, options.resourcesPath || 'resources');

    let router = baseRoute === '/' ? new Router() : new Router({ prefix: text.dropIfEndsWith(baseRoute, '/') });

    app.useMiddleware(router, app.getMiddlewareFactory('jsonError')(options.errorOptions, app), 'jsonError');

    if (options.middlewares) {
        app.useMiddlewares(router, options.middlewares);
    }

    let resourcesPath = path.join(resourcePath, '**/*.js');
    let files = globSync(resourcesPath);

    _.each(files, (filepath) => {
        let controller = esmCheck(require(filepath));

        if (typeof controller === 'function') {
            controller = new controller(app);
        }

        const relativePath = path.relative(resourcePath, filepath);
        const dirPath = path.dirname(relativePath);
        const entityName = path.basename(relativePath, '.js');
        const entithNameWithPath = path.join(dirPath, entityName);

        let baseEndpoint;
        if (options.remaps && entithNameWithPath in options.remaps) {
            baseEndpoint = text.ensureStartsWith(text.dropIfEndsWith(options.remaps[entithNameWithPath], '/'), '/');
        } else {
            const urlPath = entithNameWithPath
                .split('/')
                .map((p) => naming.kebabCase(p))
                .join('/');
            baseEndpoint = text.ensureStartsWith(urlPath, '/');
        }

        let idName = naming.camelCase(entityName) + 'Id';
        let endpointWithId = appendId(baseEndpoint, idName);

        if (hasMethod(controller, 'find')) {
            const _action = controller.find.bind(controller);
            const _middlewares = controller.find.__metaMiddlewares;
            app.addRoute(router, 'get', baseEndpoint, _middlewares ? [..._middlewares, _action] : _action);
        }

        if (hasMethod(controller, 'post')) {
            const _action = controller.post.bind(controller);
            const _middlewares = controller.post.__metaMiddlewares;
            app.addRoute(router, 'post', baseEndpoint, _middlewares ? [..._middlewares, _action] : _action);
        }

        if (hasMethod(controller, 'findById')) {
            const _action = (ctx) => controller.findById(ctx, ctx.params[idName]);
            const _middlewares = controller.findById.__metaMiddlewares;
            app.addRoute(router, 'get', endpointWithId, _middlewares ? [..._middlewares, _action] : _action);
        }

        if (hasMethod(controller, 'updateById')) {
            const _action = (ctx) => controller.updateById(ctx, ctx.params[idName]);
            const _middlewares = controller.updateById.__metaMiddlewares;
            app.addRoute(router, 'put', endpointWithId, _middlewares ? [..._middlewares, _action] : _action);
        }

        if (hasMethod(controller, 'deleteById')) {
            const _action = (ctx) => controller.deleteById(ctx, ctx.params[idName]);
            const _middlewares = controller.deleteById.__metaMiddlewares;
            app.addRoute(router, 'del', endpointWithId, _middlewares ? [..._middlewares, _action] : _action);
        }
    });
    app.addRouter(router);
};

export default gamlRouter;
