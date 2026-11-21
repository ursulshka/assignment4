// İlkim Dinç, 2024502042
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

const html = (element) => renderToStaticMarkup(element)

// Worked example: props is ONE object; the parameter pattern takes it apart.
// These two components are the same thing written two ways.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// ---------------------------------------------------------------------------
// P1: props is one object. Without destructuring I read props.title; with
// destructuring (form 5 inside a parameter, form 11) I take the fields out first.
function SongCardA(props) {
  console.log('P1 (keys of the props object):', Object.keys(props))
  return <article><h3>{props.title}</h3><p>{props.artist}</p>{props.children}</article>
}
function SongCardB({ title, artist, children }) {
  return <article><h3>{title}</h3><p>{artist}</p>{children}</article>
}
console.log('P1 A:', html(<SongCardA title="Апрель" artist="Кино">1989</SongCardA>))
console.log('P1 B:', html(<SongCardB title="Апрель" artist="Кино">1989</SongCardB>))

// ---------------------------------------------------------------------------
// P2: children is only a prop. Content between the tags and a children attribute
// end up in the same place: props.children.
console.log('P2 (between tags):', html(<SongCardB title="Печаль">sad song</SongCardB>))
console.log('P2 (children attr):', html(<SongCardB title="Печаль" children="sad song" />))

// P2: both at the same time. The content between the tags wins.
console.log('P2 (both):', html(<SongCardB title="Печаль" children="from the attribute">from the tags</SongCardB>))

// ---------------------------------------------------------------------------
// P3: what children can be. Each line shows what appears inside <div>.
function Box({ children }) {
  return <div>{children}</div>
}
console.log('P3 string   :', html(<Box>Группа крови</Box>))
console.log('P3 number   :', html(<Box>{1988}</Box>))
console.log('P3 zero     :', html(<Box>{0}</Box>))
console.log('P3 element  :', html(<Box><b>Кукушка</b></Box>))
console.log('P3 several  :', html(<Box><b>Апрель</b><i>Печаль</i></Box>))
console.log('P3 array    :', html(<Box>{['Апрель', 'Печаль'].map((t) => <li key={t}>{t}</li>)}</Box>))
console.log('P3 undefined:', html(<Box>{undefined}</Box>))
console.log('P3 null     :', html(<Box>{null}</Box>))
console.log('P3 false    :', html(<Box>{false}</Box>))
console.log('P3 true     :', html(<Box>{true}</Box>))
console.log('P3 nothing  :', html(<Box />))
// A function is not something React can show. React prints a warning (on stderr)
// and renders nothing for it.
console.log('P3 function :', html(<Box>{() => 'Кино'}</Box>))

// P3: a function as children only works when the component CALLS it (render prop).
function WithDuration({ seconds, children }) {
  return <div>{children(Math.floor(seconds / 60), seconds % 60)}</div>
}
console.log('P3 called   :', html(<WithDuration seconds={398}>{(m, s) => `Кукушка ${m}:${s}`}</WithDuration>))

// ---------------------------------------------------------------------------
// P4: separate children from the other props, and spread the rest onto a DOM element.
function Section({ title, children, ...rest }) {
  console.log('P4 (rest):', rest)
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
console.log('P4:', html(<Section title="Кино 1989" id="kino" className="album" data-year="1989">Апрель, Печаль</Section>))

// P4: order decides who wins. The LAST one wins, like in an object spread.
function SpreadFirst({ children, ...rest }) {
  return <section {...rest} className="fixed">{children}</section> // fixed wins
}
function SpreadLast({ children, ...rest }) {
  return <section className="fixed" {...rest}>{children}</section> // rest wins
}
console.log('P4 spread first:', html(<SpreadFirst className="mine">Кукушка</SpreadFirst>))
console.log('P4 spread last :', html(<SpreadLast className="mine">Кукушка</SpreadLast>))
// The same rule in plain objects:
console.log('P4 objects     :', { ...{ className: 'mine' }, className: 'fixed' }, { className: 'fixed', ...{ className: 'mine' } })

// ---------------------------------------------------------------------------
// P5: props or children? The same album card built twice.
// Version 1: named slots as props. The component decides WHERE header and footer go.
function AlbumWithSlots({ header, footer, tracks }) {
  return (
    <div className="album">
      <header>{header}</header>
      <ol>{tracks.map((t) => <li key={t}>{t}</li>)}</ol>
      <footer>{footer}</footer>
    </div>
  )
}
// Version 2: children only. The caller decides everything inside.
function AlbumFrame({ children }) {
  return <div className="album">{children}</div>
}
const tracks = ['Звезда по имени Солнце', 'Апрель', 'Печаль']
console.log('P5 props   :', html(<AlbumWithSlots header="Кино, 1989" footer="3 songs" tracks={tracks} />))
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
// P6: defaults for props (form 7). undefined uses the default, null does not.
function Track({ title, duration = '?:??' }) {
  return <p>{title} <small>{duration}</small></p>
}
console.log('P6 given    :', html(<Track title="Кукушка" duration="6:38" />))
console.log('P6 missing  :', html(<Track title="Кукушка" />))
console.log('P6 undefined:', html(<Track title="Кукушка" duration={undefined} />))
console.log('P6 null     :', html(<Track title="Кукушка" duration={null} />))

// ---------------------------------------------------------------------------
// Experiments from the hints.
// key is not a prop: React takes it out before the component sees the props.
function ShowKey(props) {
  return <p>key inside the component: {String(props.key)}</p>
}
console.log('exp key     :', html(<ShowKey key="april" />))

// A component that changes its props: in development React freezes the props object.
function Rename(props) {
  try {
    props.title = 'changed'
  } catch (error) {
    console.log('exp change props:', error.constructor.name, '-', error.message)
  }
  return <p>{props.title}</p>
}
console.log('exp change  :', html(<Rename title="Апрель" />))

// rest props with a name that already exists: title is taken out, so it is NOT in rest.
function TitleTwice({ title, ...rest }) {
  return <p>{title} / rest has title: {String('title' in rest)}</p>
}
console.log('exp rest    :', html(<TitleTwice title="Печаль" year={1989} />))
