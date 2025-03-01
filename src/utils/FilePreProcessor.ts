import { Uri, workspace } from "vscode";
import { BufferImpl } from "./buffer";

/**
 * Utility class for pre-processing Draw.io files before they are opened in the editor.
 * This allows for validation, transformation, or any other processing needed.
 */
export class FilePreProcessor {
    /**
     * Process a text-based Draw.io file before opening
     * @param uri The URI of the file to process
     * @param content The text content of the file
     * @returns The processed content
     */
    public static async processTextFile(uri: Uri, content: string): Promise<string> {
        // Here you can add any pre-processing logic for text-based files
        // For example: validation, transformation, logging, etc.
        
        console.log(`Pre-processing text file: ${uri.toString()}`);
        
        // Example: Add a timestamp comment to the file
        if (content.startsWith('<mxfile')) {
            const timestamp = new Date().toISOString();
            content = content.replace(
                /^<mxfile /,
                `<mxfile processed="${timestamp}" `
            );
        }
        
        return content;
    }
    
    /**
     * Process a binary Draw.io file before opening
     * @param uri The URI of the file to process
     * @param buffer The binary content of the file
     * @returns The processed buffer
     */
    public static async processBinaryFile(uri: Uri, buffer: Uint8Array): Promise<Uint8Array> {
        // Here you can add any pre-processing logic for binary files
        // For PNG files, you might want to validate the file or extract metadata
        
        console.log(`Pre-processing binary file: ${uri.toString()}`);
        
        // For now, we're just returning the original buffer
        // In a real implementation, you might want to modify the buffer
        // or extract the XML from PNG files and modify it
        
        return buffer;
    }
    
    /**
     * Read a file from disk and process it
     * @param uri The URI of the file to process
     * @returns The processed content as a string
     */
    public static async readAndProcessFile(uri: Uri): Promise<string> {
        const buffer = await workspace.fs.readFile(uri);
        
        if (uri.path.endsWith(".png")) {
            // For PNG files, we might need special handling
            // For now, just convert to string
            return BufferImpl.from(buffer).toString("utf-8");
        } else {
            // For text-based files, process the content
            const content = BufferImpl.from(buffer).toString("utf-8");
            return await this.processTextFile(uri, content);
        }
    }
}