import fs from "fs";
import { KarabinerRules } from "./types";
import {
  createHyperSubLayers,
  app,
  open,
  createTabSubLayers,
  toCtrl,
  toAlt,
  toKeyCode,
} from "./utils";

const rules: KarabinerRules[] = [
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

  ...createTabSubLayers({
    // use tab as helper for common shift + [0-9] keys
    // very useful to reduce strain pressing shift with htose keys
    "1": toKeyCode("1", true),
    "2": toKeyCode("2", true),
    "3": toKeyCode("3", true),
    "4": toKeyCode("4", true),
    "5": toKeyCode("5", true),
    // use tab as arrow
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
    // convenience right hand
    p: {
      w: toAlt("period", true),
    },
    // aerospace move focus
    h: toAlt("h"),
    j: toAlt("j"),
    k: toAlt("k"),
    l: toAlt("l"),

    // aerospace shortcuts window related
    // w for aerospace usually used to create window
    w: {
      comma: toAlt("comma"),
      slash: toAlt("slash"),
      return_or_enter: toAlt("return_or_enter"),
      spacebar: toAlt("spacebar"),
    },
    // s is very convenient homerow
    // use it for something very frequent when writing code or text
    s: {
      a: toKeyCode("a", true),
      i: toKeyCode("i", true),
      d: toCtrl("d"),
      u: toCtrl("u"),
      // for things that use colon as modifier / command keys
      semicolon: toKeyCode("semicolon", true),
      // delete keys with backslash
      backslash: toKeyCode("delete_or_backspace"),
    },
    // aerospace workspace with shift included
    d: {
      hyphen: toAlt("hyphen", true),
      equal_sign: toAlt("equal_sign", true),
      semicolon: toAlt("semicolon", true),
      h: toAlt("h", true),
      j: toAlt("j", true),
      k: toAlt("k", true),
      l: toAlt("l", true),
      spacebar: toAlt("spacebar", true),
    },
    // aersospace workspace
    semicolon: {
      quote: toAlt("tab"),
      q: toAlt("q"),
      w: toAlt("w"),
      e: toAlt("e"),
      r: toAlt("r"),
      a: toAlt("a"),
      s: toAlt("s"),
      d: toAlt("d"),
      g: toAlt("g"),
      f: toAlt("f"),
      z: toAlt("z"),
      x: toAlt("x"),
      c: toAlt("c"),
      v: toAlt("v"),
      m: toAlt("m"),
      l: toAlt("l"),
      k: toAlt("k"),
      i: toAlt("i"),
      o: toAlt("o"),
      p: toAlt("p"),
    },
    // aerospace move to workspace
    comma: {
      q: toAlt("q", true),
      w: toAlt("w", true),
      e: toAlt("e", true),
      r: toAlt("r", true),
      a: toAlt("a", true),
      s: toAlt("s", true),
      d: toAlt("d", true),
      g: toAlt("g", true),
      f: toAlt("f", true),
      z: toAlt("z", true),
      x: toAlt("x", true),
      c: toAlt("c", true),
      v: toAlt("v", true),
      m: toAlt("m", true),
      l: toAlt("l", true),
      k: toAlt("k", true),
      i: toAlt("i", true),
      o: toAlt("o", true),
      p: toAlt("p", true),
    },
    // open
    o: {
      c: open("raycast://extensions/Codely/google-chrome/new-window"),
      l: app("Calendar"),
      g: app("ChatGPT"),
      f: app("Figma"),
      t: open("raycast://extensions/ron-myers/iterm/new-iterm-window"),
      b: app("Obsidian"),
      // pomodoro
      p: app("Session"),
      s: app("Slack"),
      m: app("Mail"),
      v: app("Visual Studio Code"),
    },
    r: {
      // raycast related
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
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

  // remap right shift to lctrl
  {
    description: "remap right shift to lctrl",
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
  {
    description: "remap right control to right option",
    manipulators: [
      {
        from: {
          key_code: "right_control",
        },
        to: [
          {
            key_code: "right_option",
          },
        ],
        type: "basic",
      },
    ],
  },

  {
    description: "remap right option to lctrl",
    manipulators: [
      {
        from: {
          key_code: "right_command",
        },
        to: [
          {
            key_code: "right_option",
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
