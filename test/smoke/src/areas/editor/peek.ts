/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Code } from '../../vscode/code';

export class References {

	private static readonly REFERENCES_WIDGET = '.monaco-editor .zone-widget .zone-widget-container.peekview-widget.reference-zone-widget.results-loaded';
	private static readonly REFERENCES_TITLE_FILE_NAME = `${References.REFERENCES_WIDGET} .head .peekview-title .filename`;
	private static readonly REFERENCES_TITLE_COUNT = `${References.REFERENCES_WIDGET} .head .peekview-title .meta`;
	private static readonly REFERENCES = `${References.REFERENCES_WIDGET} .body .ref-tree.inline .monaco-tree-row .reference`;

	constructor(private code: Code) { }

	async waitUntilOpen(): Promise<void> {
		await this.code.waitForElement(References.REFERENCES_WIDGET);
	}

	async waitForReferencesCountInTitle(count: number): Promise<void> {
		await this.code.waitForTextContent(References.REFERENCES_TITLE_COUNT, void 0, titleCount => {
			const matches = titleCount.match(/\d+/);
			return matches ? parseInt(matches[0]) === count : false;
		});
	}

	async waitForReferencesCount(count: number): Promise<void> {
		await this.code.waitForElements(References.REFERENCES, false, result => result && result.length === count);
	}

	async waitForFile(file: string): Promise<void> {
		await this.code.waitForTextContent(References.REFERENCES_TITLE_FILE_NAME, file);
	}

	async close(): Promise<void> {
		await this.code.dispatchKeybinding('escape');
		await this.code.waitForElement(References.REFERENCES_WIDGET, element => !element);
	}
}