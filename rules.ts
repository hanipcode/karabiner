import fs from "fs";
import { KarabinerRules } from "./types";
import {
  createHyperSubLayers,
  app,
  open,
  rectangle,
  shell,
  createTabSubLayers,
  resetTabOnKeys,
} from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "Use ctrl with backtick",
    manipulators: [
      {
        description: "to ctrl",
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
    description: "Use ctrl with backslash",
    manipulators: [
      {
        description: "to ctrl",
        from: {
          key_code: "backslash",
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
            key_code: "backslash",
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
  ...createTabSubLayers({
    ...resetTabOnKeys([
      "left_command",
      "left_control",
      "right_command",
      "right_control",
    ]),
    h: {
      to: [
        {
          key_code: "left_arrow",
        },
      ],
    },
    j: {
      to: [
        {
          key_code: "down_arrow",
        },
      ],
    },
    k: {
      to: [
        {
          key_code: "up_arrow",
        },
      ],
    },
    l: {
      to: [
        {
          key_code: "right_arrow",
        },
      ],
    },
    q: {
      to: [
        {
          key_code: "left_control",
        },
      ],
    },
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
    // task related
    // open
    o: {
      c: app("Google Chrome"),
      l: app("Calendar"),
      f: app("Figma"),
      t: app("iTerm"),
      b: app("Obsidian"),
      spacebar: open(
        "raycast://extensions/KevinBatdorf/obsidian/dailyNoteCommand"
      ),
      // pomodoro
      p: app("Session"),
      s: app("Slack"),
      m: app("Mail"),
      v: app("Visual Studio Code"),
    },
    w: {
      // window management
      l: rectangle("left-half"),
      k: rectangle("first-two-thirds"),
      e: rectangle("last-two-thirds"),
      t: rectangle("last-third"),
      r: rectangle("right-half"),
      semicolon: rectangle("first-third"),
      m: rectangle("maximize"),
      c: rectangle("center"),
    },
    r: {
      // raycast related
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      s: open("raycast://extensions/raycast/snippets/search-snippets"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      spacebar: open("raycast://extensions/raycast/raycast/confetti"),
      c: open("raycast://extensions/raycast/calendar/my-schedule"),
      j: open("raycast://extensions/raycast/jira/active-sprints"),
      q: open("raycast://extensions/Codely/google-chrome/search-tab"),
    },
    // terminal related
    t: {
      w: open(
        "raycast://extensions/louishuyng/tmux-sessioner/manage_tmux_windows"
      ),
      s: open("raycast://extensions/louishuyng/tmux-sessioner/index"),
      c: open(
        "raycast://extensions/louishuyng/tmux-sessioner/create_new_session"
      ),
    },
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
    },
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
    description: "remap right option to lctrl",
    manipulators: [
      {
        from: {
          key_code: "right_command",
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
//
// fs.writeFileSync(
//   "karabiner.json",
//   JSON.stringify(
//     merge(currentProfileAndRule, {
//       global: {
//         show_in_menu_bar: false,
//       },
//       profiles: [
//         {
//           name: "Default",
//           complex_modifications: {
//             rules,
//           },
//         },
//       ],
//     }),
//     null,
//     2
//   )
// );
