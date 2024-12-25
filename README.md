# Hello World (React + Vite)

This is an implementation of the default [Hello World](https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/hello-world) sample extension that demonstrates how to set up and use a [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit) webview sidebar extension.


## Documentation

For a deeper dive into how this sample works, read the guides below.

- [Extension structure](./docs/extension-structure.md)
- [Extension commands](./docs/extension-commands.md)
- [Extension development cycle](./docs/extension-development-cycle.md)

## Run The Sample

```bash
# Copy sample extension locally
git clone https://github.com/anubra266/vscode-sidebar-extension.git hello world

# Navigate into sample directory
cd hello-world

# Install dependencies for both the extension and webview UI source code
pnpm run install:all

# Build extension UI source code in watch mode
pnpm run watch:ui

# Open sample in VS Code
code .
```

Once the sample is open inside VS Code you can run the extension by doing the following:

1. Press `F5` to open a new Extension Development Host window
2. Inside the host window, click the new panda icon


- loopify icon 
- svg for extension bar
