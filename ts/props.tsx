// İlkim Dinç, 2024502042
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactElement, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const html = (element: ReactElement): string => renderToStaticMarkup(element)

type CardProps = { title: string; children?: ReactNode }

// Worked example: the type goes after the whole pattern, and children is in the type too.
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>))
// <section><h2>Hi</h2>text</section>

// ---------------------------------------------------------------------------
// P1: one props object, typed once. Both components get the same SongCardProps.
type SongCardProps = { title: string; artist: string; children?: ReactNode }

function SongCardA(props: SongCardProps) {
  return <article><h3>{props.title}</h3><p>{props.artist}</p>{props.children}</article>
}
function SongCardB({ title, artist, children }: SongCardProps) {
  return <article><h3>{title}</h3><p>{artist}</p>{children}</article>
}
console.log('P1 A:', html(<SongCardA title="Апрель" artist="Кино">1989</SongCardA>))
console.log('P1 B:', html(<SongCardB title="Апрель" artist="Кино">1989</SongCardB>))

// ---------------------------------------------------------------------------
// P2: children is only a prop, so the attribute form type-checks too.
console.log('P2 (between tags):', html(<Card title="Печаль">sad song</Card>))
console.log('P2 (children attr):', html(<Card title="Печаль" children="sad song" />))
// Both at once is a compile error in TSX (it works in plain JSX, see js/props.jsx):
// <Card title="Печаль" children="attr">tags</Card>
//   error TS2710: 'children' are specified twice. The attribute named 'children' will be overwritten.

// ---------------------------------------------------------------------------
// P3: ReactNode is the type of "anything React can show".
function Box({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}
const things: [string, ReactNode][] = [
  ['string', 'Группа крови'],
  ['number', 1988],
  ['zero', 0],
  ['element', <b key="b">Кукушка</b>],
  ['undefined', undefined],
  ['null', null],
  ['false', false],
]
for (const [label, child] of things) {
  console.log(`P3 ${label.padEnd(9)}:`, html(<Box>{child}</Box>))
}
// A function is NOT a ReactNode, so the compiler rejects it before React can warn:
// <Box>{() => 'Кино'}</Box>
//   error: Type '() => string' is not assignable to type 'ReactNode'.

// To pass a function as children, the type must say so, and the component must call it.
function WithDuration({ seconds, children }: { seconds: number; children: (m: number, s: number) => ReactNode }) {
  return <div>{children(Math.floor(seconds / 60), seconds % 60)}</div>
}
console.log('P3 called   :', html(<WithDuration seconds={398}>{(m, s) => `Кукушка ${m}:${s}`}</WithDuration>))

// ---------------------------------------------------------------------------
// P4: rest props typed as the props of a <section>, then spread onto it.
type SectionProps = ComponentProps<'section'> & { title: string }

function Section({ title, children, ...rest }: SectionProps) {
  // rest: everything a <section> accepts, minus title and children
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
console.log('P4:', html(<Section title="Кино 1989" id="kino" className="album" data-year="1989">Апрель, Печаль</Section>))

function SpreadFirst({ children, ...rest }: ComponentProps<'section'>) {
  return <section {...rest} className="fixed">{children}</section>
}
function SpreadLast({ children, ...rest }: ComponentProps<'section'>) {
  return <section className="fixed" {...rest}>{children}</section>
}
console.log('P4 spread first:', html(<SpreadFirst className="mine">Кукушка</SpreadFirst>))
console.log('P4 spread last :', html(<SpreadLast className="mine">Кукушка</SpreadLast>))

// ---------------------------------------------------------------------------
// P5: named slots as props vs children only.
type AlbumWithSlotsProps = { header: ReactNode; footer?: ReactNode; tracks: string[] }

function AlbumWithSlots({ header, footer = 'no footer', tracks }: AlbumWithSlotsProps) {
  return (
    <div className="album">
      <header>{header}</header>
      <ol>{tracks.map((t) => <li key={t}>{t}</li>)}</ol>
      <footer>{footer}</footer>
    </div>
  )
}
function AlbumFrame({ children }: PropsWithChildren) {
  return <div className="album">{children}</div>
}
const tracks = ['Звезда по имени Солнце', 'Апрель', 'Печаль']
console.log('P5 props   :', html(<AlbumWithSlots header="Кино, 1989" tracks={tracks} />))
console.log(
  'P5 children:',
  html(
    <AlbumFrame>
      <header>Кино, 1989</header>
      <ol>{tracks.map((t) => <li key={t}>{t}</li>)}</ol>
      <footer>3 songs</footer>
    </AlbumFrame>,
  ),
)

// ---------------------------------------------------------------------------
// P6: a default for an optional prop. duration is `string | null | undefined` in the type,
// inside the component it is `string | null`: the default removes undefined, not null.
type TrackProps = { title: string; duration?: string | null }

function Track({ title, duration = '?:??' }: TrackProps) {
  return <p>{title} <small>{duration}</small></p>
}
console.log('P6 given    :', html(<Track title="Кукушка" duration="6:38" />))
console.log('P6 missing  :', html(<Track title="Кукушка" />))
console.log('P6 null     :', html(<Track title="Кукушка" duration={null} />))

// ---------------------------------------------------------------------------
// P7: three ways to type children and props.

// (a) children?: ReactNode written by hand: optional, accepts anything React can show.
type LyricsProps = { song: string; children?: ReactNode }
function Lyrics({ song, children }: LyricsProps) {
  return <blockquote title={song}>{children ?? '(no lyrics yet)'}</blockquote>
}
console.log('P7a with    :', html(<Lyrics song="Апрель">first line</Lyrics>))
console.log('P7a without :', html(<Lyrics song="Апрель" />))

// (b) PropsWithChildren<P> = P & { children?: ReactNode }. Same thing, shorter.
function Playlist({ name, children }: PropsWithChildren<{ name: string }>) {
  return <ul aria-label={name}>{children}</ul>
}
console.log('P7b         :', html(<Playlist name="Gece Kino"><li>Печаль</li><li>Кукушка</li></Playlist>))

// (c) ComponentProps<'button'>: every prop a real <button> accepts, plus my own `song`.
type PlayButtonProps = ComponentProps<'button'> & { song: string }
function PlayButton({ song, children, ...buttonProps }: PlayButtonProps) {
  return <button type="button" {...buttonProps}>▶ {song}{children}</button>
}
console.log('P7c         :', html(<PlayButton song="Группа крови" disabled aria-label="play" />))

// What the compiler rejects (uncomment one line at a time and run `npm run check`):
// type NoChildren = { title: string }
// function Plain({ title }: NoChildren) { return <p>{title}</p> }
// html(<Plain title="Апрель">text</Plain>)        // children is not in NoChildren
// html(<PlayButton song="Апрель" href="/april" />) // href is not a <button> prop
// html(<Lyrics song="Апрель">{{ line: 1 }}</Lyrics>) // a plain object is not a ReactNode
// html(<PlayButton />)                             // song is required
