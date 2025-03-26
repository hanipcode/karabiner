import fs from "fs";
import { KarabinerRules, To } from "./types";
import {
  createHyperSubLayers,
  open,
  createTabSubLayers,
  toCtrl,
  toAlt,
  toKeyCode,
  toCmd,
  createKeySubLayers,
} from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "tilde remapping",
    manipulators: [
      {
        description: "tilde remapping",
        from: {
          key_code: "grave_accent_and_tilde",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        to_if_alone: [
          {
            key_code: "grave_accent_and_tilde",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Tab Layering",
    manipulators: [
      {
        description: "Tab Layering",
        from: {
          key_code: "tab",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "tab_layer",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "tab_layer",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "tab",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "left_shift",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_shift",
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },

  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "left_alt",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_alt",
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createKeySubLayers("grave_accent_and_tilde", {
    h: toCtrl("h"),
    j: toCtrl("j"),
    k: toCtrl("k"),
    l: toCtrl("l"),
  }),
  ...createTabSubLayers({
    // very useful to reduce strain pressing shift with htose keys
    h: toKeyCode("left_arrow"),
    j: toKeyCode("down_arrow"),
    k: toKeyCode("up_arrow"),
    l: toKeyCode("right_arrow"),
  }),
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // tmux change mode, so important
    a: toCtrl("a"),
    // home row
    j: toCmd("j", true),
    k: toCmd("k", true),

    // mpst opened aerospace workspace
    s: toAlt("s"),
    d: toAlt("d"),
    g: toAlt("g"),
    m: toAlt("m"),
    q: toAlt("q"),
    w: toAlt("w"),
    e: toAlt("e"),
    z: toAlt("z"),
    x: toAlt("x"),
    c: toCtrl("c"),

    // aerospace helper
    open_bracket: toAlt("open_bracket"),
    close_bracket: toAlt("close_bracket"),
    backslash: toAlt("backslash"),
    return_or_enter: toAlt("return_or_enter"),

    // most used vim shortcut
    // abort in lsp
    o: toCtrl("o"),
    i: toCtrl("i"),

    semicolon: {
      quote: toAlt("tab"),
      q: toAlt("q"),
      w: toAlt("w"),
      e: toAlt("e"),
      r: toAlt("r"),
      t: toAlt("t"),
      y: toAlt("y"),
      u: toAlt("u"),
      i: toAlt("i"),
      o: toAlt("o"),
      p: toAlt("p"),
      a: toAlt("a"),
      s: toAlt("s"),
      d: toAlt("d"),
      f: toAlt("f"),
      g: toAlt("g"),
      h: toAlt("h"),
      j: toAlt("j"),
      k: toAlt("k"),
      l: toAlt("l"),
      z: toAlt("z"),
      x: toAlt("x"),
      c: toAlt("c"),
      v: toAlt("v"),
      b: toAlt("b"),
      n: toAlt("n"),
      m: toAlt("m"),
    },
    // aerospace move to workspace
    comma: {
      quote: toAlt("tab", true),
      q: toAlt("q", true),
      w: toAlt("w", true),
      e: toAlt("e", true),
      r: toAlt("r", true),
      t: toAlt("t", true),
      y: toAlt("y", true),
      u: toAlt("u", true),
      i: toAlt("i", true),
      o: toAlt("o", true),
      p: toAlt("p", true),
      a: toAlt("a", true),
      s: toAlt("s", true),
      d: toAlt("d", true),
      f: toAlt("f", true),
      g: toAlt("g", true),
      h: toAlt("h", true),
      j: toAlt("j", true),
      k: toAlt("k", true),
      l: toAlt("l", true),
      z: toAlt("z", true),
      x: toAlt("x", true),
      c: toAlt("c", true),
      v: toAlt("v", true),
      b: toAlt("b", true),
      n: toAlt("n", true),
      m: toAlt("m", true),
    },
    r: {
      // raycast related
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      t: open("raycast://extensions/raycast/translator/translate"),
      s: open("raycast://extensions/raycast/snippets/search-snippets"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      c: open("raycast://extensions/raycast/calendar/my-schedule"),
      k: open("raycast://extensions/raycast/jira/active-sprints"),
      j: open("raycast://extensions/raycast/jira/my-filters"),
      q: open("raycast://extensions/Codely/google-chrome/search-tab"),
      p: open("raycast://extensions/raycast/github/my-pull-requests"),
      open_bracket: open("raycast://extensions/raycast/github/notifications"),
    },
    // terminal related
  }),

  // remap right del to lctrl
  {
    description: "remap right_shift  to lctrl",
    manipulators: [
      {
        from: {
          key_code: "right_shift",
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        type: "basic",
      },
    ],
  },
];

const currentProfileAndRule = JSON.parse(
  fs.readFileSync("karabiner.json", "utf8")
);
currentProfileAndRule.profiles[0].complex_modifications.rules = rules;

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(currentProfileAndRule, null, 2)
);
