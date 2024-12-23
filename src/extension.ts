import { commands, ExtensionContext, window } from "vscode";
import { SidebarProvider } from "./panels/SidebarProvider";

export function activate(context: ExtensionContext) {
  // Register the Sidebar Panel
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    window.registerWebviewViewProvider("myextension-sidebar", sidebarProvider)
  );

  // Add command to the extension context

  context.subscriptions.push(
    commands.registerCommand("myextension.sayhello", () => {
      window.showInformationMessage("Hello World!");
    })
  );

  context.subscriptions.push(
    commands.registerCommand("myextension.askquestion", async () => {
      let response = await window.showInformationMessage("How are you doing?", "Good", "Bad");
      if (response === "Bad") {
        window.showInformationMessage("I'm sorry");
      }
    })
  );

  // context.subscriptions.push(showHelloWorldCommand);
}
