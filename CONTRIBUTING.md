
## Development

### Contributions
We welcome contributions! Feel free to report issues or submit pull requests on GitHub.

If an error occurs, open VS Code’s DevTools to retrieve logs and attach them to your issue report. Access DevTools by:
- Pressing `F12`
- Pressing `Shift + Ctrl + I`
- Selecting `Help > Toggle Developer Tools` from the menu

### Build
1. Clone the repository.
2. Install dependencies:
    ```bash
    npm run install:all      #Install package dependencies for both the  extension and React webview source code.
    ```
3. Run the extension:

   ```bash
    npm run start:ui    #Runs the React webview source code in development mode. Open http://localhost:3000 to view it in the browser.
    npm run build:ui    #Build React webview source code. Must be executed before compiling or running the extension.
    npm run compile     #Compile VS Code extension
   ```

4. Open the project in VS Code and press `F5` to launch the extension.
---

### Contributing

We welcome contributions to Loopify! Here’s how you can help:

- Fork the repository.

- Create a feature branch:
    ```bash
    git checkout -b feature-name
    ```
- Commit your changes:
    ```bash
    git commit -m 'Add feature-name'
    ```
- Push to the branch:
    ```bash
    git push origin feature-name
    ```
- Open a pull request on Github.
---
## References
- [VS Code API](https://code.visualstudio.com/api)
- [Custom Editors Guide](https://code.visualstudio.com/api/extension-guides/custom-editors)
- [VS Code Extension Samples](https://github.com/microsoft/vscode-extension-samples)

