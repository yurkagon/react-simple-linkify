import type { ReactNode } from 'react';
import Linkify, { type UrlComponentProps } from 'react-simple-linkify';

function Example({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="example">
      <h2>{title}</h2>
      {note ? <p className="note">{note}</p> : null}
      <div className="output">{children}</div>
    </section>
  );
}

const isYouTube = (url: string) =>
  /(?:youtube\.com\/watch|youtu\.be\/)/i.test(url);

function UrlEnhancer({ url }: UrlComponentProps) {
  if (isYouTube(url)) {
    return (
      <a className="yt" href={url} target="_blank" rel="noopener noreferrer">
        ▶ YouTube video
      </a>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
  );
}

export default function App() {
  return (
    <main className="page">
      <h1>react-simple-linkify</h1>
      <p className="subtitle">
        Live playground · edit <code>apps/demo/src/App.tsx</code> to experiment.
      </p>

      <Example title="Basic usage">
        <Linkify>
          Some useful description:
          https://github.com/yurkagon/react-simple-linkify. Plain domains like
          example.com are left alone (no scheme).
        </Linkify>
      </Example>

      <Example
        title="Custom URL component"
        note="YouTube links render as a badge; everything else stays a normal link."
      >
        <Linkify component={UrlEnhancer}>
          Docs: https://github.com/yurkagon/react-simple-linkify and a video
          https://www.youtube.com/watch?v=9NSzl8DtdM4 worth watching.
        </Linkify>
      </Example>

      <Example
        title="Nested markup (ReactNode children)"
        note="Only text is linkified; surrounding <strong>/<em> elements are preserved."
      >
        <Linkify>
          Read https://example.com, then{' '}
          <strong>
            the bold part https://bold.example with{' '}
            <em>emphasis https://em.example</em>
          </strong>{' '}
          at the end.
        </Linkify>
      </Example>

      <Example
        title="Edge cases"
        note="Trailing punctuation, multiple schemes, adjacent URLs."
      >
        <Linkify>
          Trailing dot: https://example.com. ftp works too:
          ftp://files.example.com/readme.txt — and adjacent: https://a.example
          https://b.example done.
        </Linkify>
      </Example>
    </main>
  );
}
