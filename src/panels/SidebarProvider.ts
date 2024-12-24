import * as vscode from "vscode";
import * as path from "path";
import { getUri } from "../utilities/getUri";
import { requireModule } from "../utilities/require-config";


export class SidebarProvider implements vscode.WebviewViewProvider {
   _view?: vscode.WebviewView;
   audioContext?: AudioContext;
   currentSource?: AudioBufferSourceNode;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      console.log("message",message);
      switch (message.type) {
        case "onMessageSend": {
          if (!message.value) {
            return;
          }
          vscode.window.showInformationMessage(
            `Message from sidebar: ${message.value}`
          );
          break;
        }
        case "playTune": {
          try {
            const audioFilePath = path.join(
              this._extensionUri.fsPath,
              "media",
              "audio",
              `${message.title}.mp3`
            );
            // const audioData = await vscode.workspace.fs.readFile(
            //   vscode.Uri.file(audioFilePath)
            // );

            // // Initialize AudioContext if not exists
            // if (!this.audioContext) {
            //   this.audioContext = new AudioContext();
            // }

            // // Stop current playing audio if any
            // if (this.currentSource) {
            //   this.currentSource.stop();
            // }

            // // Create new audio buffer
            // const arrayBuffer = audioData.buffer;
            // const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

            // // Create and configure source
            // this.currentSource = this.audioContext.createBufferSource();
            // this.currentSource.buffer = audioBuffer;
            // this.currentSource.connect(this.audioContext.destination);

            // // Handle when audio finishes playing
            // this.currentSource.onended = () => {
            //   this.currentSource = undefined;
            //   this._view?.webview.postMessage({ 
            //     type: "audioEnded", 
            //     title: message.title 
            //   });
            // };

            // // Play audio
            // this.currentSource.start(0);

            // // Notify webview that audio started playing
            // this._view?.webview.postMessage({
            //   type: "audioStarted",
            //   title: message.title,
            // });
            // this._view?.webview.postMessage({
            //   type: "playTune",
            //   title: message.title,
            //   audioData: audioData.buffer, 
            // });
            const fileUri = webviewView.webview.asWebviewUri(vscode.Uri.file(audioFilePath));
              this._view?.webview.postMessage({
              type: "playAudio",
              uri: fileUri.toString(),
            });
          } catch (error: any) {
            vscode.window.showErrorMessage(`Error playing audio: ${error.message}`);
          }
          break;
        }

        // case "stopAudio": {
        //   if (this.currentSource) {
        //     this.currentSource.stop();
        //     this.currentSource = undefined;
        //     this._view?.webview.postMessage({ type: "audioStopped" });
        //   }
        //   break;
        // }
        case "stopAudio": {
          this._view?.webview.postMessage({ type: "stopAudio" });
          break;
        }
        
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const stylesUri = getUri(webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.css",
    ]);
    // The JS file from the React build output
    const scriptUri = getUri(webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.js",
    ]);

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    const workspaceUri = workspaceFolder?.uri;
    const configPath = vscode.Uri.joinPath(
      workspaceUri!,
      "myext.config.ts"
    ).fsPath;
    let config;

    try {
      config = requireModule(configPath);
    } catch (error) {}

    // if (!config) return "Config Not found";

    if (workspaceFolder) {
      const watcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(workspaceFolder, "myext.config.ts")
      );
      watcher.onDidChange((uri) => {
        const newConfig = requireModule(uri.path);
        this._view?.webview.postMessage({
          type: "onConfigChange",
          value: newConfig,
        });
      });
    }

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <link rel="stylesheet" type="text/css" href="${stylesUri}">
         <title>Loopify</title>
       </head>
       <body>
        <div id="root"></div>
        <script>
          window.config = ${JSON.stringify(config)}
        </script>
        <script type="module" src="${scriptUri}"></script>
       </body>
     </html>
   `;
  }
}