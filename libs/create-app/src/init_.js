import path from 'node:path';
import { fs } from '@galaxar/sys';
import { modesDetail } from "./modes";
import { getTempPath, download_, untar_ } from "./utils";
import * as steps from "./steps";

async function downloadTemplate_(app, options) {
    let templateUrl;

    if (options.appMode === 'custom') {
        templateUrl = cmd.option("template");          
    } else {
        templateUrl = modesDetail[options.appMode].url;
    }

    const tempDir = getTempPath('template', options.appMode);
    await fs.emptyDir(tempDir);

    const tarFile = path.join(tempDir, 'template.tgz');
    await download_(app, templateUrl, tarFile);    

    app.log('verbose', `Saved to ${tarFile}`);

    return { 
        tempDir,
        tarFile
    };
}

 async function init_(app, options) {
    const { tempDir, tarFile } = await downloadTemplate_(app, options);

    const tempPath = path.join(tempDir, 'extracted');
    await fs.emptyDir(tempPath);
    await untar_(tarFile, tempPath);

    const initFile = path.join(tempPath, '.galaxar.init.js');
    const templateMetadata = require(initFile);
    const targetPath = steps.ensureTargetPath(options);

    if (templateMetadata.newProject) {
        steps.ensureSafeToCreateProject(app, targetPath, ["package.json"]);        
    }

    await steps.copyFiles_(app, tempPath, targetPath, !templateMetadata.newProject && templateMetadata.noOverriding);

    if (templateMetadata.newProject) {
        // For new project, update the name in package.json
        await steps.updatePackageJson_(app, targetPath, templateMetadata, options, [
            (packageConfig, $_, options) => {
                packageConfig.name = options.appName;
            }
        ]);
    }

    // update npmrc, remove unused files
    await steps.common_(app, targetPath, templateMetadata, options);

    await steps.npmInstall_(app, targetPath, options);
};

export default init_;