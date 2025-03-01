import { commands, window, Disposable } from "vscode";

export function registerFailableCommand(
	commandName: string,
	commandFn: (...args: any[]) => any
): Disposable {
	return commands.registerCommand(commandName, async (...args: any[]) => {
		try {
			return await commandFn(...args);
		} catch (e: unknown) {
			const errorMessage = e instanceof Error ? e.message : String(e);
			window.showErrorMessage("The command failed: " + errorMessage);
			return false;
		}
	});
}
