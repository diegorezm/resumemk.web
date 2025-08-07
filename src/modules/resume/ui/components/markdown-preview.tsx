import DOMPurify from "dompurify";
import { marked } from "marked";
import { type RefObject, useEffect } from "react";

const cssReset = `
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

a::before, a::after {
  display: none !important;
  content: none !important;
}

a {
  text-decoration: none;
  color: blue;
}

ul {
  list-style-type: disc;
  margin-top: 0.5rem;
  margin-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

em {
  font-style: italic;
}

strong {
  font-weight: bold;
}
`;

interface Props {
	title: string;
	markdown: string;
	css: string;
	iframeRef: RefObject<HTMLIFrameElement | null>;
}

export function MarkdownPreview({ title, markdown, css, iframeRef }: Props) {
	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		const doc = iframe.contentDocument || iframe.contentWindow?.document;
		if (!doc) return;

		const html = marked(markdown, {
			async: false,
			gfm: true,
		});

		const sanitizedHTML = DOMPurify.sanitize(html, {
			ADD_ATTR: ["target", "rel"],
		});

		const fullHtml = `
			<!DOCTYPE html>
			<html>
			<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>${cssReset}</style>
				<style>
					${css}
				</style>
			</head>
			<body>
				${sanitizedHTML}
			</body>
			</html>
		`;

		doc.open();
		doc.writeln(fullHtml);
		doc.close();
	}, [markdown, css, title, iframeRef.current]);

	return (
		<iframe
			id="markdown-preview-frame"
			ref={iframeRef}
			title="Markdown Preview"
			className="w-full h-full border-none rounded"
		/>
	);
}
