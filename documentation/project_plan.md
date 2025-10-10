# Project Structure

```
star-rail-dashboard/
├── srd-back-end/
│   ├── nest-js-app/
│   ├── Dockerfile
│   ├── .env.development.local
│   └── README.md                   # Backend setup and API documentation
├── srd-front-end/
│   ├── react-app/
│   ├── Dockerfile
│   ├── .env.development.local
│   └── README.md                   # Frontend setup and usage instructions
├── shared/                         # Shared types between Frontend and Backend
├── documentation/
│   ├── dev-log.md                  # Developer changelog and progress notes
│   └── project-planning.md         # Architecture decisions and feature planning
├── docker-compose.yml
└── README.md                       # Root project overview and tech stack

```


# Features

## 1. Warp Tracker
### Back End
- Currencies
  - Stellar Jades
  - Special Pass
  - Undying Starlight
  - Oneric Shards
- Constants
  - Daily Training Jades
  - Cyclical Jades
  - Daily Supply Pass Jades
  - Nameless Honor Jades
  - Undying Embers Passes
  - Nameless Honor Passes
- Standard User Input
  - Current Stellar Jades
  - Current Special Passes
  - Current Undying Starlight
  - Deadline (First day of selected banner)
  - Has Supply Pass? [T/F]
  - Has Nameless Honor? [T/F]
  - Include Undying Starlight? [T/F]
  - Include Oneric Shards? [T/F]
- Additional User Input
  - Mission Jades
  - Event Jades
  - Synchronicity (DU) Jades
  - Other

> Note these calculations will NOT take into account Jades earned from the following:
> - Achievements
> - Obtained character messages
> - Puzzles
> - Map exploration
> Users may calculate these themselves and enter in `Additional User Input: Other` if they believe they can accurately calculate these amounts

### Front End
- Numeric inputs: Currency amounts
- Dropdown deadline: {version: number, banner: string, date: number}
- Boolean switches: Toggle currency calculations
- List of additional inputs: {type: string, title: string, passes: number}; {type, title: string, jades: number}
- Final output: Jade count, Passes count
- Future: Source pie chart

## 2. Pity Tracker

### Back End
- numbers: limited character, limited lightcone, and stellar pity
- boolean: limited character and limited lightcone guarantee
-celestial invitation characters {name: string, invitation: boolean}

### Front End
- numeric input: limited character pity, limited lightcone pity, stellar pity
- Boolean input: limited character guarantee, limited light cone guarnatee
- multiple select input: celestial invitation (characters in the 50/50 loss pool)
- edit/finish button for changing values and viewing content

## 3. End Game Tracker

### Back End
- Modes: Memory of Chaos, Pure Fiction, Apocalptic Shadow, Anomaly Arbitration
- Name of mode version
- Time until reset

### Front End
- edit/finish button
- form (for each mode)
  - name
  - deadline (date)

## 4. To-Do List

### Back End
- Task Options
  - quests {name: string, type: string}
    - Trailblaze, Trailblaze Continuance, Companion, Adventure
  - exploration {world: string, map: string}
  - event: {name: string, deadline: date}
  - build character {name: string}
    - level, traces, lightcone, relics {head, body, hands, feet, planar, rope}
  - other

### Front End
- add task: dropdown for type
- completed and ongoing tab
- quest
  - dropdown for type
  - string input or type
- exploration
  - dropdown for world
  - dropdown for map
- event
  - string input for name
  - calendar input for deadline
- build
  - dropdown for name
  - checkbox for each other attribute
- other
  - string input for title
  - string input for description
- future
  - filter by task type


## 5. Run Showcase

### Back End
- playlist: {name: string, url: string}

### Front End
- dropdown: pick playlist
- list of videos

## 6. User Information
### Back End
- name: string
- UID: string
- region: string

### Front End
- Display username
- Display UID (copy to clipboard)
- Display region

# Color Palette
### V1
 <span style="color: #1C2E4A;">■</span>#1C2E4A
 <span style="color: #2D4C73;">■</span>#2D4C73
 <span style="color: #4A6EA5;">■</span>#4A6EA5
 <span style="color: #3D2B6B;">■</span>#3D2B6B
 <span style="color: #4A3A7A;">■</span>#4A3A7A
 <span style="color: #0A0A0A;">■</span>#0A0A0A
 <span style="color: #E0E0E0;">■</span>#E0E0E0