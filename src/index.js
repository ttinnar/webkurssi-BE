// index.js MAIN JS FILE
// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// mock data for simple API
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

// GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET http://127.0.0.1:3000/items/<ID>
app.get('/items/:id', (req, res) => {
  // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
  // Extract the requested ID from the URL
  const requestedId = parseInt(req.params.id, 10);

  // Find the item in the array
  const item = items.find(item => item.id === requestedId);

  // Check if the item was found
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Itemin lisäys
// POST http://127.0.0.1:3000/items/
app.post('/items', (req, res) => {
  // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
  res.json({message: 'item created'});
});

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Tervetuloo tää kai toimii jotenki:)!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
