import Jxs from '../lib';

describe('jxs:join', function () {
    it('array', function () {
        let array = ['a', 'b', 'c'];

        let transformed = Jxs.evaluate(array, { $join: '|' });
        //console.log(transformed)
        transformed.should.be.eql('a|b|c');
    });

    it('string', function () {
        let array = 'abc';

        should.throws(
            () => Jxs.evaluate(array, { $join: '|' }),
            'The value to take a "Join" operator must be an array.'
        );
    });
});
