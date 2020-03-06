import {mergeFiles} from '../../app/merge';
import dependencies1Conf from './dependencies1.conf';
import dependencies2Conf from './dependencies2.conf';

describe('Merge', () => {
    it('should merge two files line by line based on version precedence', () => {
        expect(mergeFiles(dependencies1Conf, dependencies2Conf)).toEqual({
            abcPlugin: '1.1.1',
            myBestPluginVersion: '6.0.0',
            greenFieldPluginVersion: '0.0.1-alpha.109',
            somePluginVersion: '0.0.1+2013.03.13-16.47.00',
            specificPlugin: '3.0.2'
        });
    });
});
