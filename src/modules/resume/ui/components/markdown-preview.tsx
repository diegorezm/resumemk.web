import { useEffect, type RefObject } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const cssReset = `
  html, body {
    all: unset;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    all: unset;
    box-sizing: border-box;
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

    const html = marked(markdown);
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
			<body class="resume">
				${html}
			</body>
			</html>
		`;

    const sanitizedHTML = DOMPurify.sanitize(fullHtml);

    doc.open();
    doc.writeln(sanitizedHTML);
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
