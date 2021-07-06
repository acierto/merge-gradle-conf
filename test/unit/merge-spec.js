import {mergeFiles} from '../../app/merge';
import dependencies1Conf from './dependencies1.conf';
import dependencies2Conf from './dependencies2.conf';

describe('Merge', () => {
    it('should merge two files line by line based on version precedence', () => {
        const expectedMerge = {
            dependencyManagement: {
                dependencies: ['plugins:some-plugin:$versionOne', 'plugins:another-plugin:$versionTwo'],
                versions: {
                    abcPlugin: '1.1.1',
                    greenFieldPluginVersion: '0.0.1-alpha.109',
                    myBestPluginVersion: '6.0.0',
                    somePluginVersion: '0.0.2',
                    specificPlugin: '3.0.2'
                }
            }
        };

        expect(mergeFiles(dependencies1Conf, dependencies2Conf)).toEqual(expectedMerge);
        expect(mergeFiles(dependencies2Conf, dependencies1Conf)).toEqual(expectedMerge);
    });
});
