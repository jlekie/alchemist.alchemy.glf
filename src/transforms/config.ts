import { TransformationHandler, Context } from '@jlekie/alchemist';
import { Config } from '@jlekie/git-laminar-flow-cli';

import * as Zod from 'zod';

const ConfigSchema = Zod.object({
    included: Zod.record(Zod.string(), Zod.string())
});

export const handler: TransformationHandler = async (context, options, params) => {
    const parsedOptions = ConfigSchema.parse(options);
    const config = Config.parse(context.payload);

    return new Context({
        ...config.toContextHash(),
        submodules: config.submodules.filter(s => true).map(s => s.toContextHash())
    });
 
    // const filteredConfigs = config.submodules.map(s => s.config);

    // return filteredConfigs.map(c => new Context(c.toHash()));
}
