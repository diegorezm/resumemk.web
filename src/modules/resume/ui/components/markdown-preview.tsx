import { useEffect, type RefObject } from "react";
import { marked } from "marked";

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
  markdown: string;
  css: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
}

export function MarkdownPreview({ markdown, css, iframeRef }: Props) {
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

    doc.open();
    doc.writeln(fullHtml);
    doc.close();
  }, [markdown, css, iframeRef.current]);

  return (
    <iframe
      id="markdown-preview-frame"
      ref={iframeRef}
      title="Markdown Preview"
      className="w-full h-full border-none rounded"
    />
  );
}
