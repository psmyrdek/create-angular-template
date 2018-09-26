// Type definitions for create-angular-template@latest
// Definitions by: Przemek Smyrdek | https://github.com/psmyrdek

export interface TransformationOptions {
    /**
     * Strip prefixes of given name from tags.
     *
     *  **Default:** `data`
     */
    stripTagPrefix?: string;
    /**
     * Strip references to 'this' of given name.
     *
     *  **Default:** `$ctrl`
     */
    aliasForThis?: string;
    /**
     * Template format.
     *
     *  **Default:** `html`
     */
    format?: string;
    /**
     * Transform ng-bind into curly braces binding.
     *
     *  **Default:** `false`
     */
    bindToCurlyBraces?: boolean;
    /**
     * List of class names to remove from element.
     *
     *  **Default:** `['ng-hide']`
     */
    classListToRemove?: string[];
}

export function transformTemplate(template: string, options?: TransformationOptions): string;