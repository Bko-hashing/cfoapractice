interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const questions: Question[] = [
  // Original Questions (Enhanced Options Fundamentals)
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

  // Questions from additionalcfoa.txt - Options Moneyness
  {
    id: 6,
    category: "Options Moneyness",
    question: "Stock at $50. Which option has the highest extrinsic value?",
    options: ["$30 Put costs $10", "$30 Call costs $22", "$55 Put costs $30", "$55 Call costs $1"],
    correct: 2,
    explanation: "$30 Put: OTM, $0 intrinsic, $10 extrinsic. $30 Call: ITM $20 intrinsic, $2 extrinsic. $55 Put: ITM $5 intrinsic, $25 extrinsic (HIGHEST). $55 Call: OTM, $0 intrinsic, $1 extrinsic."
  },
  {
    id: 7,
    category: "Options Moneyness",
    question: "Stock PLP at $100. Which has intrinsic value?",
    options: ["$90 Put", "$50 Put", "$150 Call", "$50 Call"],
    correct: 3,
    explanation: "$50 Call is ITM with $50 intrinsic value ($100 stock - $50 strike = $50). All others are OTM with $0 intrinsic."
  },
  {
    id: 8,
    category: "Options Moneyness",
    question: "Stock at $40. The $30 Call and $60 Put are:",
    options: ["Both OTM", "Both ATM", "Both ITM", "$30 Call OTM, $60 Put ITM"],
    correct: 2,
    explanation: "$30 Call ITM (stock $40 > strike $30, has $10 intrinsic). $60 Put ITM (strike $60 > stock $40, has $20 intrinsic)."
  },
  {
    id: 9,
    category: "Options Moneyness",
    question: "Stock at $60. Two options with $40 strike. Which is true?",
    options: ["Put ITM, Call OTM", "Both OTM", "Both ITM", "Put OTM, Call ITM"],
    correct: 3,
    explanation: "$40 Call ITM ($60 stock > $40 strike, $20 intrinsic). $40 Put OTM ($60 stock > $40 strike, $0 intrinsic)."
  },
  {
    id: 10,
    category: "Options Moneyness",
    question: "At expiration, an OTM option has:",
    options: ["Both intrinsic and extrinsic", "Neither intrinsic nor extrinsic", "Only intrinsic", "Only extrinsic"],
    correct: 1,
    explanation: "OTM options expire worthless - no intrinsic value (OTM) and no time value remaining (at expiration)."
  },
  {
    id: 11,
    category: "Options Moneyness",
    question: "At expiration, an ITM option has:",
    options: ["Neither value", "Intrinsic only", "Extrinsic only", "Both values"],
    correct: 1,
    explanation: "At expiration, only intrinsic value remains. All time value has decayed to zero."
  },
  {
    id: 12,
    category: "Options Moneyness",
    question: "Stock at $85. Which put is ITM?",
    options: ["$80 put", "$85 put", "$90 put", "None ITM"],
    correct: 2,
    explanation: "Put is ITM when strike > stock. $90 put has $5 intrinsic ($90 - $85 = $5)."
  },
  {
    id: 13,
    category: "Options Moneyness",
    question: "Stock at $42. The $40 call is:",
    options: ["OTM", "ATM", "ITM by $2", "ITM by $40"],
    correct: 2,
    explanation: "Call ITM when stock > strike. $42 stock - $40 strike = $2 ITM (intrinsic value)."
  },
  {
    id: 14,
    category: "Options Moneyness",
    question: "Stock at $55. Which options are both OTM?",
    options: ["$50 call & $60 put", "$60 call & $50 put", "$50 call & $50 put", "$60 call & $60 put"],
    correct: 1,
    explanation: "$60 call OTM (strike $60 > stock $55). $50 put OTM (strike $50 < stock $55). Both have $0 intrinsic."
  },
  {
    id: 15,
    category: "Options Moneyness",
    question: "Stock at $120. Which call is ATM?",
    options: ["$115 call", "$120 call", "$125 call", "$130 call"],
    correct: 1,
    explanation: "ATM (at-the-money) = strike equals stock price. $120 call is ATM."
  },

  // Futures Symbols - Index
  {
    id: 16,
    category: "Futures Symbols - Index",
    question: "S&P 500 E-mini futures symbol:",
    options: ["SP", "ES", "SPX", "SPY"],
    correct: 1,
    explanation: "ES = E-mini S&P 500 futures traded on CME."
  },
  {
    id: 17,
    category: "Futures Symbols - Index",
    question: "Nasdaq 100 E-mini futures symbol:",
    options: ["NQ", "ND", "NDX", "QQQ"],
    correct: 0,
    explanation: "NQ = E-mini Nasdaq-100 futures."
  },
  {
    id: 18,
    category: "Futures Symbols - Index",
    question: "Dow Jones futures symbol:",
    options: ["DJ", "YM", "DIA", "DOW"],
    correct: 1,
    explanation: "YM = E-mini Dow ($5) futures contract."
  },
  {
    id: 19,
    category: "Futures Symbols - Index",
    question: "Russell 2000 futures symbol:",
    options: ["RTY", "TF", "IWM", "RS"],
    correct: 1,
    explanation: "TF (or RTY) = Russell 2000 E-mini futures for small-cap stocks."
  },
  {
    id: 20,
    category: "Futures Symbols - Index",
    question: "ES March 2026 contract code:",
    options: ["ESH6", "ESH26", "ESM6", "ESP6"],
    correct: 0,
    explanation: "ES = S&P 500, H = March, 6 = 2026. Format: SYMBOL + MONTH + YEAR."
  },

  // Questions from additionalcfoa2.txt
  {
    id: 21,
    category: "Options – Moneyness (Calls)",
    question: "Stock XYZ trades at $105. A call option has a strike price of $100. This option is:",
    options: ["Out-of-the-money", "At-the-money", "In-the-money", "Deep out-of-the-money"],
    correct: 2,
    explanation: "Call options are ITM when stock price > strike price. $105 > $100."
  },
  {
    id: 22,
    category: "Options – Moneyness (Puts)",
    question: "Stock ABC trades at $48. A put option has a strike price of $50. This option is:",
    options: ["Out-of-the-money", "In-the-money", "At-the-money", "Deep in-the-money"],
    correct: 1,
    explanation: "Put options are ITM when stock price < strike price. $48 < $50."
  },
  {
    id: 23,
    category: "Options – Profit/Loss (Long Call)",
    question: "A trader buys a call option for $4 with a strike price of $60. At expiration, the stock is $68. What is the profit per share?",
    options: ["$0", "$4", "$8", "$4"],
    correct: 3,
    explanation: "Intrinsic value = $68 − $60 = $8. Profit = $8 − $4 premium = $4."
  },
  {
    id: 24,
    category: "Options – Maximum Loss",
    question: "What is the maximum possible loss for a trader who buys a put option?",
    options: ["Unlimited", "Strike price", "Premium paid", "Difference between strike and stock price"],
    correct: 2,
    explanation: "For long options (calls or puts), max loss is limited to the premium paid."
  },
  {
    id: 25,
    category: "Options – Probability of Profit",
    question: "Which option position typically has a higher probability of profit but limited upside?",
    options: ["Long call", "Long put", "Short call", "Short put"],
    correct: 3,
    explanation: "Short puts profit if the stock stays above the strike, giving higher probability but capped gain (premium)."
  },
  {
    id: 26,
    category: "Options – Greeks (Delta)",
    question: "Which Greek measures how much an option's price changes for a $1 move in the underlying stock?",
    options: ["Gamma", "Theta", "Delta", "Vega"],
    correct: 2,
    explanation: "Delta measures sensitivity of option price to changes in the underlying asset price."
  },
  {
    id: 27,
    category: "Options – Greeks (Theta)",
    question: "Which Greek represents time decay and generally hurts long option holders?",
    options: ["Delta", "Vega", "Theta", "Rho"],
    correct: 2,
    explanation: "Theta measures the rate at which option value declines as time passes."
  },
  {
    id: 28,
    category: "Options – Volatility Impact",
    question: "All else equal, what happens to option prices when implied volatility increases?",
    options: ["Calls rise, puts fall", "Puts rise, calls fall", "Both calls and puts increase", "Both calls and puts decrease"],
    correct: 2,
    explanation: "Higher volatility increases the probability of large moves, raising both call and put prices."
  },
  {
    id: 29,
    category: "Options – Strategy Identification",
    question: "A trader sells a call option while owning the underlying stock. This strategy is called:",
    options: ["Naked call", "Protective put", "Covered call", "Bull call spread"],
    correct: 2,
    explanation: "A covered call involves selling a call against shares already owned."
  },
  {
    id: 30,
    category: "Options – Strategy Risk",
    question: "Which option strategy has limited upside, limited downside, and benefits from low volatility?",
    options: ["Long straddle", "Long call", "Iron condor", "Protective put"],
    correct: 2,
    explanation: "Iron condors profit from range-bound markets with low volatility and defined risk."
  },
  {
    id: 31,
    category: "Options – Moneyness (ATM)",
    question: "Stock DEF trades at $50. Which option is considered at-the-money?",
    options: ["$45 call", "$50 call", "$55 call", "$60 call"],
    correct: 1,
    explanation: "An option is ATM when the strike price equals the stock price."
  },
  {
    id: 32,
    category: "Options – Moneyness (Calls)",
    question: "Stock trades at $72. Which call option is out-of-the-money?",
    options: ["$65 call", "$70 call", "$72 call", "$75 call"],
    correct: 3,
    explanation: "Calls are OTM when strike price is above the stock price."
  },
  {
    id: 33,
    category: "Options – Moneyness (Puts)",
    question: "Stock trades at $40. Which put option is out-of-the-money?",
    options: ["$50 put", "$45 put", "$40 put", "$35 put"],
    correct: 3,
    explanation: "Puts are OTM when strike price is below the stock price."
  },
  {
    id: 34,
    category: "Options – P/L (Long Put)",
    question: "A trader buys a put with a $90 strike for $5. Stock closes at $80 at expiration. What is the profit per share?",
    options: ["$0", "$5", "$10", "$5"],
    correct: 3,
    explanation: "Intrinsic value = $90 − $80 = $10. Profit = $10 − $5 = $5."
  },
  {
    id: 35,
    category: "Options – P/L (Short Call)",
    question: "A trader sells a call for $3. The option expires worthless. What is the profit per share?",
    options: ["$0", "$3", "$-3", "Unlimited"],
    correct: 1,
    explanation: "If a sold option expires worthless, profit equals the premium received."
  },
  {
    id: 36,
    category: "Options – Maximum Loss",
    question: "What is the maximum loss of a short call position?",
    options: ["Premium received", "Strike price", "Unlimited", "Difference between strikes"],
    correct: 2,
    explanation: "Short calls have unlimited loss if the stock rises significantly."
  },
  {
    id: 37,
    category: "Options – Maximum Gain",
    question: "What is the maximum gain of a long call option?",
    options: ["Strike price", "Premium paid", "Unlimited", "Difference between strike and stock price"],
    correct: 2,
    explanation: "A long call has unlimited upside as the stock price increases."
  },
  {
    id: 38,
    category: "Options – Probability of Profit",
    question: "Which option generally has a higher probability of expiring worthless?",
    options: ["Deep ITM call", "ATM call", "OTM call", "ITM put"],
    correct: 2,
    explanation: "OTM options require a larger move to become profitable."
  },
  {
    id: 39,
    category: "Options – Greeks (Gamma)",
    question: "Which Greek measures the rate of change of delta?",
    options: ["Delta", "Gamma", "Theta", "Vega"],
    correct: 1,
    explanation: "Gamma measures how much delta changes when the stock price moves."
  },
  {
    id: 40,
    category: "Options – Greeks (Vega)",
    question: "Which Greek measures sensitivity to changes in implied volatility?",
    options: ["Theta", "Gamma", "Delta", "Vega"],
    correct: 3,
    explanation: "Vega measures how much an option's price changes as volatility changes."
  },
  {
    id: 41,
    category: "Options – Greeks (Rho)",
    question: "Which Greek measures sensitivity to interest rate changes?",
    options: ["Rho", "Vega", "Theta", "Gamma"],
    correct: 0,
    explanation: "Rho measures the impact of interest rate changes on option prices."
  },
  {
    id: 42,
    category: "Options – Time Decay",
    question: "Which options experience the fastest time decay?",
    options: ["Deep ITM options", "ATM options", "Deep OTM options", "LEAPS"],
    correct: 1,
    explanation: "ATM options lose time value the fastest as expiration approaches."
  },
  {
    id: 43,
    category: "Options – Volatility",
    question: "Implied volatility rises sharply. What happens to a long straddle?",
    options: ["Loses value", "No change", "Gains value", "Only calls gain"],
    correct: 2,
    explanation: "Long straddles benefit from higher volatility regardless of direction."
  },
  {
    id: 44,
    category: "Options – Volatility Crush",
    question: "Which event commonly causes volatility crush?",
    options: ["Dividend announcement", "Earnings release", "Fed rate hike", "Stock split"],
    correct: 1,
    explanation: "Implied volatility often drops sharply after earnings are released."
  },
  {
    id: 45,
    category: "Options – Strategy Identification",
    question: "Buying a call and a put with the same strike and expiration is called:",
    options: ["Strangle", "Iron condor", "Straddle", "Butterfly"],
    correct: 2,
    explanation: "A straddle involves buying both a call and a put at the same strike."
  },
  {
    id: 46,
    category: "Options – Strategy Identification",
    question: "Buying an OTM call and OTM put with same expiration is called:",
    options: ["Straddle", "Strangle", "Calendar spread", "Iron butterfly"],
    correct: 1,
    explanation: "A strangle uses OTM options on both sides."
  },
  {
    id: 47,
    category: "Options – Strategy Risk",
    question: "Which strategy profits from low volatility and range-bound prices?",
    options: ["Long straddle", "Long strangle", "Iron condor", "Long call"],
    correct: 2,
    explanation: "Iron condors benefit when price stays within a defined range."
  },
  {
    id: 48,
    category: "Options – Bullish Strategy",
    question: "Which options strategy benefits from a moderate rise in the stock price?",
    options: ["Long put", "Bull call spread", "Short call", "Long straddle"],
    correct: 1,
    explanation: "Bull call spreads profit from upward movement with limited risk."
  },
  {
    id: 49,
    category: "Options – Bearish Strategy",
    question: "Which strategy profits from a moderate decline in the stock price?",
    options: ["Bull put spread", "Bear put spread", "Covered call", "Iron condor"],
    correct: 1,
    explanation: "Bear put spreads profit from a controlled downside move."
  },
  {
    id: 50,
    category: "Options – Covered Call",
    question: "What is the primary risk of a covered call?",
    options: ["Unlimited loss", "Assignment risk and capped upside", "Volatility expansion", "Margin call"],
    correct: 1,
    explanation: "Covered calls limit upside if the stock rallies above the strike."
  },
  {
    id: 51,
    category: "Options – Break-even",
    question: "What is the break-even price for a long call?",
    options: ["Strike − premium", "Strike + premium", "Premium only", "Strike price"],
    correct: 1,
    explanation: "Break-even = strike price + premium paid."
  },
  {
    id: 52,
    category: "Options – Break-even",
    question: "What is the break-even price for a long put?",
    options: ["Strike + premium", "Strike − premium", "Stock price", "Premium only"],
    correct: 1,
    explanation: "Break-even = strike price − premium paid."
  },
  {
    id: 53,
    category: "Options – Assignment",
    question: "When is assignment most likely to occur for short options?",
    options: ["When deeply ITM", "When OTM", "Before expiration only", "After expiration"],
    correct: 0,
    explanation: "Deep ITM options have the highest assignment risk."
  },
  {
    id: 54,
    category: "Options – Expected Move",
    question: "Expected move in a stock is primarily derived from:",
    options: ["Historical volatility", "Implied volatility", "Delta", "Gamma"],
    correct: 1,
    explanation: "Expected move is based on implied volatility priced into options."
  },

  // Additional Options P&L Questions
  {
    id: 55,
    category: "Options P&L Calculations",
    question: "Buy $50 call for $3. Stock at $58 at expiration. Profit?",
    options: ["$500", "$800", "$300 loss", "$200 loss"],
    correct: 0,
    explanation: "Intrinsic = $58 - $50 = $8. Profit = ($8 - $3) × 100 = $500."
  },
  {
    id: 56,
    category: "Options P&L Calculations",
    question: "Sell $40 put for $2. Stock at $35. P&L?",
    options: ["$200 profit", "$300 loss", "$500 loss", "$700 loss"],
    correct: 1,
    explanation: "Buy at $40, worth $35 = $5 loss - $2 premium = $3 × 100 = $300 loss."
  },
  {
    id: 57,
    category: "Options P&L Calculations",
    question: "Buy $40 put for $3. Stock at $37. Profit?",
    options: ["Break-even", "$300 loss", "$300 profit", "$700 profit"],
    correct: 0,
    explanation: "Put breakeven = $40 - $3 = $37. At $37 = break-even."
  },
  {
    id: 58,
    category: "Options P&L Calculations",
    question: "Buy $60/$70 call vertical for $3. Stock at $72. Profit?",
    options: ["$700", "$500", "$1,000", "$300"],
    correct: 0,
    explanation: "Max profit = width - debit = ($10 - $3) × 100 = $700."
  },
  {
    id: 59,
    category: "Options P&L Calculations",
    question: "Sell $45/$35 put vertical for $2. Stock at $30. Loss?",
    options: ["$200", "$800", "$1,000", "$600"],
    correct: 1,
    explanation: "Max loss = (width - credit) × 100 = ($10 - $2) × 100 = $800."
  },
  {
    id: 60,
    category: "Options P&L Calculations",
    question: "Iron condor $4 credit. Stock middle. Profit?",
    options: ["$400", "$600", "$0", "$800"],
    correct: 0,
    explanation: "All OTM. Keep full credit: $4 × 100 = $400."
  }
];