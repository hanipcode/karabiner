import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";
import { deepmerge as merge } from "deepmerge-ts";

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
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // task related
    t: {
      // pomodoro
      p: open("raycast://extensions/asubbotin/pomodoro/pomodoro-control-timer"),
    },
    // open
    o: {
      c: app("Google Chrome"),
      t: app("iTerm"),
      b: app("Obsidian"),
      s: app("Slack"),
      l: app("Mail"),
    },
    // window management
    w: {
      l: rectangle("left-half"),
      k: rectangle("first-two-thirds"),
      e: rectangle("last-two-thirds"),
      t: rectangle("last-third"),
      r: rectangle("right-half"),
      m: rectangle("maximize"),
      c: rectangle("center"),
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
console.log(currentProfileAndRule);
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
