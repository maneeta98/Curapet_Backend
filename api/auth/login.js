app.post('/api/auth/login', (req, res) => {
  const { mobile, password } = req.body;
  // Add your login logic here
  if (mobile === '1234567890' && password === 'pass') {
    return res.json({ token: 'sample-token' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});
