import { commands, ExtensionContext, window } from "vscode";
import { SidebarProvider } from "./panels/SidebarProvider";

export function activate(context: ExtensionContext) {
  console.log('Extension is activating...'); // Add this for debugging

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  
  const providerRegistration = window.registerWebviewViewProvider(
    "loopify-sidebar",
    sidebarProvider
  );
  
  context.subscriptions.push(providerRegistration);

  // Register commands
  context.subscriptions.push(
    commands.registerCommand("loopify.sayhello", () => {
      window.showInformationMessage("Hello World!");
    })
  );

  context.subscriptions.push(
    commands.registerCommand("loopify.askquestion", async () => {
      let response = await window.showInformationMessage(
        "How are you doing?",
        "Good",
        "Bad"
      );
      if (response === "Bad") {
        window.showInformationMessage("I'm sorry");
      }
    })
  );

  console.log('Extension activated'); // Add this for debugging
}

export function deactivate() {}