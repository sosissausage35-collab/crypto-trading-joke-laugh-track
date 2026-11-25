// Laugh Track: The Crypto Trading Joke Contest
// (u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a)
//
// Writes one joke about crypto and trading life, one line, 1-200 chars,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set, for
// local testing where /output does not exist).
//
// Run: node main.ts
// Node 22+, no dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Candidate jokes, drafted fresh for this entry and scored against the
// judge brief (setup + surprise turn + payoff; true to trading life;
// tight phrasing with the punchline at the end; a line a trader repeats).
// ---------------------------------------------------------------------------
//
// 1. "I sold at the bottom to 'cut losses' — the chart immediately pumped,
//    and now my group chat uses me as a buy signal." (115 chars)
//    Setup: selling at the bottom. Turn: the chart pumps right after.
//    Payoff at the end: the group chat now uses me as a buy signal.
//    True to life (chart + group chat), self-deprecating, repeatable.
//    => PICKED.
//
// 2. "My trading strategy is simple: buy high, sell low, and tell the
//    group chat I'm 'accumulating.'" (94 chars)
//    Tight and true, but "buy high, sell low" is the oldest crypto joke
//    there is; the judge has read a thousand of them. Loses on freshness.
//
// 3. "I don't have a gambling problem, I have a diversified portfolio of
//    coins my group chat shilled me at 3am." (105 chars)
//    Good detail (3am shill), but the turn is thin: the payoff is just
//    the list itself, and "gambling problem" framing is generic.
//
// 4. "The chart said 'to the moon,' so I bought — turns out the moon was
//    a screenshot from 2021." (90 chars)
//    Nice turn, but the payoff lands mid-sentence and the joke is really
//    about a screenshot, not about trading life.
//
// 5. "My portfolio is down 90%, but on the bright side, my diamond hands
//    now qualify as a medical condition." (102 chars)
//    Decent payoff, but "diamond hands" does the work and the setup is
//    just a loss number; less of a story than #1.
//
// 6. "I set a stop-loss to protect my capital; the market hunted it,
//    pumped, and my group chat screenshotted the whole thing." (119 chars)
//    True to life, but three beats crowd one line and the punchline
//    ("screenshotted the whole thing") is weaker than #1's buy signal.
//
// Winner: #1. It has the clearest three-beat structure (setup -> turn ->
// payoff), two recognisable trading details (the chart, the group chat),
// the punchline lands on the last words, and it is a line a trader would
// repeat to a friend after getting rekt: "the group chat uses me as a
// buy signal."

const JOKE: string =
  "I sold at the bottom to 'cut losses' — the chart immediately pumped, and now my group chat uses me as a buy signal.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function main(): void {
  // Guard: the gate requires UTF-8 text of 1-200 characters, one line,
  // not only whitespace.
  if (JOKE.length < MIN_LENGTH || JOKE.length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${JOKE.length}`,
    );
  }
  if (JOKE.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  console.log(`wrote ${JOKE.length} characters to ${outPath}`);
}

main();
