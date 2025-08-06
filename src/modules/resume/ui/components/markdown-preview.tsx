import DOMPurify from "dompurify";
import { marked } from "marked";
import { type RefObject, useEffect } from "react";

const cssReset = `
  html, body {
    all: unset;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    all: unset;
    box-sizing: border-box;
  }
  hr {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid #ccc;
  }
`;

interface Props {
  title: string;
  markdown: string;
  css: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
}

const renderer = new marked.Renderer();

renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : "";
  return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
};

export function MarkdownPreview({ title, markdown, css, iframeRef }: Props) {
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const html = marked(markdown, {
      async: false,
      gfm: true,
      renderer,
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
			<body class="resume">
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
