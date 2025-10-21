# Install dependencies

```
pnpm install
```

# Start the app

```
pnpm run dev
```

Then visit: http://localhost:5173

# Environment Variables
Create a `.env.development.local` file in `srd-front-end/` with:
```
VITE_API_URL=http://localhost:5000/api
```

# Storybook
[Storybook](https://storybook.js.org/) is a tool to guide the development process of individual components

```
# enter front-end workspace
cd srd-front-end 

# start storybook
pnpm run storybook
```

Then visit: http://localhost:6006

To create a `.stories.tsx` file for a component, manually add the file in the same folder as the component. Here is a basic example:
```
import Component from './Component';

export default {
  title: 'Shared/Component',
  component: Component,
};

export const Default = () => <Component />;
```
> When making changes to imports, component names, or props- `.stories.tsx` may break. Be sure to check this file and update as needed.
```
srd-front-end/
├── .storybook/
│   ├── main.ts                 # Storybook config: stories, addons, framework
│   ├── preview.ts              # Global styles, decorators, parameters
│   └── manager.ts              # (Optional) Custom Storybook UI theme
│
├── src/
│   └── components/
│       └── shared/
│           └── Component/
│               ├── Component.tsx           # Component logic
│               ├── Component.stories.tsx   # Storybook demo
│               └── Component.css           # Component styles
```