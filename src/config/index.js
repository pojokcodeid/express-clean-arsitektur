
// src/config/index.js
import app from '../infrastructure/webserver/server.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
