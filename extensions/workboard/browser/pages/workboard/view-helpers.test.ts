import { describe, expect, it } from "vitest";
import type { WorkboardCard } from "../../lib/workboard/index.ts";
import { matchesFilter } from "./view-helpers.ts";

const CARD_ID = "123e4567-e89b-12d3-a456-426614174000";

function card(): WorkboardCard {
  return {
    id: CARD_ID,
    title: "Synthetic card",
    status: "todo",
    priority: "normal",
    labels: [],
  } as WorkboardCard;
}

describe("matchesFilter card id search", () => {
  it("matches the full card id", () => {
    expect(matchesFilter(card(), { query: CARD_ID, priority: "all" })).toBe(true);
  });

  it("matches a card id prefix", () => {
    expect(matchesFilter(card(), { query: "123e4567", priority: "all" })).toBe(true);
  });

  it("matches the card id case-insensitively", () => {
    expect(matchesFilter(card(), { query: "123E4567-E89B", priority: "all" })).toBe(true);
  });

  it("still matches the title", () => {
    expect(matchesFilter(card(), { query: "synthetic", priority: "all" })).toBe(true);
  });

  it("does not match an unrelated query", () => {
    expect(matchesFilter(card(), { query: "no-such-card", priority: "all" })).toBe(false);
  });
});
