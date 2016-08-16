/**
 * Created by Casa on 16/08/2016.
 */

describe('My first Gagarin test suite', function () {
    var server = meteor();
    it('should just work', function () {
        return server.execute(function () { console.log('I am alive!');});
    });
});