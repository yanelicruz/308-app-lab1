
class stockPortfolio 
{
    constructor() 
    {
        this.stocks = {};
    }

    emptyPort() 
    {
        return !Object.keys(this.stocks).length;
    }

    purchaseStock(symbol, shares) 
    {
        this.stocks[symbol] = (this.stocks[symbol] || 0) + shares;
    }

    sellStock(symbol, shares) 
    {
        const currShares = this.stocks[symbol];
    
        if (!currShares) return;

        if (currShares < shares) 
        {
            throw new Error('Not possible to sell this number of shares.');
        }

        const leftover = currShares - shares;
        leftover > 0 ? (this.stocks[symbol] = leftover) : delete this.stocks[symbol];
    }

    symbCount() 
    {
        return Object.keys(this.stocks).length;
    }

    getShares(symbol) 
    {
        return this.stocks[symbol] || 0;
    }
}

module.exports = stockPortfolio;
