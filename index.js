// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const adminRoutes = require("./routes/adminRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// HTML Template
const loginPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form action="/login" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br><br>
    <label for="role">Role:</label>
    <select id="role" name="role" required>
      <option value/="user">User</option>
      <option value="admin">Admin</option>
    </select><br><br>
    <button type="submit">Login</button>
  </form>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
  res.send(loginPage);
});

app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  // Dummy authentication and role-based redirection
  if (username === 'admin' && password === 'admin123' && role === 'admin') {
    //return res.redirect('/admin');
    return res.redirect('/api/admin');
  } else if (username === 'user' && password === 'user123' && role === 'user') {
    //return res.redirect('/user');
    return res.redirect('/api/user');
  } else {
    return res.status(401).send('Invalid credentials or role!');
  }
});



// app.get('/admin', (req, res) => {
//   res.send('<h1>Welcome Admin!</h1>');
// });

// app.get('/user', (req, res) => {
//   res.send('<h1>Welcome User!</h1>');
// });

 app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRoutes);

// app.get("/api/admin", function(req,res){
//   res.sendStatus(200);
// });
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
