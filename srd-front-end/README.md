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