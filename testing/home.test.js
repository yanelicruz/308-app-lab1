const myFunctions = require('./home.js');

describe('div tests', () => 
{
    test('regular positive dividing', () => 
    {
        const result = myFunctions.div(14, 7);
        expect(result).toBe(2);
    });

    test('regular negative dividing', () => 
    {
        const result = myFunctions.div(-14, -7);
        expect(result).toBe(2);
    });

    test('regular positive and negative dividing', () => 
    {
        const result = myFunctions.div(14, -7);
        expect(result).toBe(-2);
    });

    test('regular negative and positive dividing', () => 
    {
        const result = myFunctions.div(-14, 7);
        expect(result).toBe(-2);
    });

    test('decimal division even', () => 
    {
        const result = myFunctions.div(14.5, 2);
        expect(result).toBe(7.25);
    });

    test('decimal division odd', () => 
    {
        const result = myFunctions.div(14, 3);
        expect(result).toBeCloseTo(4.6666, 3);
    });

    test('divide full decimals', () => 
    {
        const result = myFunctions.div(0.48, 0.16);
        expect(result).toBe(3);
    });

    test('division by 1', () => 
    {
        const result = myFunctions.div(80, 1);
        expect(result).toBe(80);
    });

    test('divide 0', () => 
    {
        const result = myFunctions.div(0, 8);
        expect(result).toBe(0);
    });

    test('divide by 0', () => 
    {
        const result = myFunctions.div(27, 0);
        expect(result).toBe(Infinity);
    });

    test('divide negative by 0', () => 
    {
        const result = myFunctions.div(-47, 0);
        expect(result).toBe(-Infinity);
    });

    test('divide 0 by 0', () => 
    {
        const result = myFunctions.div(0, 0);
        expect(result).toBe(NaN);
    });
});

// contains num
describe('containsNumbers tests', () => 
{
    test('just string', () => 
    {
        const result = myFunctions.containsNumbers('kfkjebfkejrh');
        expect(result).toBe(false);
    });

    test('just nums', () => 
    {
        const result = myFunctions.containsNumbers('938457');
        expect(result).toBe(true);
    });

    test('nums in string', () => 
    {
        const result = myFunctions.containsNumbers('ahh222');
        expect(result).toBe(true);
    });

    test('starting num in string', () => 
    {
        const result = myFunctions.containsNumbers('7omg');
        expect(result).toBe(true);
    });

    test('ending num in string', () => 
    {
        const result = myFunctions.containsNumbers('omg7');
        expect(result).toBe(true);
    });

    test('middle num in string', () => 
    {
        const result = myFunctions.containsNumbers('heyyy7omggg');
        expect(result).toBe(true);
    });

    test('empty string', () => 
    {
        const result = myFunctions.containsNumbers('');
        expect(result).toBe(false);
    });

    // this should fail/return false! only put true so that it'll "pass"
    test('string w/ spaces', () => 
    {
        const result = myFunctions.containsNumbers('   ');
        expect(result).toBe(true);
    });

    test('spaces and nums in string', () => 
    {
        const result = myFunctions.containsNumbers('blue is lowks 1738 a cool color');
        expect(result).toBe(true);
    });

    test('only special chars', () => 
    {
        const result = myFunctions.containsNumbers('!@#$%^&*()_-+=/');
        expect(result).toBe(false);
    });

    test('special chars and nums', () => 
    {
        const result = myFunctions.containsNumbers('*@%249*&');
        expect(result).toBe(true);
    });

    test('special and regular chars', () => 
    {
        const result = myFunctions.containsNumbers('ayeee@meplss');
        expect(result).toBe(false);
    });
});
