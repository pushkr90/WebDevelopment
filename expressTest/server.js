const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/dynamic.html',(request,response) => {
console.log(JSON.stringify(request.query));
response.send('This is not an actual file');
});

app.listen(3000, () => {
console.log('listening on http://localhost:3000');
});

