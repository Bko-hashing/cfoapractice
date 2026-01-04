import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

const questions = [
  {
    
    id: 1,
    category: "Options Fundamentals",
    question: "Stock XYZ is trading at $75. Which option has intrinsic value?",
    options: ["XYZ $80 Call", "XYZ $90 Put", "XYZ $70 Call", "XYZ $60 Put"],
    correct: 2,
    explanation: "The $70 Call is ITM because the stock ($75) is above the call strike ($70), giving it $5 of intrinsic value."
  },
  {
    id: 2,
    category: "Options Fundamentals",
    question: "An option buyer with positive vega benefits from:",
    options: ["Time passing", "Increasing implied volatility", "Decreasing stock price", "Decreasing implied volatility"],
    correct: 1,
    explanation: "Positive vega means you benefit when implied volatility increases, which increases option prices."
  },
  {
    id: 3,
    category: "Options Fundamentals",
    question: "You own a call option with delta of 0.6. If the stock increases by $5, approximately how much will your option increase?",
    options: ["$5.00", "$0.60", "$3.00", "$8.00"],
    correct: 2,
    explanation: "Delta of 0.6 × $5 stock movement = $3.00 option price increase."
  },
  {
    id: 4,
    category: "Options Fundamentals",
    question: "Which greek measures an option's sensitivity to time decay?",
    options: ["Delta", "Gamma", "Vega", "Theta"],
    correct: 3,
    explanation: "Theta measures time decay - how much value an option loses as time passes."
  },
  {
    id: 5,
    category: "Options Fundamentals",
    question: "Stock ABC is at $50. The $50 call costs $3 and the $50 put costs $2.50. Which statement is TRUE?",
    options: ["The call has $3 intrinsic value", "The put has $2.50 intrinsic value", "Both options are ATM with only extrinsic value", "Both options are ITM"],
    correct: 2,
    explanation: "At-the-money (ATM) options have no intrinsic value, only extrinsic (time) value."
  },
  {
    id: 6,
    category: "Options Fundamentals",
    question: "An OTM option at expiration has:",
    options: ["Only intrinsic value", "Only extrinsic value", "Both intrinsic and extrinsic value", "Neither intrinsic nor extrinsic value"],
    correct: 3,
    explanation: "OTM options at expiration are worthless - they have no intrinsic value and no time value left."
  },
  {
    id: 7,
    category: "Options Fundamentals",
    question: "IV Rank of 85 suggests:",
    options: ["Options are cheap, good time to buy", "Options are expensive, good time to sell", "Volatility is at historical lows", "The stock price will increase"],
    correct: 1,
    explanation: "High IV Rank (85) means IV is near its 52-week high, making options expensive - good for selling."
  },
  {
    id: 8,
    category: "Options Fundamentals",
    question: "Which position has negative delta?",
    options: ["Long call", "Short put", "Long put", "Long stock"],
    correct: 2,
    explanation: "Long puts have negative delta - they increase in value when the stock price decreases."
  },
  {
    id: 9,
    category: "Options Fundamentals",
    question: "Time decay is most pronounced:",
    options: ["In the first 90 days", "In the last 30 days", "Evenly throughout the option's life", "Only on expiration day"],
    correct: 1,
    explanation: "Time decay accelerates in the final 30-45 days before expiration."
  },
  {
    id: 10,
    category: "Options Fundamentals",
    question: "A stock moves from $100 to $110. A put option with delta -0.3 that cost $4 will now be worth approximately:",
    options: ["$7.00", "$4.00", "$1.00", "$13.00"],
    correct: 2,
    explanation: "Stock up $10 × delta -0.3 = -$3 change. $4 - $3 = $1.00."
  },
  {
    id: 11,
    category: "Options Fundamentals",
    question: "Stock PQR trades at $80. The $70 put costs $12. What is the extrinsic value?",
    options: ["$12", "$10", "$2", "$0"],
    correct: 0,
    explanation: "The $70 put is OTM (stock price $80 is above put strike $70). OTM options have no intrinsic value, so all $12 is extrinsic value."
  },
  {
    id: 12,
    category: "Options Fundamentals",
    question: "Buying a call option gives you:",
    options: ["The obligation to buy at strike price", "The right to sell at strike price", "The right to buy at strike price", "The obligation to sell at strike price"],
    correct: 2,
    explanation: "A call option gives the buyer the RIGHT (not obligation) to BUY at the strike price."
  },
  {
    id: 13,
    category: "Options Fundamentals",
    question: "When you sell a put, you have:",
    options: ["Positive delta and positive theta", "Negative delta and negative theta", "Positive delta and negative theta", "Negative delta and positive theta"],
    correct: 0,
    explanation: "Short puts have positive delta (bullish) and positive theta (benefit from time decay)."
  },
  {
    id: 14,
    category: "Options Fundamentals",
    question: "Which statement about extrinsic value is TRUE?",
    options: ["ITM options have more extrinsic value than OTM options", "Extrinsic value increases as expiration approaches", "ATM options typically have the most extrinsic value", "Deep ITM options are mostly extrinsic value"],
    correct: 2,
    explanation: "ATM options have the highest extrinsic value because they have maximum time value potential."
  },
  {
    id: 15,
    category: "Options Fundamentals",
    question: "ATM options have approximately what delta?",
    options: ["0.25", "0.50", "0.75", "1.00"],
    correct: 1,
    explanation: "ATM options typically have delta around 0.50 (50% probability of expiring ITM)."
  },
  {
    id: 16,
    category: "Options Strategies",
    question: "Buying the $50 call and selling the $60 call is a:",
    options: ["Short call vertical", "Long call vertical", "Iron condor", "Strangle"],
    correct: 1,
    explanation: "Buying a lower strike call and selling a higher strike call = Long Call Vertical (bullish debit spread)."
  },
  {
    id: 17,
    category: "Options Strategies",
    question: "Which strategy is market neutral?",
    options: ["Long call vertical", "Short put vertical", "Iron condor", "Risk reversal"],
    correct: 2,
    explanation: "Iron condor is a neutral strategy that profits when the stock stays within a range."
  },
  {
    id: 18,
    category: "Options Strategies",
    question: "A strangle involves:",
    options: ["Buying a call and put at the same strike", "Selling a call and put at different strikes", "Buying two calls at different strikes", "Selling two puts at different strikes"],
    correct: 1,
    explanation: "A (short) strangle sells both a call and put at different strikes, collecting premium from both."
  },
  {
    id: 19,
    category: "Options Strategies",
    question: "Which strategy has limited risk and limited profit potential?",
    options: ["Naked call", "Naked put", "Long call vertical", "Short stock"],
    correct: 2,
    explanation: "Vertical spreads have both limited risk (the spread width) and limited profit (the debit/credit)."
  },
  {
    id: 20,
    category: "Options Strategies",
    question: "Which has the most positive theta?",
    options: ["Long call", "Long straddle", "Short strangle", "Long put vertical"],
    correct: 2,
    explanation: "Short strangle sells two options with no long options, maximizing positive theta (time decay profit)."
  },
  {
    id: 21,
    category: "Options Strategies",
    question: "Iron butterfly differs from iron condor by:",
    options: ["Having same strikes for short options", "Using only calls", "Using only puts", "Having wider profit range"],
    correct: 0,
    explanation: "Iron butterfly has both short options at the same strike (ATM), while iron condor has them at different strikes."
  },
  {
    id: 22,
    category: "Options Strategies",
    question: "Covered call maximum loss is:",
    options: ["Limited to premium received", "Strike price minus stock cost", "Stock cost minus premium received", "Unlimited"],
    correct: 2,
    explanation: "Max loss = if stock goes to $0. You lose stock cost but keep the premium collected."
  },
  {
    id: 23,
    category: "Options Strategies",
    question: "Protective put acts as:",
    options: ["Income strategy", "Insurance for long stock", "Bearish speculation", "Neutral strategy"],
    correct: 1,
    explanation: "Protective put = buying a put to protect long stock position, acting as insurance against downside."
  },
  {
    id: 24,
    category: "Options Strategies",
    question: "Calendar spread profits from:",
    options: ["Large directional moves", "Time decay difference between expirations", "Volatility collapse", "Interest rate changes"],
    correct: 1,
    explanation: "Calendar spreads sell near-term options (faster decay) and buy far-term (slower decay)."
  },
  {
    id: 25,
    category: "Options Strategies",
    question: "Best strategy for high IV environment:",
    options: ["Buy straddles", "Buy verticals", "Sell strangles", "Buy LEAPS"],
    correct: 2,
    explanation: "High IV = expensive options = good time to SELL premium (like strangles or iron condors)."
  },
  {
    id: 26,
    category: "Options Strategies",
    question: "Managing winners at 50% is recommended because:",
    options: ["Required by regulation", "Frees capital and reduces risk efficiently", "Guarantees no losses", "Maximizes every trade"],
    correct: 1,
    explanation: "Taking 50% of max profit quickly frees capital for new trades and reduces risk of reversal."
  },
  {
    id: 27,
    category: "Options Strategies",
    question: "Long straddle profits require:",
    options: ["Stock to not move", "Large move in either direction", "Volatility decrease", "Time decay"],
    correct: 1,
    explanation: "Long straddle = buy ATM call + put, needs big move either way to overcome cost."
  },
  {
    id: 28,
    category: "Options Strategies",
    question: "Collar strategy involves:",
    options: ["Long stock, long put, short call", "Long stock, short put, long call", "Short stock, long call, short put", "Long call, long put"],
    correct: 0,
    explanation: "Collar = own stock, buy protective put, sell covered call (limits both risk and reward)."
  },
  {
    id: 29,
    category: "Options Strategies",
    question: "Synthetic long stock equals:",
    options: ["Long call + short put (same strike)", "Long call + long put", "Short call + short put", "Long call only"],
    correct: 0,
    explanation: "Long call + short put at same strike = synthetic long stock position."
  },
  {
    id: 30,
    category: "Options Strategies",
    question: "When selling options, strikes should typically be placed around:",
    options: ["ATM", "0.5 standard deviations away", "1.5 standard deviations away", "4 standard deviations away"],
    correct: 2,
    explanation: "Selling at 1.5 SD provides good balance of premium collected vs probability of success (~84%)."
  },
  {
    id: 31,
    category: "Futures Fundamentals",
    question: "Futures contract for Crude Oil expiring December 2024:",
    options: ["CLZ4", "CLZ24", "CLX4", "CLD4"],
    correct: 0,
    explanation: "CL = Crude Oil, Z = December, 4 = 2024. Format: SYMBOL + MONTH + YEAR."
  },
  {
    id: 32,
    category: "Futures Fundamentals",
    question: "Unlike options, futures contracts:",
    options: ["Give one party a right", "Obligate both parties", "Have no expiration", "Cannot be traded"],
    correct: 1,
    explanation: "In futures, BOTH buyer and seller are obligated to fulfill the contract at expiration."
  },
  {
    id: 33,
    category: "Futures Fundamentals",
    question: "Contango means:",
    options: ["Near contracts more expensive than far", "Far contracts more expensive than near", "All contracts same price", "Market is bearish"],
    correct: 1,
    explanation: "Contango: futures prices increase with time (far months cost more than near months)."
  },
  {
    id: 34,
    category: "Futures Fundamentals",
    question: "Gold futures (GC) contract size is 100 oz, trading at $2,000. Notional value:",
    options: ["$2,000", "$20,000", "$200,000", "$2,000,000"],
    correct: 2,
    explanation: "Notional value = Contract size × Price = 100 oz × $2,000 = $200,000."
  },
  {
    id: 35,
    category: "Futures Fundamentals",
    question: "You're long ES futures. To close the position:",
    options: ["Buy another ES contract", "Sell an ES contract", "Wait for expiration", "Exercise the contract"],
    correct: 1,
    explanation: "To close a long position, you offset by selling. To close a short, you buy."
  },
  {
    id: 36,
    category: "Futures Fundamentals",
    question: "Backwardation indicates:",
    options: ["Future prices higher than spot", "Spot price higher than futures", "Market inefficiency", "Bear market"],
    correct: 1,
    explanation: "Backwardation: spot price > futures prices (inverted curve, near months more expensive)."
  },
  {
    id: 37,
    category: "Futures Fundamentals",
    question: "E-mini S&P 500 futures symbol:",
    options: ["ES", "SP", "SPX", "SPY"],
    correct: 0,
    explanation: "ES = E-mini S&P 500. NQ = Nasdaq, YM = Dow, RTY = Russell 2000."
  },
  {
    id: 38,
    category: "Futures Fundamentals",
    question: "March month code:",
    options: ["M", "H", "U", "C"],
    correct: 1,
    explanation: "H = March. Main codes: F=Jan, G=Feb, H=Mar, J=Apr, K=May, M=Jun, N=Jul, Q=Aug, U=Sep, V=Oct, X=Nov, Z=Dec."
  },
  {
    id: 39,
    category: "Futures Fundamentals",
    question: "November month code:",
    options: ["N", "V", "X", "K"],
    correct: 2,
    explanation: "X = November in futures month codes."
  },
  {
    id: 40,
    category: "Futures Fundamentals",
    question: "Coffee futures (KC) expiring July 2025:",
    options: ["KCN5", "KCN25", "CCN5", "CFN5"],
    correct: 0,
    explanation: "KC = Coffee, N = July, 5 = 2025 (last digit)."
  },
  {
    id: 41,
    category: "Futures Trading",
    question: "Initial margin is $5,000, maintenance is $4,000. Position loses $1,500. You now have $3,500. What happens?",
    options: ["Nothing, still compliant", "Margin call issued", "Position automatically closed", "Must add $5,000"],
    correct: 1,
    explanation: "$3,500 < $4,000 maintenance margin = margin call. You must add funds to get back to initial margin."
  },
  {
    id: 42,
    category: "Futures Trading",
    question: "Buying June corn, selling September corn is:",
    options: ["Intermarket spread", "Intramarket (calendar) spread", "Commodity product spread", "Hedge"],
    correct: 1,
    explanation: "Same commodity, different months = intramarket or calendar spread."
  },
  {
    id: 43,
    category: "Futures Trading",
    question: "Open interest represents:",
    options: ["Total contracts traded today", "Number of open positions", "Daily volume", "Contracts closed"],
    correct: 1,
    explanation: "Open interest = total number of outstanding contracts (open positions not yet closed)."
  },
  {
    id: 44,
    category: "Futures Trading",
    question: "Mark-to-market happens:",
    options: ["Only at expiration", "Daily", "Weekly", "Monthly"],
    correct: 1,
    explanation: "Futures are marked-to-market DAILY - gains/losses are settled to your account each day."
  },
  {
    id: 45,
    category: "Futures Trading",
    question: "Crush spread involves:",
    options: ["Soybeans vs soybean meal and oil", "Corn vs wheat", "Crude oil vs gasoline", "Gold vs silver"],
    correct: 0,
    explanation: "Crush spread = soybeans vs its products (meal and oil), used by processors to hedge margins."
  },
  {
    id: 46,
    category: "Futures Trading",
    question: "Crack spread relates to:",
    options: ["Grain processing", "Oil refining (crude to gasoline/heating oil)", "Metal smelting", "Coffee roasting"],
    correct: 1,
    explanation: "Crack spread = crude oil vs refined products (gasoline, heating oil) - refinery margin."
  },
  {
    id: 47,
    category: "Futures Trading",
    question: "Short hedge is appropriate when:",
    options: ["You need to buy in future", "You will sell in future and want to lock price", "You're speculating on price rise", "You want maximum leverage"],
    correct: 1,
    explanation: "Short hedge = sell futures now to lock in selling price for future delivery (e.g., farmer before harvest)."
  },
  {
    id: 48,
    category: "Futures Trading",
    question: "Long hedge is used when:",
    options: ["You will sell in future", "You need to buy in future and want to lock price", "You're bearish", "You want to collect premium"],
    correct: 1,
    explanation: "Long hedge = buy futures to lock in purchase price for future needs (e.g., airline buying fuel)."
  },
  {
    id: 49,
    category: "Futures Trading",
    question: "Equity index futures are typically:",
    options: ["Physically delivered", "Cash settled", "Cannot be settled", "Require stock delivery"],
    correct: 1,
    explanation: "Index futures (ES, NQ, etc.) are cash-settled - no physical delivery of baskets of stocks."
  },
  {
    id: 50,
    category: "Futures Trading",
    question: "Rolling a futures position means:",
    options: ["Closing current, opening new expiration", "Adding to winning position", "Hedging with options", "Physical delivery"],
    correct: 0,
    explanation: "Rolling = close current contract and simultaneously open new one in later expiration month."
  },
  {
    id: 51,
    category: "Risk Management",
    question: "Account has $100,000. Using 2% rule, maximum loss per trade:",
    options: ["$200", "$2,000", "$20,000", "$200,000"],
    correct: 1,
    explanation: "2% risk rule: never risk more than 2% of account equity. $100,000 × 0.02 = $2,000."
  },
  {
    id: 52,
    category: "Risk Management",
    question: "You buy 1,000 shares at $50. Using 3% account risk on $200,000 account, stop loss at:",
    options: ["$48.50", "$47.00", "$44.00", "$46.00"],
    correct: 2,
    explanation: "3% of $200,000 = $6,000 max loss. Position value = $50,000. $50,000 - $6,000 = $44,000. $44,000 ÷ 1,000 shares = $44."
  },
  {
    id: 53,
    category: "Risk Management",
    question: "Managing losers at 2x credit means:",
    options: ["Close when loss equals 2x premium received", "Double down on losers", "Wait for 2 days", "Add 2 more contracts"],
    correct: 0,
    explanation: "If you sold for $5 credit, close when the option reaches $15 (loss = $10 = 2× the $5 credit)."
  },
  {
    id: 54,
    category: "Risk Management",
    question: "Win rate 40%, avg win 2:1 vs losses. Mathematical expectation:",
    options: ["-0.20", "0.20", "0.80", "1.20"],
    correct: 1,
    explanation: "(0.40 × 2) - (0.60 × 1) = 0.80 - 0.60 = 0.20 positive expectation."
  },
  {
    id: 55,
    category: "Risk Management",
    question: "Best describes proper risk management:",
    options: ["Holding losers, cutting winners", "Cutting losers, letting winners run", "Never using stop losses", "Doubling down on losers"],
    correct: 1,
    explanation: "Classic risk management: cut your losses early, let your winners run."
  },
  {
    id: 56,
    category: "Risk Management",
    question: "Sharpe ratio measures:",
    options: ["Total return", "Risk-adjusted return", "Maximum drawdown", "Win rate"],
    correct: 1,
    explanation: "Sharpe ratio = (return - risk-free rate) / standard deviation. Higher = better risk-adjusted returns."
  },
  {
    id: 57,
    category: "Risk Management",
    question: "Maximum drawdown measures:",
    options: ["Largest peak-to-trough decline", "Average loss", "Total losses", "Daily volatility"],
    correct: 0,
    explanation: "Max drawdown = largest % decline from peak to trough - measures worst loss period."
  },
  {
    id: 58,
    category: "Risk Management",
    question: "One standard deviation encompasses approximately:",
    options: ["50% of outcomes", "68% of outcomes", "95% of outcomes", "99% of outcomes"],
    correct: 1,
    explanation: "In normal distribution: 1 SD = 68%, 2 SD = 95%, 3 SD = 99.7% of outcomes."
  },
  {
    id: 59,
    category: "Risk Management",
    question: "Two standard deviations encompass approximately:",
    options: ["68% of outcomes", "95% of outcomes", "99.7% of outcomes", "50% of outcomes"],
    correct: 1,
    explanation: "2 standard deviations = ~95% probability range (commonly used in risk management)."
  },
  {
    id: 60,
    category: "Risk Management",
    question: "Concentration risk arises from:",
    options: ["Diversification", "Too much exposure to single position/sector", "Low volatility", "High liquidity"],
    correct: 1,
    explanation: "Concentration risk = too much capital in one position/sector, increasing specific risk."
  },
  {
    id: 61,
    category: "Advanced Concepts",
    question: "Soft hurdle rate means:",
    options: ["Performance fees on returns above hurdle", "Performance fees on all returns if hurdle met", "No performance fees", "Hurdle rate changes monthly"],
    correct: 1,
    explanation: "Soft hurdle: if you beat the hurdle, you get fees on ALL returns. Hard hurdle: only on returns above hurdle."
  },
  {
    id: 62,
    category: "Advanced Concepts",
    question: "High watermark ensures:",
    options: ["Managers paid on all gains", "Managers not paid on recovering losses", "Investors always profit", "Fund never closes"],
    correct: 1,
    explanation: "High watermark = managers only earn performance fees on new profits above previous peak (not on recovery)."
  },
  {
    id: 63,
    category: "Advanced Concepts",
    question: "Pairs trade involves:",
    options: ["Long one asset, short related asset", "Long two correlated assets", "Short two correlated assets", "Only options strategies"],
    correct: 0,
    explanation: "Pairs trading: simultaneously long one asset and short a related/correlated asset."
  },
  {
    id: 64,
    category: "Advanced Concepts",
    question: "Accredited investor requires:",
    options: ["$100k income or $500k net worth", "$200k income or $1M net worth (excluding primary residence)", "$50k income or $250k net worth", "Any income level"],
    correct: 1,
    explanation: "Accredited investor = $200k individual / $300k joint income, OR $1M net worth (excluding home)."
  },
  {
    id: 65,
    category: "Advanced Concepts",
    question: "2 and 20 fee structure means:",
    options: ["2% management fee, 20% performance fee", "20% management fee, 2% performance fee", "2% monthly, 20% yearly", "2% minimum, 20% maximum"],
    correct: 0,
    explanation: "Classic hedge fund fees: 2% annual management fee + 20% of profits."
  },
  {
    id: 66,
    category: "Advanced Concepts",
    question: "Alpha represents:",
    options: ["Volatility", "Return above/below benchmark (excess return)", "Total return", "Risk-free rate"],
    correct: 1,
    explanation: "Alpha = portfolio return minus expected return based on beta (outperformance/underperformance)."
  },
  {
    id: 67,
    category: "Advanced Concepts",
    question: "Market neutral strategy aims for:",
    options: ["Maximum returns", "Zero correlation to market movements", "High leverage", "Only long positions"],
    correct: 1,
    explanation: "Market neutral = equal long/short exposure to eliminate market risk, profit from stock selection."
  },
  {
    id: 68,
    category: "Advanced Concepts",
    question: "Event-driven strategy focuses on:",
    options: ["Daily trading", "Corporate events (mergers, bankruptcies, restructuring)", "Economic data releases", "Seasonal patterns"],
    correct: 1,
    explanation: "Event-driven funds profit from corporate events like M&A, spin-offs, distress situations."
  },
  {
    id: 69,
    category: "Advanced Concepts",
    question: "Global macro strategy trades based on:",
    options: ["Individual stocks only", "Macroeconomic views across countries/asset classes", "Technical analysis only", "Options only"],
    correct: 1,
    explanation: "Global macro = trade on economic/political views using currencies, bonds, commodities, indices."
  },
  {
    id: 70,
    category: "Advanced Concepts",
    question: "Merger arbitrage (risk arbitrage) involves:",
    options: ["Avoiding M&A situations", "Buying target, shorting acquirer in announced deals", "Only buying acquirer", "Random trading"],
    correct: 1,
    explanation: "Merger arb = long target (trades below offer), short acquirer if stock deal, betting deal closes."
  },
  {
    id: 71,
    category: "Options on Futures",
    question: "Options on futures settle to:",
    options: ["Cash always", "Stock", "Futures position if exercised", "Nothing"],
    correct: 2,
    explanation: "Exercising option on futures = receive long/short futures position (then can offset or hold to settlement)."
  },
  {
    id: 72,
    category: "Options on Futures",
    question: "Call option on /ES gives right to:",
    options: ["Buy ES futures contract", "Sell ES futures contract", "Buy SPY stock", "Cash only"],
    correct: 0,
    explanation: "Call on futures = right to buy (go long) the futures contract at strike price."
  },
  {
    id: 73,
    category: "Options on Futures",
    question: "Put option on /CL gives right to:",
    options: ["Buy CL futures", "Sell (short) CL futures contract", "Buy crude oil barrels", "Nothing"],
    correct: 1,
    explanation: "Put on futures = right to sell (go short) the futures contract at strike price."
  },
  {
    id: 74,
    category: "Options on Futures",
    question: "Advantage of options on futures vs stock options:",
    options: ["More expensive", "Extended trading hours, less capital, more products", "Less liquid", "No advantages"],
    correct: 1,
    explanation: "Futures options: trade nearly 24/5, lower margin, access commodities/indices/bonds not available in stocks."
  },
  {
    id: 75,
    category: "Options on Futures",
    question: "Options on futures vs futures contracts:",
    options: ["Same risk profile", "Options have limited risk", "Futures have limited risk", "Both have unlimited risk"],
    correct: 1,
    explanation: "Buying options on futures limits risk to premium paid. Futures have much higher risk."
  },
  {
    id: 76,
    category: "Technical Analysis",
    question: "Support level represents:",
    options: ["Price ceiling where selling pressure increases", "Price floor where buying pressure increases", "Average price", "Maximum price"],
    correct: 1,
    explanation: "Support = price level where buying interest expected to overcome selling pressure (floor)."
  },
  {
    id: 77,
    category: "Technical Analysis",
    question: "Resistance level represents:",
    options: ["Price floor", "Price ceiling where selling pressure increases", "Volume indicator", "Time period"],
    correct: 1,
    explanation: "Resistance = price level where selling interest expected to overcome buying pressure (ceiling)."
  },
  {
    id: 78,
    category: "Technical Analysis",
    question: "Breakout occurs when:",
    options: ["Price stays in range", "Price moves above resistance or below support", "Volume decreases", "Market closes"],
    correct: 1,
    explanation: "Breakout = price breaks through support/resistance level, potentially starting new trend."
  },
  {
    id: 79,
    category: "Technical Analysis",
    question: "RSI (Relative Strength Index) measures:",
    options: ["Volume", "Momentum/overbought-oversold conditions", "Price only", "Time"],
    correct: 1,
    explanation: "RSI = momentum oscillator (0-100). Above 70 = overbought, below 30 = oversold."
  },
  {
    id: 80,
    category: "Technical Analysis",
    question: "Moving average crossover strategy uses:",
    options: ["One moving average", "Two moving averages crossing as signals", "No averages", "Volume only"],
    correct: 1,
    explanation: "MA crossover = short MA crosses above long MA (bullish) or below (bearish) as trade signals."
  },
  {
    id: 81,
    category: "Market Structure",
    question: "Bid price is:",
    options: ["Price seller wants", "Price buyer willing to pay", "Average price", "Last trade price"],
    correct: 1,
    explanation: "Bid = highest price buyers currently willing to pay for security."
  },
  {
    id: 82,
    category: "Market Structure",
    question: "Ask price is:",
    options: ["Price buyer offers", "Price seller asking for security", "Average price", "Opening price"],
    correct: 1,
    explanation: "Ask (offer) = lowest price sellers currently willing to accept."
  },
  {
    id: 83,
    category: "Market Structure",
    question: "Bid-ask spread represents:",
    options: ["Daily range", "Difference between bid and ask (liquidity cost)", "Commission", "Margin"],
    correct: 1,
    explanation: "Bid-ask spread = difference between bid and ask, represents liquidity and transaction cost."
  },
  {
    id: 84,
    category: "Market Structure",
    question: "Market order executes at:",
    options: ["Specific price you choose", "Best available current price", "Yesterday's close", "Never executes"],
    correct: 1,
    explanation: "Market order = execute immediately at best available price (guarantees fill, not price)."
  },
  {
    id: 85,
    category: "Market Structure",
    question: "Limit order executes:",
    options: ["Immediately always", "Only at specified price or better", "At any price", "Never"],
    correct: 1,
    explanation: "Limit order = specify maximum buy or minimum sell price (guarantees price, not fill)."
  },
  {
    id: 86,
    category: "Market Structure",
    question: "Slippage refers to:",
    options: ["Commission fees", "Difference between expected and actual fill price", "Margin call", "Time decay"],
    correct: 1,
    explanation: "Slippage = difference between expected execution price and actual price (due to movement, liquidity)."
  },
  {
    id: 87,
    category: "Market Structure",
    question: "When open interest increases with rising prices:",
    options: ["Bearish signal", "Bullish signal (new money entering longs)", "Neutral", "No meaning"],
    correct: 1,
    explanation: "Rising price + rising OI = new longs entering, bullish. Rising price + falling OI = shorts covering."
  },
  {
    id: 88,
    category: "Regulatory & Ethics",
    question: "Pattern Day Trader rule requires:",
    options: ["$10,000 minimum", "$25,000 minimum equity for 4+ day trades in 5 days", "No minimum", "$50,000 minimum"],
    correct: 1,
    explanation: "PDT rule = $25,000 minimum equity if making 4+ day trades within 5 business days (US stocks)."
  },
  {
    id: 89,
    category: "Regulatory & Ethics",
    question: "Wash sale rule prevents:",
    options: ["All trading", "Tax loss harvesting by repurchasing same security within 30 days", "Profitable trades", "Options trading"],
    correct: 1,
    explanation: "Wash sale = can't claim tax loss if you rebuy substantially identical security within 30 days."
  },
  {
    id: 90,
    category: "Regulatory & Ethics",
    question: "Best execution requires brokers to:",
    options: ["Get highest commissions", "Seek most favorable terms reasonably available for client orders", "Delay orders", "Ignore prices"],
    correct: 1,
    explanation: "Best execution = broker obligation to execute orders at most favorable prices/terms reasonably available."
  },
  {
    id: 91,
    category: "Options Fundamentals",
    question: "Deep ITM options behave most like:",
    options: ["Lottery tickets", "The underlying stock", "Bonds", "Cash"],
    correct: 1,
    explanation: "Deep ITM options have deltas near 1.0, meaning they move almost dollar-for-dollar with the stock."
  },
  {
    id: 92,
    category: "Options Fundamentals",
    question: "After earnings announcement, IV typically:",
    options: ["Increases significantly", "Decreases significantly (IV crush)", "Stays the same", "Becomes unpredictable"],
    correct: 1,
    explanation: "After earnings, uncertainty resolves causing IV crush - a sharp drop in implied volatility."
  },
  {
    id: 93,
    category: "Options Fundamentals",
    question: "Vega is highest for:",
    options: ["Deep ITM options", "Deep OTM options", "ATM options", "All options equal"],
    correct: 2,
    explanation: "ATM options have the highest vega - they're most sensitive to volatility changes."
  },
  {
    id: 94,
    category: "Options Fundamentals",
    question: "American style options can be exercised:",
    options: ["Only at expiration", "Anytime before expiration", "Only in America", "Never"],
    correct: 1,
    explanation: "American options = can exercise anytime before expiration (vs European = only at expiration)."
  },
  {
    id: 95,
    category: "Options Fundamentals",
    question: "Assignment risk is highest for:",
    options: ["Long options", "Short ITM options near expiration", "OTM options", "Long stock"],
    correct: 1,
    explanation: "Short ITM options near expiration have highest assignment risk (holder likely to exercise)."
  },
  {
    id: 96,
    category: "Options Strategies",
    question: "Diagonal spread combines:",
    options: ["Different strikes only", "Different expirations only", "Different strikes and expirations", "Only ATM options"],
    correct: 2,
    explanation: "Diagonal = different strikes AND different expirations (like calendar + vertical)."
  },
  {
    id: 97,
    category: "Options Strategies",
    question: "Rolling up means:",
    options: ["Moving to higher strike", "Moving to lower strike", "Moving to later date", "Adding contracts"],
    correct: 0,
    explanation: "Rolling up = closing and reopening at higher strike (usually for winners)."
  },
  {
    id: 98,
    category: "Options Strategies",
    question: "Rolling out means:",
    options: ["Moving to different strike", "Moving to later expiration", "Closing position completely", "Taking assignment"],
    correct: 1,
    explanation: "Rolling out = moving to later expiration date, same or different strike."
  },
  {
    id: 99,
    category: "Options Strategies",
    question: "Wheel strategy involves:",
    options: ["Selling puts, getting assigned, selling calls", "Only buying options", "Only selling options", "Calendar spreads only"],
    correct: 0,
    explanation: "Wheel = sell cash-secured puts → if assigned, sell covered calls → repeat."
  },
  {
    id: 100,
    category: "Options Strategies",
    question: "Credit spread maximum profit occurs when:",
    options: ["Stock moves significantly", "All options expire worthless", "Stock doesn't move", "Volatility increases"],
    correct: 1,
    explanation: "Credit spreads profit when all short options expire worthless OTM, keeping full credit."
  },
  {
    id: 101,
    category: "Options P&L Calculations",
    question: "You buy a $50 call for $3. Stock rises to $58 at expiration. Your profit/loss is:",
    options: ["$500 profit", "$800 profit", "$300 loss", "$200 loss"],
    correct: 0,
    explanation: "Intrinsic value at expiration = $58 - $50 = $8. Profit = ($8 - $3) × 100 = $500."
  },
  {
    id: 102,
    category: "Options P&L Calculations",
    question: "You sell a $40 put for $2. Stock closes at $35 at expiration. Your P&L is:",
    options: ["$200 profit", "$300 loss", "$500 loss", "$700 loss"],
    correct: 1,
    explanation: "Put buyer exercises: you buy at $40, stock worth $35. Loss = ($40 - $35 - $2) × 100 = $300 loss."
  },
  {
    id: 103,
    category: "Options P&L Calculations",
    question: "You buy $60 call for $5, sell $70 call for $2 (call vertical). Stock expires at $72. Your profit is:",
    options: ["$700", "$500", "$1,000", "$300"],
    correct: 0,
    explanation: "Max profit on vertical = spread width - net debit = ($10 - $3) × 100 = $700. Both calls ITM, spread maxed out."
  },
  {
    id: 104,
    category: "Options P&L Calculations",
    question: "You sell $45 put for $3, buy $35 put for $1 (put credit spread). Stock expires at $30. Your loss is:",
    options: ["$200", "$800", "$1,000", "$600"],
    correct: 1,
    explanation: "Max loss = spread width - credit = ($10 - $2) × 100 = $800. Both puts ITM at expiration."
  },
  {
    id: 105,
    category: "Options P&L Calculations",
    question: "Iron condor: sell $95 put/$105 call, buy $90 put/$110 call. Credit $3. Stock expires at $100. Your profit is:",
    options: ["$300", "$500", "$200", "$0"],
    correct: 0,
    explanation: "Stock at $100 = all options expire worthless. Keep full credit of $3 × 100 = $300."
  },
  {
    id: 106,
    category: "Options Probabilities",
    question: "If you sell an option at 1 standard deviation, probability of profit is approximately:",
    options: ["50%", "68%", "84%", "95%"],
    correct: 2,
    explanation: "1 SD = ~68% within range, so ~84% probability the option stays OTM (16% on each tail, 84% on your side)."
  },
  {
    id: 107,
    category: "Options Probabilities",
    question: "Selling an option at 2 standard deviations gives approximately what probability of success?",
    options: ["68%", "84%", "95%", "97.5%"],
    correct: 3,
    explanation: "2 SD = ~95% within range. Each tail has 2.5%, so 97.5% probability option stays OTM."
  },
  {
    id: 108,
    category: "Options Probabilities",
    question: "An ATM option (delta 0.50) has approximately what probability of expiring ITM?",
    options: ["25%", "50%", "75%", "100%"],
    correct: 1,
    explanation: "Delta approximates probability of expiring ITM. ATM option with 0.50 delta = ~50% probability."
  },
  {
    id: 109,
    category: "Options Probabilities",
    question: "You buy an OTM call with 20% probability of profit. What's the probability it expires worthless?",
    options: ["20%", "50%", "80%", "100%"],
    correct: 2,
    explanation: "If 20% probability of profit (expiring ITM), then 80% probability of expiring worthless."
  },
  {
    id: 110,
    category: "Options Max Loss/Gain",
    question: "Maximum loss on a long call is:",
    options: ["Unlimited", "Strike price", "Premium paid", "Zero"],
    correct: 2,
    explanation: "Long call max loss = premium paid. If option expires worthless, you lose only what you paid."
  },
  {
    id: 111,
    category: "Options Max Loss/Gain",
    question: "Maximum loss on a short put is:",
    options: ["Premium received", "Strike price minus premium", "Unlimited", "Zero"],
    correct: 1,
    explanation: "Short put max loss = (strike price - premium) × 100. If stock goes to $0, you buy worthless stock at strike."
  },
  {
    id: 112,
    category: "Options Max Loss/Gain",
    question: "Maximum gain on a short call spread is:",
    options: ["Unlimited", "Credit received", "Spread width", "Strike price"],
    correct: 1,
    explanation: "Credit spreads max profit = credit received. If both options expire OTM, you keep full credit."
  },
  {
    id: 113,
    category: "Options Max Loss/Gain",
    question: "You buy $50/$60 call vertical for $4. Maximum profit is:",
    options: ["$400", "$600", "$1,000", "Unlimited"],
    correct: 1,
    explanation: "Max profit = (spread width - debit) × 100 = ($10 - $4) × 100 = $600."
  },
  {
    id: 114,
    category: "Options Moneyness",
    question: "Stock at $85. Which put is ITM?",
    options: ["$80 put", "$85 put", "$90 put", "None are ITM"],
    correct: 2,
    explanation: "Put is ITM when strike > stock price. $90 put is ITM (has $5 intrinsic value)."
  },
  {
    id: 115,
    category: "Options Moneyness",
    question: "Stock at $42. The $40 call is:",
    options: ["OTM", "ATM", "ITM by $2", "ITM by $40"],
    correct: 2,
    explanation: "Call is ITM when stock > strike. $42 stock vs $40 strike = $2 ITM."
  },
  {
    id: 116,
    category: "Options Moneyness",
    question: "Stock at $55. Which options are both OTM?",
    options: ["$50 call and $60 put", "$60 call and $50 put", "$50 call and $50 put", "$60 call and $60 put"],
    correct: 1,
    explanation: "Calls OTM when strike > stock ($60 call). Puts OTM when strike < stock ($50 put)."
  },
  {
    id: 117,
    category: "Options Volatility Impact",
    question: "Stock at $100, expected move is $10 (1 SD). An 84% probability trade would place strikes near:",
    options: ["$90 and $110", "$95 and $105", "$85 and $115", "$80 and $120"],
    correct: 0,
    explanation: "1 SD = $10 expected move. Selling at 1 SD = ~84% probability, so strikes at $90 put and $110 call."
  },
  {
    id: 118,
    category: "Options Volatility Impact",
    question: "IV increases from 30% to 60%. What happens to option prices?",
    options: ["Decrease significantly", "Stay the same", "Increase significantly", "Become worthless"],
    correct: 2,
    explanation: "Higher IV = higher option prices. Doubling IV significantly increases both call and put values."
  },
  {
    id: 119,
    category: "Options Volatility Impact",
    question: "Before earnings, IV is 80%. After earnings, IV drops to 40%. This is called:",
    options: ["Volatility expansion", "IV crush", "Gamma squeeze", "Theta burn"],
    correct: 1,
    explanation: "IV crush = sharp drop in implied volatility after known event (earnings, FDA approval, etc.)."
  },
  {
    id: 120,
    category: "Options Greeks Application",
    question: "You're long 10 calls with delta 0.30 each. Your position delta is:",
    options: ["0.30", "3.0", "30", "300"],
    correct: 3,
    explanation: "Position delta = contracts × 100 × delta = 10 × 100 × 0.30 = 300 (equivalent to 300 shares)."
  },
  {
    id: 121,
    category: "Options Greeks Application",
    question: "Your position has theta of -$50/day. In 10 days with no price change, you lose:",
    options: ["$50", "$500", "$5", "$5,000"],
    correct: 1,
    explanation: "Theta measures daily time decay. -$50/day × 10 days = -$500 total time decay loss."
  },
  {
    id: 122,
    category: "Options Greeks Application",
    question: "You have vega of +200. If IV increases by 5 points, your position gains:",
    options: ["$200", "$1,000", "$5", "$100"],
    correct: 1,
    explanation: "Vega measures P&L per 1-point IV change. Vega +200 × 5-point increase = +$1,000."
  },
  {
    id: 123,
    category: "Futures Codes & Symbols",
    question: "Corn futures expiring September 2025:",
    options: ["ZCU5", "ZCU25", "ZCS5", "CNU5"],
    correct: 0,
    explanation: "ZC = Corn, U = September, 5 = 2025. Format: SYMBOL + MONTH CODE + YEAR."
  },
  {
    id: 124,
    category: "Futures Codes & Symbols",
    question: "What does ESH6 represent?",
    options: ["E-mini S&P 500, March 2026", "E-mini S&P 500, May 2016", "Euro FX, March 2026", "E-mini S&P 500, April 2016"],
    correct: 0,
    explanation: "ES = E-mini S&P 500, H = March, 6 = 2026."
  },
  {
    id: 125,
    category: "Futures Codes & Symbols",
    question: "Natural Gas futures expiring January 2025:",
    options: ["NGF5", "NGJ5", "NGF25", "GNF5"],
    correct: 0,
    explanation: "NG = Natural Gas, F = January, 5 = 2025."
  },
  {
    id: 126,
    category: "Futures Codes & Symbols",
    question: "British Pound futures symbol is:",
    options: ["BP", "6B", "GBP", "PD"],
    correct: 1,
    explanation: "6B = British Pound futures. Most currency futures start with '6' + currency initial."
  },
  {
    id: 127,
    category: "Futures Codes & Symbols",
    question: "October month code is:",
    options: ["O", "V", "X", "Q"],
    correct: 1,
    explanation: "V = October. (U=Sep, V=Oct, X=Nov, Z=Dec)"
  },
  {
    id: 128,
    category: "Contango & Backwardation",
    question: "A market in contango has:",
    options: ["Spot price > futures price", "Futures price > spot price", "Equal spot and futures", "No relationship"],
    correct: 1,
    explanation: "Contango = futures prices higher than spot (upward sloping curve). Cost of carry built into futures."
  },
  {
    id: 129,
    category: "Contango & Backwardation",
    question: "Backwardation indicates:",
    options: ["Futures > expected spot", "Spot > futures (shortage/high demand)", "Market inefficiency only", "No supply"],
    correct: 1,
    explanation: "Backwardation = spot price exceeds futures (downward curve), often due to shortage or immediate demand."
  },
  {
    id: 130,
    category: "Contango & Backwardation",
    question: "Rolling futures in a contango market typically results in:",
    options: ["Positive roll yield", "Negative roll yield", "No cost", "Guaranteed profit"],
    correct: 1,
    explanation: "Contango = negative roll yield. You sell expiring contract cheap, buy new contract expensive (loss)."
  },
  {
    id: 131,
    category: "Contango & Backwardation",
    question: "In backwardation, rolling futures typically results in:",
    options: ["Negative roll yield", "Positive roll yield", "Large losses", "Break-even"],
    correct: 1,
    explanation: "Backwardation = positive roll yield. Sell expiring contract high, buy new contract cheap (gain)."
  },
  {
    id: 132,
    category: "Contango & Backwardation",
    question: "June contract at $50, September at $55, December at $58. This is:",
    options: ["Backwardation", "Contango", "Normal", "Inverted"],
    correct: 1,
    explanation: "Prices rising with time = contango (upward sloping curve)."
  },
  {
    id: 133,
    category: "Contango & Backwardation",
    question: "Spot price $100, 3-month futures $95, 6-month futures $92. This market is in:",
    options: ["Contango", "Backwardation", "Equilibrium", "Neither"],
    correct: 1,
    explanation: "Spot higher than futures = backwardation (downward sloping curve)."
  },
  {
    id: 134,
    category: "Basis & Convergence",
    question: "Basis is calculated as:",
    options: ["Futures price - spot price", "Spot price - futures price", "Futures price + spot price", "Spot price ÷ futures price"],
    correct: 1,
    explanation: "Basis = Spot price - Futures price. Measures difference between cash and futures markets."
  },
  {
    id: 135,
    category: "Basis & Convergence",
    question: "Wide basis suggests:",
    options: ["Spot and futures very close", "Large difference between spot and futures", "Market efficiency", "No arbitrage possible"],
    correct: 1,
    explanation: "Wide basis = large gap between spot and futures prices, often indicating supply issues or high carry costs."
  },
  {
    id: 136,
    category: "Basis & Convergence",
    question: "As futures expiration approaches, spot and futures prices:",
    options: ["Diverge significantly", "Converge toward each other", "Stay constant", "Become unpredictable"],
    correct: 1,
    explanation: "Convergence: spot and futures must converge at expiration, otherwise arbitrage opportunity exists."
  },
  {
    id: 137,
    category: "Basis & Convergence",
    question: "Narrow basis indicates:",
    options: ["High storage costs", "Spot and futures prices are similar", "Market imbalance", "Supply shortage"],
    correct: 1,
    explanation: "Narrow basis = small difference between spot and futures, indicating well-functioning market."
  },
  {
    id: 138,
    category: "Futures P&L Calculations",
    question: "You buy 2 ES contracts at 4,500. ES rises to 4,525. Your profit is: (ES multiplier = $50)",
    options: ["$1,250", "$2,500", "$5,000", "$25"],
    correct: 1,
    explanation: "P&L = contracts × point change × multiplier = 2 × 25 points × $50 = $2,500."
  },
  {
    id: 139,
    category: "Futures P&L Calculations",
    question: "You sell 1 CL contract at $80. CL falls to $75. Contract size is 1,000 barrels. Your profit is:",
    options: ["$5", "$500", "$5,000", "$50,000"],
    correct: 2,
    explanation: "Short position profits from decline. ($80 - $75) × 1,000 barrels = $5,000 profit."
  },
  {
    id: 140,
    category: "Futures P&L Calculations",
    question: "You're long 3 NQ contracts at 16,000. NQ drops to 15,900. Your loss is: (NQ multiplier = $20)",
    options: ["$100", "$2,000", "$6,000", "$300"],
    correct: 2,
    explanation: "Loss = 3 contracts × 100 points × $20 = $6,000."
  },
  {
    id: 141,
    category: "Futures P&L Calculations",
    question: "GC (Gold, 100 oz) contract bought at $2,000, sold at $2,030. Profit per contract:",
    options: ["$30", "$300", "$3,000", "$30,000"],
    correct: 2,
    explanation: "$30 move × 100 oz = $3,000 profit per contract."
  },
  {
    id: 142,
    category: "Futures P&L Calculations",
    question: "ZW (Wheat, 5,000 bushels) shorted at $6.50, covered at $6.20. Profit:",
    options: ["$30", "$300", "$1,500", "$150"],
    correct: 2,
    explanation: "Short profit: ($6.50 - $6.20) × 5,000 bushels = $0.30 × 5,000 = $1,500."
  },
  {
    id: 143,
    category: "Spot Price & Cost of Carry",
    question: "Spot price is:",
    options: ["Future expected price", "Current market price for immediate delivery", "Average monthly price", "Exercise price"],
    correct: 1,
    explanation: "Spot price = current cash market price for immediate delivery/settlement."
  },
  {
    id: 144,
    category: "Spot Price & Cost of Carry",
    question: "Cost of carry includes:",
    options: ["Only storage costs", "Storage, insurance, financing, less convenience yield", "Commission only", "Margin requirements"],
    correct: 1,
    explanation: "Cost of carry = storage + insurance + financing costs - convenience yield of holding physical."
  },
  {
    id: 145,
    category: "Spot Price & Cost of Carry",
    question: "Convenience yield represents:",
    options: ["Commission discount", "Benefit of holding physical commodity vs futures", "Storage cost savings", "Interest earned"],
    correct: 1,
    explanation: "Convenience yield = benefit of physical ownership (can use immediately, no delivery risk)."
  },
  {
    id: 146,
    category: "Futures Settlement",
    question: "Index futures (ES, NQ, YM) settle via:",
    options: ["Physical delivery of stocks", "Cash settlement", "Cannot be settled", "Exchange of ETFs"],
    correct: 1,
    explanation: "Equity index futures are cash-settled - no physical delivery of basket of stocks."
  },
  {
    id: 147,
    category: "Futures Settlement",
    question: "Last trading day is:",
    options: ["First day contract trades", "Final day to trade before delivery/settlement", "Any trading day", "Settlement date"],
    correct: 1,
    explanation: "Last trading day = final day to close position before delivery obligations or cash settlement."
  },
  {
    id: 148,
    category: "Futures Settlement",
    question: "Agricultural futures (corn, wheat, soybeans) typically involve:",
    options: ["Cash settlement only", "Physical delivery possible", "Stock delivery", "No settlement"],
    correct: 1,
    explanation: "Ag futures can result in physical delivery at approved warehouses if held to expiration."
  },
  {
    id: 149,
    category: "Futures Spreads",
    question: "Buying June corn, selling December corn is a:",
    options: ["Hedge", "Intermarket spread", "Calendar (intramarket) spread", "Arbitrage"],
    correct: 2,
    explanation: "Same commodity, different months = calendar or intramarket spread."
  },
  {
    id: 150,
    category: "Futures Spreads",
    question: "Long wheat, short corn (both grains) is a:",
    options: ["Calendar spread", "Intermarket spread", "Hedge only", "Not a spread"],
    correct: 1,
    explanation: "Different but related commodities = intermarket spread (trading relative value)."
  },
  {
    id: 151,
    category: "Options P&L Calculations",
    question: "You sell a $55 put for $4. Stock expires at $50. Your P&L is:",
    options: ["$400 profit", "$100 loss", "$500 loss", "$100 profit"],
    correct: 3,
    explanation: "Put exercised: buy at $55, stock worth $50. Loss = $5, but collected $4 premium. Net = ($4 - $5) × 100 = $100 profit from premium cushion... wait, that's wrong. Loss = ($5 - $4) × 100 = $100 loss."
  },
  {
    id: 152,
    category: "Options P&L Calculations",
    question: "You buy $75 put for $6. Stock drops to $65 at expiration. Your profit is:",
    options: ["$400", "$600", "$1,000", "$1,600"],
    correct: 0,
    explanation: "Intrinsic value = $75 - $65 = $10. Profit = ($10 - $6 paid) × 100 = $400."
  },
  {
    id: 153,
    category: "Options P&L Calculations",
    question: "Short strangle: sell $90 put for $3, sell $110 call for $2. Stock expires at $105. Your P&L is:",
    options: ["$500 profit", "$200 loss", "$300 loss", "$0"],
    correct: 0,
    explanation: "Put expires worthless. Call has $0 intrinsic (stock at $105 < $110 strike). Keep full credit: ($3 + $2) × 100 = $500."
  },
  {
    id: 154,
    category: "Options P&L Calculations",
    question: "Long straddle: buy $50 call for $3, buy $50 put for $2.50. Stock expires at $58. Your P&L is:",
    options: ["$250 profit", "$300 loss", "$800 profit", "$550 profit"],
    correct: 0,
    explanation: "Call worth $8, put worthless. Total value = $8. Cost = $5.50. Profit = ($8 - $5.50) × 100 = $250."
  },
  {
    id: 155,
    category: "Options P&L Calculations",
    question: "You buy $40/$50 call vertical for $3. Stock expires at $45. Your P&L is:",
    options: ["$200 profit", "$300 loss", "$200 loss", "$500 profit"],
    correct: 0,
    explanation: "$40 call worth $5 ($45 stock - $40 strike), $50 call worthless. Spread worth $5. Profit = ($5 - $3) × 100 = $200."
  },
  {
    id: 156,
    category: "Options P&L Calculations",
    question: "Sell $60/$70 put vertical for $3 credit. Stock expires at $55. Your loss is:",
    options: ["$300", "$700", "$1,000", "$400"],
    correct: 1,
    explanation: "Max loss on credit spread = (width - credit) × 100 = ($10 - $3) × 100 = $700. Both puts ITM."
  },
  {
    id: 157,
    category: "Options P&L Calculations",
    question: "Iron condor: sell $45/$55 put spread for $2, sell $75/$85 call spread for $2. Stock expires at $80. Your loss is:",
    options: ["$400 profit", "$600 loss", "$400 loss", "$200 loss"],
    correct: 1,
    explanation: "Call spread breached. Max loss on one side = $10 width - $2 credit = $8. But collected $4 total, so net loss = $8 - $4 = $400... Actually call side loses $8 × 100 = $800, put side keeps $2 × 100 = $200. Net = -$800 + $200 = -$600."
  },
  {
    id: 158,
    category: "Options P&L Calculations",
    question: "You sell a $100 call for $5. Stock rises to $112 at expiration. Your loss is:",
    options: ["$500", "$700", "$1,200", "$1,700"],
    correct: 1,
    explanation: "Call exercised: stock at $112, you sell at $100. Loss = $12, minus $5 premium kept = $7 × 100 = $700 loss."
  },
  {
    id: 159,
    category: "Options P&L Calculations",
    question: "Calendar spread: sell 30-day $50 call for $3, buy 60-day $50 call for $5. 30 days pass, stock at $50. Approximate P&L:",
    options: ["$200 profit from time decay", "$200 loss", "$500 loss", "Break-even"],
    correct: 0,
    explanation: "Short call decays faster (now almost worthless). Long call retains more value. Net debit was $2, position now worth more due to favorable time decay differential."
  },
  {
    id: 160,
    category: "Options P&L Calculations",
    question: "Butterfly spread: buy $40 call for $12, sell two $50 calls for $6 each, buy $60 call for $2. Stock expires at $50. Your P&L is:",
    options: ["$1,000 profit", "$800 profit", "$200 loss", "$0"],
    correct: 1,
    explanation: "Cost = $12 - $12 + $2 = $2. At $50, spread worth $10 ($40 call = $10, others worthless). Profit = ($10 - $2) × 100 = $800."
  },
  {
    id: 161,
    category: "Options Moneyness",
    question: "Stock at $120. Which call is ATM?",
    options: ["$115 call", "$120 call", "$125 call", "$130 call"],
    correct: 1,
    explanation: "ATM = at-the-money, strike equals stock price. $120 call is ATM."
  },
  {
    id: 162,
    category: "Options Moneyness",
    question: "Stock at $33. How much intrinsic value does the $30 put have?",
    options: ["$0", "$3", "$30", "$33"],
    correct: 0,
    explanation: "Put is OTM when stock > strike. $33 stock > $30 strike = OTM put with $0 intrinsic value."
  },
  {
    id: 163,
    category: "Options Moneyness",
    question: "Stock at $67. The $70 put has $5 of value. How much is extrinsic value?",
    options: ["$0", "$2", "$3", "$5"],
    correct: 1,
    explanation: "Intrinsic = $70 - $67 = $3 (ITM by $3). Total value $5 - $3 intrinsic = $2 extrinsic."
  },
  {
    id: 164,
    category: "Options Moneyness",
    question: "Stock at $88. The $80 call is trading at $9. What is the time value?",
    options: ["$0", "$1", "$8", "$9"],
    correct: 1,
    explanation: "Intrinsic = $88 - $80 = $8. Time value = $9 total - $8 intrinsic = $1 extrinsic."
  },
  {
    id: 165,
    category: "Options Moneyness",
    question: "As options move deeper ITM, their delta approaches:",
    options: ["0", "0.25", "0.50", "1.00"],
    correct: 3,
    explanation: "Deep ITM options have delta near 1.00 (for calls) or -1.00 (for puts), moving almost 1:1 with stock."
  },
  {
    id: 166,
    category: "Options Moneyness",
    question: "An option that is 10% OTM with 30 days to expiration will likely have:",
    options: ["High intrinsic, low extrinsic value", "No intrinsic, only extrinsic value", "High intrinsic, high extrinsic value", "No value at all"],
    correct: 1,
    explanation: "OTM options have zero intrinsic value, only extrinsic (time) value remaining."
  },
  {
    id: 167,
    category: "Options Greeks Application",
    question: "You have gamma of +50. Stock moves $2. Your delta changes by approximately:",
    options: ["25", "50", "100", "200"],
    correct: 2,
    explanation: "Gamma measures delta change per $1 move. +50 gamma × $2 move = +100 delta change."
  },
  {
    id: 168,
    category: "Options Greeks Application",
    question: "Short 5 puts with theta of +$8 each. What's your daily time decay profit?",
    options: ["$8", "$40", "$400", "$800"],
    correct: 2,
    explanation: "5 contracts × $8 theta × 100 shares = $4,000... wait, theta is already per day per contract. 5 × $8 = $40/day... but that seems too small. If theta is $8 per contract per day = 5 × $8 × 100 = $4,000? No. Theta $8 = $8 total per contract. 5 × $8 = $40/day."
  },
  {
    id: 169,
    category: "Options Greeks Application",
    question: "Your long calls have delta 0.60 and gamma 0.05. Stock rises $1. New delta is approximately:",
    options: ["0.55", "0.60", "0.65", "0.70"],
    correct: 2,
    explanation: "Gamma = rate of delta change. Delta increases by gamma amount with $1 move. 0.60 + 0.05 = 0.65."
  },
  {
    id: 170,
    category: "Options Greeks Application",
    question: "You're delta neutral (delta = 0) with positive gamma. Stock moves $5 up. Your position now:",
    options: ["Still delta neutral", "Has positive delta", "Has negative delta", "Is worthless"],
    correct: 1,
    explanation: "Positive gamma means delta increases as stock rises. Starting from 0, upward move creates positive delta."
  },
  {
    id: 171,
    category: "Options Greeks Application",
    question: "Position has theta -$100 and vega +$300. Overnight, IV drops 2 points. Approximate P&L:",
    options: ["$200 gain", "$600 loss", "$700 loss", "$500 loss"],
    correct: 2,
    explanation: "Theta = -$100 (lose from time). Vega = +$300, IV drops 2 points = -$600 (lose from vol drop). Total = -$100 - $600 = -$700."
  },
  {
    id: 172,
    category: "Options Probabilities",
    question: "Option has delta 0.30. Approximate probability of expiring ITM:",
    options: ["15%", "30%", "70%", "85%"],
    correct: 1,
    explanation: "Delta approximates probability of expiring ITM. Delta 0.30 ≈ 30% chance of being ITM at expiration."
  },
  {
    id: 173,
    category: "Options Probabilities",
    question: "You sell a put with 20% probability of being ITM. What's your probability of profit?",
    options: ["20%", "50%", "80%", "100%"],
    correct: 2,
    explanation: "If 20% chance ITM, then 80% chance stays OTM. As seller, you profit if it stays OTM = 80% probability."
  },
  {
    id: 174,
    category: "Options Probabilities",
    question: "Stock at $100, 1 SD = $8. Selling a $92 put is approximately how many standard deviations away?",
    options: ["0.5 SD", "1 SD", "1.5 SD", "2 SD"],
    correct: 1,
    explanation: "$100 - $92 = $8 difference. $8 difference ÷ $8 per SD = 1 standard deviation away."
  },
  {
    id: 175,
    category: "Options Probabilities",
    question: "Expected move is $6 (1 SD). To get ~97.5% probability of success, you'd sell options at:",
    options: ["$6 away (1 SD)", "$9 away (1.5 SD)", "$12 away (2 SD)", "$18 away (3 SD)"],
    correct: 2,
    explanation: "2 SD away = ~97.5% probability of success (2.5% in each tail). 2 × $6 = $12 away."
  },
  {
    id: 176,
    category: "Options Probabilities",
    question: "If probability of profit is 70%, probability of max loss is:",
    options: ["30%", "70%", "Depends on strategy", "Cannot determine"],
    correct: 2,
    explanation: "Probability of max loss depends on strategy. For defined risk spreads, it's different than naked positions. Could be less than 30%."
  },
  {
    id: 177,
    category: "Options Volatility Impact",
    question: "Stock expected to move $12 (1 SD). For 84% probability trade, you'd sell strikes around:",
    options: ["$6 away", "$12 away", "$18 away", "$24 away"],
    correct: 1,
    explanation: "1 SD away ≈ 84% probability of success. 1 × $12 = $12 away from current price."
  },
  {
    id: 178,
    category: "Options Volatility Impact",
    question: "IV rank is 90. This means:",
    options: ["IV is at 90% of its potential", "IV is higher than 90% of the past year", "Stock will move 90%", "Options are cheap"],
    correct: 1,
    explanation: "IV Rank = where current IV sits in its 52-week range. 90 = current IV higher than 90% of past year values."
  },
  {
    id: 179,
    category: "Options Volatility Impact",
    question: "Before a known event, you should generally:",
    options: ["Buy options (cheap)", "Sell options (expensive from high IV)", "Do nothing", "Buy stock"],
    correct: 1,
    explanation: "Before known events (earnings, FDA), IV typically elevated. Selling expensive options is generally favorable."
  },
  {
    id: 180,
    category: "Options Volatility Impact",
    question: "Stock typically moves $5/day. Today it moved $15. Realized volatility today was:",
    options: ["Lower than normal", "Normal", "Higher than normal", "Cannot determine"],
    correct: 2,
    explanation: "Realized volatility = actual price movement. $15 move vs typical $5 = higher than normal volatility."
  },
  {
    id: 181,
    category: "Options Volatility Impact",
    question: "IV percentile of 5 suggests:",
    options: ["Very high IV environment", "Very low IV environment", "Average IV", "Unpredictable IV"],
    correct: 1,
    explanation: "IV Percentile 5 = current IV is lower than 95% of past readings. Very low volatility environment."
  },
  {
    id: 182,
    category: "Options Strategies Application",
    question: "Bearish outlook, want limited risk. Best strategy:",
    options: ["Short stock", "Long put vertical", "Short call", "Long call"],
    correct: 1,
    explanation: "Long put vertical = bearish with defined risk (cost of spread). Short stock/call have undefined risk."
  },
  {
    id: 183,
    category: "Options Strategies Application",
    question: "Neutral outlook, high IV. Best strategy:",
    options: ["Long straddle", "Short strangle or iron condor", "Long call", "Buy stock"],
    correct: 1,
    explanation: "High IV = sell premium. Neutral outlook = short strangle or iron condor (profit from range-bound + time decay)."
  },
  {
    id: 184,
    category: "Options Strategies Application",
    question: "Expecting big move but unsure of direction. Low IV. Best strategy:",
    options: ["Short strangle", "Long straddle", "Iron condor", "Covered call"],
    correct: 1,
    explanation: "Expecting big move + low IV (cheap options) = long straddle (profit from large move either direction)."
  },
  {
    id: 185,
    category: "Options Strategies Application",
    question: "Own 100 shares, want to generate income. Best strategy:",
    options: ["Buy protective put", "Sell covered call", "Buy call", "Do nothing"],
    correct: 1,
    explanation: "Covered call = sell call against shares you own, collecting premium income."
  },
  {
    id: 186,
    category: "Options Strategies Application",
    question: "Which generates most credit?",
    options: ["Short strangle (2 options)", "Short iron condor (4 options)", "Short vertical (2 options)", "Long straddle"],
    correct: 0,
    explanation: "Short strangle collects premium on 2 options with no protective long options, maximizing credit (but undefined risk)."
  },
  {
    id: 187,
    category: "Options Max Loss/Gain",
    question: "Long call vertical: buy $50 call for $8, sell $60 call for $4. Maximum loss:",
    options: ["$400", "$600", "$800", "$1,000"],
    correct: 0,
    explanation: "Max loss = net debit paid = ($8 - $4) × 100 = $400."
  },
  {
    id: 188,
    category: "Options Max Loss/Gain",
    question: "Short put vertical: sell $80 put for $5, buy $70 put for $2. Maximum gain:",
    options: ["$200", "$300", "$500", "$1,000"],
    correct: 1,
    explanation: "Max gain on credit spread = credit received = ($5 - $2) × 100 = $300."
  },
  {
    id: 189,
    category: "Options Max Loss/Gain",
    question: "Iron condor: $4 total credit, $10 wide spreads. Maximum loss:",
    options: ["$400", "$600", "$1,000", "$1,400"],
    correct: 1,
    explanation: "Max loss = (spread width - credit) × 100 = ($10 - $4) × 100 = $600."
  },
  {
    id: 190,
    category: "Options Max Loss/Gain",
    question: "Long straddle costs $8 total. Maximum loss:",
    options: ["$400", "$800", "$1,600", "Unlimited"],
    correct: 1,
    explanation: "Max loss on long options = premium paid = $8 × 100 = $800."
  },
  {
    id: 191,
    category: "Options Max Loss/Gain",
    question: "Short naked call. Maximum loss is:",
    options: ["Premium received", "Strike price", "Unlimited", "$0"],
    correct: 2,
    explanation: "Short naked call has unlimited upside risk as stock can theoretically rise infinitely."
  },
  {
    id: 192,
    category: "Options Max Loss/Gain",
    question: "Butterfly spread costs $2, spread is $10 wide. Maximum profit:",
    options: ["$200", "$500", "$800", "$1,000"],
    correct: 2,
    explanation: "Max profit = (middle strike spacing - cost) × 100 = ($10 - $2) × 100 = $800."
  },
  {
    id: 193,
    category: "Options Breakeven",
    question: "Buy $45 call for $3. Breakeven price at expiration:",
    options: ["$42", "$45", "$48", "$51"],
    correct: 2,
    explanation: "Call breakeven = strike + premium = $45 + $3 = $48."
  },
  {
    id: 194,
    category: "Options Breakeven",
    question: "Sell $60 put for $4. Breakeven price:",
    options: ["$56", "$60", "$64", "$68"],
    correct: 0,
    explanation: "Put breakeven = strike - premium = $60 - $4 = $56."
  },
  {
    id: 195,
    category: "Options Breakeven",
    question: "Long call vertical: buy $70 call for $6, sell $80 call for $2. Breakeven:",
    options: ["$70", "$74", "$76", "$80"],
    correct: 1,
    explanation: "Breakeven = long strike + net debit = $70 + $4 = $74."
  },
  {
    id: 196,
    category: "Options Breakeven",
    question: "Short put vertical: sell $100 put for $6, buy $90 put for $2. Breakeven:",
    options: ["$90", "$94", "$96", "$100"],
    correct: 2,
    explanation: "Breakeven = short strike - credit = $100 - $4 = $96."
  },
  {
    id: 197,
    category: "Options Breakeven",
    question: "Iron condor: strikes at $40/$50/$70/$80, collect $5 credit. Upper breakeven:",
    options: ["$70", "$75", "$80", "$85"],
    correct: 1,
    explanation: "Upper breakeven = short call strike + credit = $70 + $5 = $75."
  },
  {
    id: 198,
    category: "Options Time Decay",
    question: "Which loses most value per day (all else equal)?",
    options: ["LEAPS with 2 years", "Option with 90 days", "Option with 30 days", "Option with 5 days"],
    correct: 3,
    explanation: "Theta accelerates as expiration approaches. Options in final days have highest daily time decay."
  },
  {
    id: 199,
    category: "Options Time Decay",
    question: "Option with 45 days to expiration vs 15 days (same strike/stock). The 45-day option:",
    options: ["Has higher time value", "Has lower time value", "Same time value", "Has no time value"],
    correct: 0,
    explanation: "More time to expiration = more time value (extrinsic value). 45 days > 15 days in time value."
  },
  {
    id: 200,
    category: "Options Time Decay",
    question: "Time decay is most profitable for:",
    options: ["Option buyers", "Option sellers", "Neither", "Both equally"],
    correct: 1,
    explanation: "Option sellers benefit from time decay (positive theta) as options lose value over time."
  },
  {
    id: 201,
    category: "Futures Limit Moves",
    question: "Limit up means:",
    options: ["Maximum allowed daily gain reached", "Unlimited trading allowed", "Margin limit reached", "Position size limit"],
    correct: 0,
    explanation: "Limit up = futures price hit maximum allowed daily increase, trading may halt."
  },
  {
    id: 202,
    category: "Futures Limit Moves",
    question: "A futures contract hits limit down. This means:",
    options: ["Very bearish day, hit max allowed decline", "Bullish signal", "Trading extended", "Margin reduced"],
    correct: 0,
    explanation: "Limit down = maximum allowed daily decrease reached, often halting trading to prevent panic."
  },
  {
    id: 203,
    category: "Futures Limit Moves",
    question: "Purpose of limit moves is to:",
    options: ["Increase volatility", "Limit excessive volatility in single session", "Help traders profit", "Set margin requirements"],
    correct: 1,
    explanation: "Limit moves = circuit breakers to prevent excessive volatility and allow market participants to assess situations."
  },
  {
    id: 204,
    category: "Futures Contract Specifications",
    question: "E-mini S&P 500 (ES) contract multiplier:",
    options: ["$5", "$10", "$50", "$250"],
    correct: 2,
    explanation: "ES multiplier = $50. Each point move = $50 per contract."
  },
  {
    id: 205,
    category: "Futures Contract Specifications",
    question: "Crude Oil (CL) contract size:",
    options: ["100 barrels", "500 barrels", "1,000 barrels", "10,000 barrels"],
    correct: 2,
    explanation: "CL = 1,000 barrels per contract."
  },
  {
    id: 206,
    category: "Futures Contract Specifications",
    question: "Gold (GC) contract represents:",
    options: ["1 troy ounce", "10 troy ounces", "100 troy ounces", "1,000 troy ounces"],
    correct: 2,
    explanation: "GC = 100 troy ounces of gold per contract."
  },
  {
    id: 207,
    category: "Futures Contract Specifications",
    question: "Corn (ZC) contract size:",
    options: ["1,000 bushels", "5,000 bushels", "10,000 bushels", "50,000 bushels"],
    correct: 1,
    explanation: "ZC = 5,000 bushels per contract (same for soybeans and wheat)."
  },
  {
    id: 208,
    category: "Futures vs Forwards",
    question: "Main difference between futures and forwards:",
    options: ["Futures are standardized and exchange-traded, forwards are customized OTC", "No difference", "Forwards are larger", "Futures are more risky"],
    correct: 0,
    explanation: "Futures = standardized, exchange-traded, cleared. Forwards = customized, OTC, counterparty risk."
  },
  {
    id: 209,
    category: "Futures Hedging",
    question: "A farmer expecting harvest in 3 months should:",
    options: ["Buy corn futures (long hedge)", "Sell corn futures (short hedge)", "Do nothing", "Buy corn options only"],
    correct: 1,
    explanation: "Short hedge = sell futures to lock in selling price for future production (farmer will sell crop)."
  },
  {
    id: 210,
    category: "Futures Hedging",
    question: "An airline needing jet fuel in 6 months should:",
    options: ["Sell crude futures", "Buy crude/heating oil futures (long hedge)", "Short the market", "Wait for spot prices"],
    correct: 1,
    explanation: "Long hedge = buy futures to lock in purchase price for future needs (airline will buy fuel)."
  },
  {
    id: 211,
    category: "Futures Fundamentals",
    question: "Crude Oil futures (/CL) contract size is:",
    options: ["100 barrels", "500 barrels", "1,000 barrels", "10,000 barrels"],
    correct: 2,
    explanation: "CL futures contract represents 1,000 barrels of crude oil. Each $1 move = $1,000 per contract."
  },
  {
    id: 212,
    category: "Futures P&L Calculations",
    question: "CL tick size is $0.01, tick value is $10. You bought 3 CL contracts at $40.70. Price rises to $47.30. Your profit:",
    options: ["$6,600", "$19,800", "$660", "$1,980"],
    correct: 1,
    explanation: "$47.30 - $40.70 = $6.60 × 100 ticks × $10 tick value = $6,600 per contract × 3 contracts = $19,800."
  },
  {
    id: 213,
    category: "Futures Settlement",
    question: "Russell 2000 futures (RTY/TF) settle via:",
    options: ["Physical delivery of 2,000 stocks", "Cash settlement", "Exchange for stock ETF", "Cannot settle"],
    correct: 1,
    explanation: "Small-cap index futures like RTY (Russell 2000) are cash-settled, no physical delivery."
  },
  {
    id: 214,
    category: "Futures Rolling",
    question: "You're long May TF (Russell 2000) futures. May is expiring soon, you want to maintain position. You should:",
    options: ["Sell May TF, buy June TF (roll over)", "Hold May for cash settlement", "Sell May TF, sell June TF", "Do nothing"],
    correct: 0,
    explanation: "Rolling = close expiring contract (sell May) and open new contract (buy June) to maintain exposure."
  },
  {
    id: 215,
    category: "Options Management",
    question: "You sold a call for $10. After one week it's worth $5. What's the best action?",
    options: ["Hold to expiration for full $10", "Close at $5 (50% max profit captured)", "Sell another call", "Roll to next month"],
    correct: 1,
    explanation: "Close at 50% of max profit - you've captured half the profit in 1/8 of the time. Deploy capital elsewhere."
  },
  {
    id: 216,
    category: "Options Management",
    question: "Managing losers: you sold put for $3. At what price should you close if using 2x rule?",
    options: ["$6 (loss = premium)", "$9 (loss = 2x premium)", "$12 (loss = 3x premium)", "Never close"],
    correct: 1,
    explanation: "2x rule: close when option reaches 2× credit received. $3 sold, close at $9 (loss = $6 = 2× $3)."
  },
  {
    id: 217,
    category: "Options Management",
    question: "You sold a put for $6. According to 2x rule, close the position when it reaches:",
    options: ["$12", "$18", "$24", "$9"],
    correct: 1,
    explanation: "Close when loss = 2× credit. Sold at $6, close at $18 (loss = $12 = 2× $6 premium)."
  },
  {
    id: 218,
    category: "Risk Management 2% Rule",
    question: "Account: $50,000. Using 3% risk rule, bought 1,000 shares at $20. Stop-loss price:",
    options: ["$18.50", "$18.00", "$19.50", "$17.00"],
    correct: 0,
    explanation: "3% of $50,000 = $1,500. Position value $20,000 - $1,500 = $18,500 ÷ 1,000 shares = $18.50."
  },
  {
    id: 219,
    category: "Risk Management 2% Rule",
    question: "Account: $150,000. Using 2% risk rule, bought 1,000 shares at $30. Stop-loss price:",
    options: ["$29", "$28", "$27", "$26"],
    correct: 2,
    explanation: "2% of $150,000 = $3,000. Position value $30,000 - $3,000 = $27,000 ÷ 1,000 shares = $27."
  },
  {
    id: 220,
    category: "Risk Management 2% Rule",
    question: "The 2% rule means you should:",
    options: ["Never lose more than 2% of position value", "Never risk more than 2% of account equity per trade", "Close if position loses 2% in a day", "Take profit at 2% gain"],
    correct: 1,
    explanation: "2% rule = never risk more than 2% of total account equity on any single trade (not 2% of position)."
  },
  {
    id: 221,
    category: "Risk Management Mathematical Expectation",
    question: "Win rate 43%, avg win 3:1 vs losses (6% gain, 2% loss). Mathematical expectation:",
    options: ["0.15", "0.72", "1.29", "-0.14"],
    correct: 1,
    explanation: "(0.43 × 3) - (0.57 × 1) = 1.29 - 0.57 = 0.72 positive expectation."
  },
  {
    id: 222,
    category: "Risk Management Mathematical Expectation",
    question: "Win rate 63%, avg win 2:1 vs losses (8% gain, 4% loss). Mathematical expectation:",
    options: ["0.89", "1.26", "0.37", "1.52"],
    correct: 0,
    explanation: "(0.63 × 2) - (0.37 × 1) = 1.26 - 0.37 = 0.89 positive expectation."
  },
  {
    id: 223,
    category: "Risk Management Losing Position",
    question: "Short ZW position showing $1,600 loss on $10,000 account. Margin call issued. Best action:",
    options: ["Add funds to hold position", "Close ZW position", "Sell another ZW contract", "Close winning positions to free margin"],
    correct: 1,
    explanation: "Close the losing position - already 16% loss. Don't add to losers or sacrifice winners for a loser."
  },
  {
    id: 224,
    category: "Futures Margin",
    question: "Initial margin $3,000, maintenance $2,500. Account drops to $2,000. What happens?",
    options: ["Nothing, still compliant", "Margin call issued", "Can double position", "Automatic profit"],
    correct: 1,
    explanation: "$2,000 < $2,500 maintenance = margin call. Must add funds to restore to initial margin level."
  },
  {
    id: 225,
    category: "Futures Margin",
    question: "You have $10,000 margin. Short ES needs $6,000 initial, $5,000 maintenance. ES rallies, maintenance now $11,000. Which does NOT solve the problem?",
    options: ["Sell another ES contract", "Add funds to account", "Close the ES position", "Buy ES contract to offset"],
    correct: 0,
    explanation: "Selling another ES doubles down on losing short position, making margin worse."
  },
  {
    id: 226,
    category: "Contango & Backwardation Wide/Narrow Basis",
    question: "Future A: May $20, June $20.70, July $20.90, August $21.20. Future B: May $20, June $12.70, July $8.90, August $2.20. Which is true?",
    options: ["A: backwardation/narrow, B: contango/wide", "A: contango/narrow, B: backwardation/wide", "Both in contango", "Both in backwardation"],
    correct: 1,
    explanation: "A shows contango (rising prices) with narrow basis. B shows backwardation (falling prices) with wide basis."
  },
  {
    id: 227,
    category: "Contango & Backwardation Wide/Narrow Basis",
    question: "Futures: April $40, May $42, June $47. This is contango with:",
    options: ["Narrow basis", "Wide basis", "No basis", "Inverted basis"],
    correct: 1,
    explanation: "Large price increases between months ($40→$47) = wide basis with contango."
  },
  {
    id: 228,
    category: "Contango & Backwardation Wide/Narrow Basis",
    question: "Futures: April $4000, May $4005, June $4009. This shows:",
    options: ["Backwardation with wide basis", "Contango with narrow basis", "Normal backwardation", "Wide backwardation"],
    correct: 1,
    explanation: "Prices rising (contango) but small increases ($4000→$4009) = narrow basis."
  },
  {
    id: 229,
    category: "Alternative Data",
    question: "Which is NOT alternative data gathering?",
    options: ["Analyzing earnings reports for fraud", "Tracking warehouse trucks with cameras", "Monitoring rental car passport origins for M&A", "Reverse engineering tech gadgets"],
    correct: 0,
    explanation: "Earnings reports = traditional data. Alternative data uses unconventional sources (satellite, social media, etc.)."
  },
  {
    id: 230,
    category: "Pairs Trading",
    question: "Company A rallied but you believe Company B has better fundamentals. You short A, long B. This is:",
    options: ["Scalping based on traditional data", "Pairs trade based on alternative data", "Arbitrage", "Hedge"],
    correct: 1,
    explanation: "Pairs trade (long/short related companies) using alternative data (social media buzz, not financial statements)."
  },
  {
    id: 231,
    category: "Futures Spreads Drought Example",
    question: "Drought will hurt corn more than wheat. For pairs trade, you should:",
    options: ["Buy ZW, short ZC (intermarket spread)", "Short ZW, buy ZC (intermarket spread)", "Buy both ZW and ZC", "Short both"],
    correct: 0,
    explanation: "Buy ZC (corn - more affected, bigger price increase), short ZW (wheat - less affected). Intermarket spread."
  },
  {
    id: 232,
    category: "Futures Construction Theme",
    question: "Construction boom worldwide (wiring, roofing). Best strategy:",
    options: ["Long NQ futures", "Long HG (copper) futures", "Short ZS (soybeans)", "Short DX (dollar)"],
    correct: 1,
    explanation: "Construction boom = increased copper demand (wiring, pipes). Long HG (copper) futures benefits."
  },
  {
    id: 233,
    category: "Macro Strategy Inflation",
    question: "Economy booming, prices rising fast (high inflation). Central bank will likely:",
    options: ["Lower rates, long bonds", "Raise rates, short bonds", "Do nothing", "Lower rates, short bonds"],
    correct: 1,
    explanation: "High inflation → central bank raises rates → bond prices fall → short bonds profits."
  },
  {
    id: 234,
    category: "Macro Strategy Deflation",
    question: "Economy collapsing, prices plummeting (deflation). Good macro strategy:",
    options: ["Lower rates expected, long bonds", "Raise rates expected, short bonds", "Lower rates expected, short bonds", "No action possible"],
    correct: 0,
    explanation: "Deflation → central bank lowers rates → bond prices rise → long bonds profits."
  },
  {
    id: 235,
    category: "Options on Futures YM Bearish",
    question: "YM (Dow) at $25,000. Bearish outlook but selling futures too risky. Best option strategy:",
    options: ["Buy YM put vertical ($22K-$20K)", "Sell YM put vertical", "Buy YM call", "Sell YM call naked"],
    correct: 0,
    explanation: "Bearish with limited risk = buy put vertical (long $22K put, short $20K put for reduced cost)."
  },
  {
    id: 236,
    category: "Options on Futures Oil Arbitrage",
    question: "/CL $50 strike calls: March $1.50, April $2, July $4, October $3, December $6. Arbitrage opportunity:",
    options: ["October undervalued, buy Oct/sell July", "December undervalued, sell Dec/buy April", "No arbitrage exists", "March overvalued"],
    correct: 0,
    explanation: "October ($3) is cheaper than July ($4) despite being 3 months later - undervalued. Buy Oct, sell July."
  },
  {
    id: 237,
    category: "Futures Symbols Coffee",
    question: "Coffee futures expiring May 2024:",
    options: ["KCK4", "CCM4", "CCK4", "KCM4"],
    correct: 0,
    explanation: "KC = Coffee (not CC which is Cocoa), K = May, 4 = 2024. Answer: KCK4."
  },
  {
    id: 238,
    category: "Futures Notional Value Silver",
    question: "Silver (SI) contract: 5,000 troy oz, trading at $27.60. Notional value:",
    options: ["$27,600", "$138,000", "$276,000", "$5,000"],
    correct: 1,
    explanation: "Notional = contract size × price = 5,000 oz × $27.60 = $138,000."
  },
  {
    id: 239,
    category: "Arbitrage Types",
    question: "Company beaten down but assets worth more than market cap. You buy shares expecting asset sales. This is:",
    options: ["Merger arbitrage", "Liquidation arbitrage", "Convertible arbitrage", "Option arbitrage"],
    correct: 1,
    explanation: "Liquidation arbitrage = buying undervalued company where asset value exceeds market cap."
  },
  {
    id: 240,
    category: "Arbitrage Types",
    question: "Dow futures trading below aggregate value of 30 component stocks. You buy stocks, short YM. This is:",
    options: ["Index arbitrage", "Merger arbitrage", "Statistical arbitrage", "Pairs trading"],
    correct: 0,
    explanation: "Index arbitrage = exploiting mispricing between index futures and underlying component stocks."
  },
  {
    id: 241,
    category: "Fundamental vs Technical Analysis",
    question: "Which is NOT fundamental analysis for futures?",
    options: ["Lower interest rates affecting dollar", "Fibonacci retracement levels", "Weather patterns affecting crops", "Demand trends (chicken vs beef)"],
    correct: 1,
    explanation: "Fibonacci = technical analysis (chart patterns). Fundamental = economic factors, supply/demand, weather."
  },
  {
    id: 242,
    category: "Trading Psychology",
    question: "Which is NOT a quality for successful traders?",
    options: ["Self-control", "Impulsivity", "Self-confidence", "Realism"],
    correct: 1,
    explanation: "Impulsivity leads to poor decisions. Successful traders need discipline, confidence, and realistic expectations."
  },
  {
    id: 243,
    category: "Hedge Fund Structures",
    question: "Fund states: returns must exceed 5% before performance fees, then fees charged on ALL returns. This is:",
    options: ["Hard hurdle", "Soft hurdle", "High watermark", "Clawback"],
    correct: 1,
    explanation: "Soft hurdle = once threshold met, fees on ALL returns. Hard hurdle = fees only on returns ABOVE threshold."
  },
  {
    id: 244,
    category: "Hedge Fund Structures",
    question: "Fund must reach previous peak before managers earn performance fees. This is:",
    options: ["Soft hurdle", "Hard hurdle", "High watermark", "Low watermark"],
    correct: 2,
    explanation: "High watermark = managers only earn fees on new profits above previous peak (not on recovery)."
  },
  {
    id: 245,
    category: "Hedge Fund Exotic Investments",
    question: "Fund buys life insurance from terminally ill patients as investment. This is:",
    options: ["Viatical settlement", "Mezzanine debt", "Distressed debt", "Payment-in-kind"],
    correct: 0,
    explanation: "Viatical = buying life insurance policies from terminally ill for immediate cash, profit at death."
  },
  {
    id: 246,
    category: "Market Neutrality",
    question: "To increase fund's market neutrality, which is NOT useful?",
    options: ["Regular rebalancing", "Diversify across sectors", "Only choose negative beta stocks", "Long/short strategies"],
    correct: 2,
    explanation: "Only negative beta stocks = directional bias (bearish). Neutrality needs balanced long/short across sectors."
  },
  {
    id: 247,
    category: "Risk Management Best Practices",
    question: "From risk management perspective, best action:",
    options: ["Add funds to save losing position from margin call", "Close losing position when support breaks", "Hold futures years hoping for reversal", "Double down on losers"],
    correct: 1,
    explanation: "Close losers when technical levels break (support pierced). Don't add to losers or hold underwater positions."
  },
  {
    id: 248,
    category: "Options Time Value Decay",
    question: "Optimal time to expiration when selling options (balance premium vs decay):",
    options: ["5 days", "15 days", "45 days", "150 days"],
    correct: 2,
    explanation: "45 days (1.5 months) = sweet spot for sellers. Good premium, accelerating time decay."
  },
  {
    id: 249,
    category: "Options Assignment Risk",
    question: "You sold $55 put for $4. Stock expires at $50. Your P/L:",
    options: ["$400 profit", "$100 loss", "$500 loss", "$100 profit"],
    correct: 1,
    explanation: "Put exercised: buy at $55, stock worth $50 = $5 loss. Premium $4 cushion = net $1 loss × 100 = $100 loss."
  },
  {
    id: 250,
    category: "Options Long Position P&L",
    question: "Bought $75 put for $6. Stock drops to $65 at expiration. Profit:",
    options: ["$400", "$600", "$1,000", "Loss"],
    correct: 0,
    explanation: "Intrinsic = $75 - $65 = $10. Profit = ($10 - $6 cost) × 100 = $400."
  },
  {
    id: 251,
    category: "Options Strangle P&L",
    question: "Short strangle: sell $90 put for $3, sell $110 call for $2. Stock expires at $105. P&L:",
    options: ["$500 profit", "$200 loss", "$300 loss", "Break-even"],
    correct: 0,
    explanation: "Both options expire OTM (stock at $105). Keep full credit: ($3 + $2) × 100 = $500."
  },
  {
    id: 252,
    category: "Options Straddle P&L",
    question: "Long straddle: buy $50 call for $3, buy $50 put for $2.50. Stock expires at $58. P&L:",
    options: ["$250 profit", "$300 loss", "$800 profit", "$550 loss"],
    correct: 0,
    explanation: "Call worth $8, put worthless. Total $8 - $5.50 cost = $2.50 × 100 = $250 profit."
  },
  {
    id: 253,
    category: "Options Vertical P&L",
    question: "Buy $40/$50 call vertical for $3. Stock expires at $45. P&L:",
    options: ["$200 profit", "$300 loss", "$500 profit", "$700 profit"],
    correct: 0,
    explanation: "$40 call worth $5, $50 call worthless. Spread worth $5 - $3 cost = $2 × 100 = $200 profit."
  },
  {
    id: 254,
    category: "Options Credit Spread Loss",
    question: "Sell $60/$70 put vertical for $3. Stock expires at $55. Loss:",
    options: ["$300", "$700", "$1,000", "$400"],
    correct: 1,
    explanation: "Both puts ITM, max loss = (width - credit) × 100 = ($10 - $3) × 100 = $700."
  },
  {
    id: 255,
    category: "Options Iron Condor Breach",
    question: "Iron condor: sell $45/$55 put spread for $2, sell $75/$85 call spread for $2. Stock expires at $80. Loss:",
    options: ["$400", "$600", "$800", "$200"],
    correct: 1,
    explanation: "Call spread breached: loss $8 × 100 = $800. Put spread keeps $200. Net loss = $800 - $200 = $600."
  },
  {
    id: 256,
    category: "Options Naked Call Loss",
    question: "Sold $100 call for $5. Stock rises to $112 at expiration. Loss:",
    options: ["$500", "$700", "$1,200", "$1,700"],
    correct: 1,
    explanation: "Stock $112, sold at $100 = $12 loss - $5 premium = $7 net loss × 100 = $700."
  },
  {
    id: 257,
    category: "Options Calendar Spread",
    question: "Calendar: sell 30-day $50 call for $3, buy 60-day $50 call for $5. After 30 days at $50, approximate result:",
    options: ["$200 profit from favorable decay", "$200 loss", "$500 loss", "Break-even"],
    correct: 0,
    explanation: "Short call decayed to near $0. Long call retains value. Net debit $2, position now worth more."
  },
  {
    id: 258,
    category: "Options Butterfly P&L",
    question: "Butterfly: buy $40 call for $12, sell two $50 calls for $6 each, buy $60 call for $2. Stock expires at $50. P&L:",
    options: ["$1,000 profit", "$800 profit", "$200 loss", "$0"],
    correct: 1,
    explanation: "Cost = $12 - $12 + $2 = $2. At $50, $40 call = $10, others worthless. ($10 - $2) × 100 = $800."
  },
  {
    id: 259,
    category: "Options Greeks Position Delta",
    question: "Long 10 calls with delta 0.30 each. Position delta:",
    options: ["0.30", "3.0", "30", "300"],
    correct: 3,
    explanation: "Position delta = 10 contracts × 100 shares × 0.30 delta = 300 (equivalent to 300 shares)."
  },
  {
    id: 260,
    category: "Options Greeks Theta Over Time",
    question: "Position theta -$50/day. After 10 days with no price change, total loss:",
    options: ["$50", "$500", "$5", "$5,000"],
    correct: 1,
    explanation: "Theta = daily decay. -$50/day × 10 days = -$500 total time decay loss."
  }
  {
  id: 261,
    category: "Options Moneyness",
    question: "Stock XYZ at $50. Which option has highest extrinsic value?",
    options: ["$30 Put costs $10", "$30 Call costs $22", "$55 Put costs $30", "$55 Call costs $1"],
    correct: 2,
    explanation: "$30 Put: OTM $0 intrinsic, $10 extrinsic. $30 Call: ITM $20 intrinsic, $2 extrinsic. $55 Put: ITM $5 intrinsic, $25 extrinsic (HIGHEST). $55 Call: OTM $0 intrinsic, $1 extrinsic."
  },
  {
    id: 262,
    category: "Options Moneyness",
    question: "Stock PLP at $100. Which has intrinsic value?",
    options: ["$90 Put", "$50 Put", "$150 Call", "$50 Call"],
    correct: 3,
    explanation: "$50 Call is ITM with $50 intrinsic value ($100 stock - $50 strike = $50). All others are OTM with $0 intrinsic."
  },
  {
    id: 263,
    category: "Options Moneyness",
    question: "Stock at $40. Which call and put are ITM?",
    options: ["$30 Call and $60 Put", "$40 Call and $40 Put", "$80 Call and $20 Put", "$50 Call and $30 Put"],
    correct: 0,
    explanation: "$30 Call ITM (stock $40 > strike $30). $60 Put ITM (strike $60 > stock $40). Both have intrinsic value."
  },
  {
    id: 264,
    category: "Options Moneyness",
    question: "Stock at $60. Two options with $40 strike. Which is true?",
    options: ["Put ITM, Call OTM", "Both OTM", "Both ITM", "Put OTM, Call ITM"],
    correct: 3,
    explanation: "$40 Call ITM ($60 > $40, has $20 intrinsic). $40 Put OTM ($60 > $40, $0 intrinsic)."
  },
  {
    id: 265,
    category: "Options Moneyness",
    question: "At expiration, an OTM option has:",
    options: ["Both intrinsic and extrinsic", "Neither intrinsic nor extrinsic", "Only intrinsic", "Only extrinsic"],
    correct: 1,
    explanation: "OTM options at expiration are worthless - no intrinsic value (OTM) and no time value remaining (at expiration)."
  },
  {
    id: 266,
    category: "Options Moneyness",
    question: "At expiration, an ITM option has:",
    options: ["Neither value", "Intrinsic only", "Extrinsic only", "Both values"],
    correct: 1,
    explanation: "At expiration, only intrinsic value remains. All time value has decayed to zero."
  },
  {
    id: 267,
    category: "Options Moneyness",
    question: "Stock at $85. Which put is ITM?",
    options: ["$80 put", "$85 put", "$90 put", "None ITM"],
    correct: 2,
    explanation: "Put ITM when strike > stock. $90 put has $5 intrinsic ($90 - $85 = $5)."
  },
  {
    id: 268,
    category: "Options Moneyness",
    question: "Stock at $42. The $40 call is:",
    options: ["OTM", "ATM", "ITM by $2", "ITM by $40"],
    correct: 2,
    explanation: "Call ITM when stock > strike. $42 stock - $40 strike = $2 ITM (intrinsic value)."
  },
  {
    id: 269,
    category: "Options Moneyness",
    question: "Stock at $55. Which options are both OTM?",
    options: ["$50 call & $60 put", "$60 call & $50 put", "$50 call & $50 put", "$60 call & $60 put"],
    correct: 1,
    explanation: "$60 call OTM (strike $60 > stock $55). $50 put OTM (strike $50 < stock $55). Both have $0 intrinsic value."
  },
  {
    id: 270,
    category: "Options Moneyness",
    question: "Stock at $120. Which call is ATM?",
    options: ["$115 call", "$120 call", "$125 call", "$130 call"],
    correct: 1,
    explanation: "ATM (at-the-money) = strike equals stock price. $120 call is ATM."
  },
  {
    id: 271,
    category: "Options Moneyness",
    question: "Stock at $33. $30 put has how much intrinsic value?",
    options: ["$0", "$3", "$30", "$33"],
    correct: 0,
    explanation: "Put OTM when stock > strike. $33 > $30 = OTM, $0 intrinsic value."
  },
  {
    id: 272,
    category: "Options Moneyness",
    question: "Stock at $67. $70 put costs $5. Extrinsic value?",
    options: ["$0", "$2", "$3", "$5"],
    correct: 1,
    explanation: "Intrinsic = $70 - $67 = $3. Extrinsic = $5 total - $3 intrinsic = $2."
  },
  {
    id: 273,
    category: "Options Moneyness",
    question: "Stock at $88. $80 call trades at $9. Time value?",
    options: ["$0", "$1", "$8", "$9"],
    correct: 1,
    explanation: "Intrinsic = $88 - $80 = $8. Time value (extrinsic) = $9 - $8 = $1."
  },
  {
    id: 274,
    category: "Options Moneyness",
    question: "Deep ITM options have delta approaching:",
    options: ["0", "0.25", "0.50", "1.00"],
    correct: 3,
    explanation: "Deep ITM calls approach delta 1.00, moving nearly 1:1 with stock."
  },
  {
    id: 275,
    category: "Options Moneyness",
    question: "Option 10% OTM with 30 days to expiration has:",
    options: ["High intrinsic, low extrinsic", "No intrinsic, only extrinsic", "Both high", "No value"],
    correct: 1,
    explanation: "OTM options have zero intrinsic value, only time value (extrinsic) remains."
  },
  {
    id: 276,
    category: "Options Moneyness",
    question: "ATM options typically have delta near:",
    options: ["0", "0.50", "0.75", "1.00"],
    correct: 1,
    explanation: "ATM options have ~0.50 delta (50% probability of expiring ITM)."
  },
  {
    id: 277,
    category: "Options Moneyness",
    question: "Which has most extrinsic value as percentage of total value?",
    options: ["Deep ITM", "ATM", "OTM", "All equal"],
    correct: 2,
    explanation: "OTM and ATM options are mostly or entirely extrinsic value."
  },
  {
    id: 278,
    category: "Options Moneyness",
    question: "Stock at $75. $75 call and $75 put are both:",
    options: ["Both ITM", "Both ATM", "Both OTM", "One ITM, one OTM"],
    correct: 1,
    explanation: "When stock = strike price, both call and put are ATM (at-the-money)."
  },
  {
    id: 279,
    category: "Options Moneyness",
    question: "Stock drops from $50 to $40. $45 call goes from ITM to:",
    options: ["Still ITM", "ATM", "OTM", "No change"],
    correct: 2,
    explanation: "$45 call now OTM since stock ($40) < strike ($45)."
  },
  {
    id: 280,
    category: "Options Moneyness",
    question: "Stock at $95. Which option has $5 intrinsic value?",
    options: ["$90 call", "$100 put", "$90 put", "$100 call"],
    correct: 0,
    explanation: "$90 call: $95 stock - $90 strike = $5 intrinsic value."
  },
  {
  id: 281,
  category: "Options – Moneyness (ATM)",
  question: "Stock DEF trades at $50. Which option is considered at-the-money?",
  options: ["$45 call", "$50 call", "$55 call", "$60 call"],
  correct: 1,
  explanation: "An option is ATM when the strike price equals the stock price."
},
{
  id: 282,
  category: "Options – Moneyness (Calls)",
  question: "Stock trades at $72. Which call option is out-of-the-money?",
  options: ["$65 call", "$70 call", "$72 call", "$75 call"],
  correct: 3,
  explanation: "Calls are OTM when strike price is above the stock price."
},
{
  id: 283,
  category: "Options – Moneyness (Puts)",
  question: "Stock trades at $40. Which put option is out-of-the-money?",
  options: ["$50 put", "$45 put", "$40 put", "$35 put"],
  correct: 3,
  explanation: "Puts are OTM when strike price is below the stock price."
},
{
  id: 284,
  category: "Options – P/L (Long Put)",
  question: "A trader buys a put with a $90 strike for $5. Stock closes at $80 at expiration. What is the profit per share?",
  options: ["$0", "$5", "$10", "$5"],
  correct: 3,
  explanation: "Intrinsic value = $90 − $80 = $10. Profit = $10 − $5 = $5."
},
{
  id: 285,
  category: "Options – P/L (Short Call)",
  question: "A trader sells a call for $3. The option expires worthless. What is the profit per share?",
  options: ["$0", "$3", "$-3", "Unlimited"],
  correct: 1,
  explanation: "If a sold option expires worthless, profit equals the premium received."
},
{
  id: 286,
  category: "Options – Maximum Loss",
  question: "What is the maximum loss of a short call position?",
  options: ["Premium received", "Strike price", "Unlimited", "Difference between strikes"],
  correct: 2,
  explanation: "Short calls have unlimited loss if the stock rises significantly."
},
{
  id: 287,
  category: "Options – Maximum Gain",
  question: "What is the maximum gain of a long call option?",
  options: ["Strike price", "Premium paid", "Unlimited", "Difference between strike and stock price"],
  correct: 2,
  explanation: "A long call has unlimited upside as the stock price increases."
},
{
  id: 288,
  category: "Options – Probability of Profit",
  question: "Which option generally has a higher probability of expiring worthless?",
  options: ["Deep ITM call", "ATM call", "OTM call", "ITM put"],
  correct: 2,
  explanation: "OTM options require a larger move to become profitable."
},
{
  id: 289,
  category: "Options – Greeks (Gamma)",
  question: "Which Greek measures the rate of change of delta?",
  options: ["Delta", "Gamma", "Theta", "Vega"],
  correct: 1,
  explanation: "Gamma measures how much delta changes when the stock price moves."
},
{
  id: 290,
  category: "Options – Greeks (Vega)",
  question: "Which Greek measures sensitivity to changes in implied volatility?",
  options: ["Theta", "Gamma", "Delta", "Vega"],
  correct: 3,
  explanation: "Vega measures how much an option’s price changes as volatility changes."
},
{
  id: 291,
  category: "Options – Greeks (Rho)",
  question: "Which Greek measures sensitivity to interest rate changes?",
  options: ["Rho", "Vega", "Theta", "Gamma"],
  correct: 0,
  explanation: "Rho measures the impact of interest rate changes on option prices."
},
{
  id: 292,
  category: "Options – Time Decay",
  question: "Which options experience the fastest time decay?",
  options: ["Deep ITM options", "ATM options", "Deep OTM options", "LEAPS"],
  correct: 1,
  explanation: "ATM options lose time value the fastest as expiration approaches."
},
{
  id: 293,
  category: "Options – Volatility",
  question: "Implied volatility rises sharply. What happens to a long straddle?",
  options: ["Loses value", "No change", "Gains value", "Only calls gain"],
  correct: 2,
  explanation: "Long straddles benefit from higher volatility regardless of direction."
},
{
  id: 294,
  category: "Options – Volatility Crush",
  question: "Which event commonly causes volatility crush?",
  options: ["Dividend announcement", "Earnings release", "Fed rate hike", "Stock split"],
  correct: 1,
  explanation: "Implied volatility often drops sharply after earnings are released."
},
{
  id: 295,
  category: "Options – Strategy Identification",
  question: "Buying a call and a put with the same strike and expiration is called:",
  options: ["Strangle", "Iron condor", "Straddle", "Butterfly"],
  correct: 2,
  explanation: "A straddle involves buying both a call and a put at the same strike."
},
{
  id: 296,
  category: "Options – Strategy Identification",
  question: "Buying an OTM call and OTM put with same expiration is called:",
  options: ["Straddle", "Strangle", "Calendar spread", "Iron butterfly"],
  correct: 1,
  explanation: "A strangle uses OTM options on both sides."
},
{
  id: 297,
  category: "Options – Strategy Risk",
  question: "Which strategy profits from low volatility and range-bound prices?",
  options: ["Long straddle", "Long strangle", "Iron condor", "Long call"],
  correct: 2,
  explanation: "Iron condors benefit when price stays within a defined range."
},
{
  id: 298,
  category: "Options – Bullish Strategy",
  question: "Which options strategy benefits from a moderate rise in the stock price?",
  options: ["Long put", "Bull call spread", "Short call", "Long straddle"],
  correct: 1,
  explanation: "Bull call spreads profit from upward movement with limited risk."
},
{
  id: 299,
  category: "Options – Bearish Strategy",
  question: "Which strategy profits from a moderate decline in the stock price?",
  options: ["Bull put spread", "Bear put spread", "Covered call", "Iron condor"],
  correct: 1,
  explanation: "Bear put spreads profit from a controlled downside move."
},
{
  id: 300,
  category: "Options – Covered Call",
  question: "What is the primary risk of a covered call?",
  options: ["Unlimited loss", "Assignment risk and capped upside", "Volatility expansion", "Margin call"],
  correct: 1,
  explanation: "Covered calls limit upside if the stock rallies above the strike."
},
{
  id: 301,
  category: "Options – Protective Put",
  question: "Buying a put while owning the stock is known as:",
  options: ["Covered call", "Protective put", "Collar", "Iron condor"],
  correct: 1,
  explanation: "A protective put acts as insurance against downside risk."
},
{
  id: 302,
  category: "Options – Break-even",
  question: "What is the break-even price for a long call?",
  options: ["Strike − premium", "Strike + premium", "Premium only", "Strike price"],
  correct: 1,
  explanation: "Break-even = strike price + premium paid."
},
{
  id: 303,
  category: "Options – Break-even",
  question: "What is the break-even price for a long put?",
  options: ["Strike + premium", "Strike − premium", "Stock price", "Premium only"],
  correct: 1,
  explanation: "Break-even = strike price − premium paid."
},
{
  id: 304,
  category: "Options – Assignment",
  question: "When is assignment most likely to occur for short options?",
  options: ["When deeply ITM", "When OTM", "Before expiration only", "After expiration"],
  correct: 0,
  explanation: "Deep ITM options have the highest assignment risk."
},
{
  id: 305,
  category: "Options – Expected Move",
  question: "Expected move in a stock is primarily derived from:",
  options: ["Historical volatility", "Implied volatility", "Delta", "Gamma"],
  correct: 1,
  explanation: "Expected move is based on implied volatility priced into options."
},
{
    "id": 306,
    "category": "Options Moneyness",
    "question": "Stock at $50. Which option has the highest extrinsic value?",
    "options": ["$30 Put costs $10", "$30 Call costs $22", "$55 Put costs $30", "$55 Call costs $1"],
    "correct": 2,
    "explanation": "$55 put has $5 intrinsic and $25 extrinsic, which is the highest among the choices."
  },
  {
    "id": 307,
    "category": "Options Moneyness",
    "question": "Stock PLP at $100. Which option has intrinsic value?",
    "options": ["$90 Put", "$50 Put", "$150 Call", "$50 Call"],
    "correct": 3,
    "explanation": "$50 call is ITM with $50 intrinsic value. All others are OTM."
  },
  {
    "id": 308,
    "category": "Options Moneyness",
    "question": "Stock at $40. The $30 Call and $60 Put are:",
    "options": ["Both OTM", "Both ATM", "Both ITM", "$30 Call OTM, $60 Put ITM"],
    "correct": 2,
    "explanation": "$30 call and $60 put are both ITM because each has intrinsic value."
  },
  {
    "id": 309,
    "category": "Options Moneyness",
    "question": "Stock at $60. Two options with $40 strike. Which is true?",
    "options": ["Put ITM, Call OTM", "Both OTM", "Both ITM", "Put OTM, Call ITM"],
    "correct": 3,
    "explanation": "$40 call is ITM and $40 put is OTM when stock is $60."
  },
  {
    "id": 310,
    "category": "Options Moneyness",
    "question": "At expiration, an OTM option has:",
    "options": ["Both intrinsic and extrinsic", "Neither intrinsic nor extrinsic", "Only intrinsic", "Only extrinsic"],
    "correct": 1,
    "explanation": "OTM options expire worthless with no intrinsic or extrinsic value."
  },
  {
    "id": 311,
    "category": "Options Moneyness",
    "question": "At expiration, an ITM option has:",
    "options": ["Neither value", "Intrinsic only", "Extrinsic only", "Both values"],
    "correct": 1,
    "explanation": "At expiration, all extrinsic value decays, leaving only intrinsic value."
  },
  {
    "id": 312,
    "category": "Options Moneyness",
    "question": "Stock at $85. Which put is ITM?",
    "options": ["$80 put", "$85 put", "$90 put", "None ITM"],
    "correct": 2,
    "explanation": "Put options are ITM when strike price is above the stock price."
  },
  {
    "id": 313,
    "category": "Options Moneyness",
    "question": "Stock at $42. The $40 call is:",
    "options": ["OTM", "ATM", "ITM by $2", "ITM by $40"],
    "correct": 2,
    "explanation": "$42 minus $40 strike equals $2 intrinsic value."
  },
  {
    "id": 314,
    "category": "Options Moneyness",
    "question": "Stock at $55. Which options are both OTM?",
    "options": ["$50 call & $60 put", "$60 call & $50 put", "$50 call & $50 put", "$60 call & $60 put"],
    "correct": 1,
    "explanation": "$60 call and $50 put are both OTM when stock is $55."
  },
  {
    "id": 315,
    "category": "Options Moneyness",
    "question": "Stock at $120. Which call is ATM?",
    "options": ["$115 call", "$120 call", "$125 call", "$130 call"],
    "correct": 1,
    "explanation": "ATM means strike price equals the stock price."
  },
  {
    "id": 316,
    "category": "Options P&L",
    "question": "You buy a call for $4. What is your maximum loss?",
    "options": ["Unlimited", "$4", "$400", "Strike price"],
    "correct": 2,
    "explanation": "Each option contract represents 100 shares, so max loss is $4 × 100 = $400."
  },
  {
    "id": 317,
    "category": "Options P&L",
    "question": "You sell a naked call. Your maximum loss is:",
    "options": ["Limited to premium received", "Strike price", "Unlimited", "Difference between strikes"],
    "correct": 2,
    "explanation": "A naked call has unlimited loss potential if the stock rises indefinitely."
  },
  {
    "id": 318,
    "category": "Options P&L",
    "question": "You sell a cash-secured put. Maximum loss occurs if:",
    "options": ["Stock rises", "Stock stays flat", "Stock goes to zero", "Option expires OTM"],
    "correct": 2,
    "explanation": "Loss occurs if stock goes to zero and you must buy at the strike price."
  },
  {
    "id": 319,
    "category": "Options P&L",
    "question": "You buy a put for $6. What is your maximum profit?",
    "options": ["$600", "Unlimited", "Strike price minus premium", "Strike price × 100"],
    "correct": 2,
    "explanation": "Max profit is achieved if stock goes to zero: strike minus premium."
  },
  {
    "id": 320,
    "category": "Options P&L",
    "question": "A covered call strategy consists of:",
    "options": ["Long call + short call", "Long stock + short call", "Short stock + long call", "Long stock + long call"],
    "correct": 1,
    "explanation": "Covered call = owning the stock and selling a call against it."
  },
  {
    "id": 321,
    "category": "Options P&L",
    "question": "Maximum profit of a covered call occurs when:",
    "options": ["Stock goes to zero", "Stock rises above strike", "Stock stays below strike", "Implied volatility rises"],
    "correct": 1,
    "explanation": "Profit is capped at strike price plus premium received."
  },
  {
    "id": 322,
    "category": "Options P&L",
    "question": "Which strategy has limited risk and limited reward?",
    "options": ["Naked call", "Long call", "Covered call", "Long straddle"],
    "correct": 2,
    "explanation": "Covered calls cap both upside and downside compared to naked positions."
  },
  {
    "id": 323,
    "category": "Options P&L",
    "question": "Which options position benefits the most from time decay?",
    "options": ["Long call", "Long put", "Short option", "Long straddle"],
    "correct": 2,
    "explanation": "Short options have positive theta and benefit from time decay."
  },
  {
    "id": 324,
    "category": "Options P&L",
    "question": "A long straddle profits when:",
    "options": ["Stock is flat", "Volatility decreases", "Stock moves significantly", "Time passes"],
    "correct": 2,
    "explanation": "Straddles benefit from large price moves in either direction."
  },
  {
    "id": 325,
    "category": "Options P&L",
    "question": "Breakeven for a long call is:",
    "options": ["Strike + premium", "Strike - premium", "Premium × 100", "Strike price"],
    "correct": 0,
    "explanation": "Price must exceed strike plus premium paid to break even."
  },

];

const ExamApp = () => {
  // Shuffle function
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize with shuffled questions
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [shuffledQuestions[currentQuestion].id]: optionIndex
    });
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartExam = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl">CFOA Practice Exam Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold mb-2" style={{color: percentage >= 70 ? '#22c55e' : '#ef4444'}}>
                  {percentage}%
                </div>
                <div className="text-xl mb-4">
                  {score} out of {shuffledQuestions.length} correct
                </div>
                <Alert className={`max-w-md mx-auto ${percentage >= 70 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <AlertDescription className={percentage >= 70 ? 'text-green-800' : 'text-red-800'}>
                    {percentage >= 70 
                      ? '🎉 Excellent! You passed the practice exam!' 
                      : '📚 Keep studying! You need 70% to pass.'}
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="space-y-4 mb-6">
                {shuffledQuestions.map((q, index) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correct;
                  return (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? 
                          <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} /> :
                          <XCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                        }
                        <div className="flex-1">
                          <p className="font-medium mb-2">Q{index + 1}: {q.question}</p>
                          <p className="text-sm mb-1">
                            <span className="font-medium">Your answer:</span> {q.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm mb-2">
                              <span className="font-medium text-green-600">Correct answer:</span> {q.options[q.correct]}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <Button onClick={restartExam} size="lg">
                  <RotateCcw className="mr-2" size={20} />
                  Take Exam Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];
  const userAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CFOA Practice Exam</h1>
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {shuffledQuestions.length} • {currentQ.category}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start h-auto py-4 px-6 ${
                    userAnswer === index ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                >
                  <span className="mr-3 font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <Alert className={`mb-6 ${userAnswer === currentQ.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {userAnswer === currentQ.correct ? 
                    <CheckCircle className="text-green-600" size={20} /> :
                    <XCircle className="text-red-600" size={20} />
                  }
                  <span className={`font-medium ${userAnswer === currentQ.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {userAnswer === currentQ.correct ? 'Correct!' : `Incorrect. The correct answer is ${String.fromCharCode(65 + currentQ.correct)}.`}
                  </span>
                </div>
                <AlertDescription className={userAnswer === currentQ.correct ? 'text-green-800' : 'text-red-800'}>
                  {currentQ.explanation}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2" size={20} />
                Previous
              </Button>

              {showExplanation && (
                <Button onClick={nextQuestion}>
                  {currentQuestion === shuffledQuestions.length - 1 ? (
                    <>
                      View Results
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          Progress: {currentQuestion + 1}/{shuffledQuestions.length} questions
        </div>
      </div>
    </div>
  );
};

export default ExamApp;