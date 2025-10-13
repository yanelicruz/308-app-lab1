
const stockPortfolio = require('./stockportfolio.js');

beforeEach(() => 
{
    port = new stockPortfolio();
});

test('emptyPort() is true for empty portfolio', () => 
{
    expect(port.stocks).toEqual({});
    expect(port.emptyPort()).toBe(true);
});

test('emptyPort() is false for non empty portfolio', () => 
{
    port.stocks["RBLX"] = 3;
    expect(port.emptyPort()).toBe(false);
});

test('purchasing and selling shares of a stock', () => 
{
    port.purchaseStock('RBLX', 17);
    expect(port.stocks['RBLX']).toBe(17);
    port.sellStock('RBLX', 7);
    expect(port.stocks['RBLX']).toBe(10);
});

test('num of unique symbols and shares owned', () => 
{
    port.purchaseStock('AMC', 17);
    port.purchaseStock('RBLX', 3);
    port.purchaseStock('AMC', 3);
    expect(port.getShares('RBLX')).toBe(3);
    expect(port.symbCount()).toBe(2);
});

test('no symbs and shares w/ 0 stock', () =>
{
    port.purchaseStock('AMC', 9);
    port.sellStock('AMC', 9);
    expect(port.stocks['AMC']).toBeUndefined();
    expect(port.getShares('VEEV')).toBe(0);
});

test('overly greedy error', () => 
{
    port.purchaseStock('VEEV', 5);
    expect(() => port.sellStock('VEEV', 10)).toThrow('Not possible to sell this number of shares.');
});


/*
Reflection:
At first it was kind of difficult to write the test cases because I wasn’t used to starting from nothing. 
Not having existing code to go off of made it challenging to picture what the functions should look like, 
but over time I started enjoying the freedom of naming my own functions and knowing exactly what the tests 
should return before writing the actual code. It took a little longer than usual to complete everything, 
but I liked the process a lot more since it made me think more critically and stay engaged since I was constantly 
switching between writing tests and implementing code.
*/
