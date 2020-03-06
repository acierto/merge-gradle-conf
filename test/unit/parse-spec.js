import {parseFile} from '../../app/parse';
import paths from '../../gulp/utils/paths';

describe('Parse', () => {
    it('should parse a file and return back json object', () => {
        expect(parseFile(`${paths.testDir}/unit/dependencies1.conf`)).toEqual({
            myBestPluginVersion: '6.0.0',
            greenFieldPluginVersion: '0.0.1-alpha.108',
            somePluginVersion: '0.0.1+2013.03.13-14.47.00'
        });
    });
});
