# Getting Started

- Ensure Node.js is installed on the machine (node v20.18.0 was used for development)
- In the directory containing the package.json file enter the following commands into a terminal:
  - `npm install`
  - `npm run dev`
- This will build and run the dev server
- The terminal will display a link like `Local:   http://localhost:5173/`. Click it to open the app.

# TODO

The following are items I was either not able to get to within the time limit, or were unclear enough that I think clarification of the design is warranted before further implementation.

## General

- [ ] The spec design has a "zero state" with 3 empty centered boxes. It's not clear to me what these do, what they are for, or how they interact with any of the rest of the design. Rather than implement these absent any information, I would seek clarity first.

## Dice Input

- [ ] Implemented an out-of-spec behavior to allow right clicking the dice buttons
- [ ] Clicking outside of the menu doesn't currently close the menu. This is "root-close" behavior that has some gotchas in implementation. I would probably look at a library like https://floating-ui.com/ to handle this along with general tooltip/popover functionality.
- [ ] The die icons in the popover menu don't change color when selected as shown in the spec.
- [ ] Spec indicates "bonus points" for allowing the cursor to increment specific portions of the roll in conjunction with the arrow keys. Not yet implemented.
- [ ] Generally speaking, it's unclear how the dice buttons and dice notation input should interact once the user starts manually editing. The user can do all kinds of things that can't be represented in the buttons (reordering, separate terms with duplicate dice, etc). How should such edits be accounted for if the user goes back to clicking the dice buttons? Surely wouldn't want to delete the user's input, but how can we integrate them cleanly? Seek clarity.
- [ ] Spec has the line "Should have some form of visual dice rolling". Get clarity on this. Spinning animated dice icons? 3D dice like shown in the demo reel? Something else?

## Chat Log

- [ ] Chat log doesn't currently differentiate the current user's messages from others, as requested by the spec. However, the socket.io response seems to lack any indication of initiating user, which seems required. Consult the team on a path forward.
  - [ ] Guest portrait/badge display in the spec is not yet implemented
- [ ] Chat bubbles have a user-unfriendly timestamp that doesn't match the spec.
- [ ] Chat bubbles dice breakdown uses simplified formatting compared to the spec.
- [ ] Chat log scrolling is currently disabled. This was not explicit in the spec, but users will definitely want it.

## Service

- [ ] Not gracefully handling disconnections
- [ ] Not gracefully handling expired tokens
