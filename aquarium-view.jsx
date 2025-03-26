async function requireTextFile(path) {
  const cssFile = await app.vault.getFileByPath(path);
  return await app.vault.cachedRead(cssFile);
}

const Tank = await dc.require('scripts/aquarium/aquarium.js');  
const css = await requireTextFile('scripts/aquarium/aquarium.css')

const fishes = [
  {
    name: 'Brush Teeth'
  },
  {
    name: 'Read'
  },
  {
    name: 'Exercise'
  },
  {
    name: 'Journal'
  },
  {
    name: 'Code'
  },
  {
    name: 'Vitamins'
  },
]

return function View() {
  const tankRef = dc.useRef();
  const [tank, setTank] = dc.useState({});
  
  dc.useEffect(() => {
      setTank( new Tank({ tankRef: tankRef.current, fishes }));
  }, []);

  return (
    <div>
      <style>{css}</style>
      <h2>Aquarium</h2>
      <div className="tank" ref={ el => tankRef.current = el } />
    </div>
  );
}

