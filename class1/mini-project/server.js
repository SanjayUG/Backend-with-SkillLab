
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/check-spam', (req, res) => {
  const { emailContent } = req.body;

  // Simple response for now
  res.json({ message: 'Email received', content: emailContent });
});


const spamWords = ['win', 'free', 'prize', 'money', 'lottery', 'click here'];
        
    function isSpam(emailContent) {
      return spamWords.some(word => emailContent.toLowerCase().includes(word.toLowerCase()));
    }
    
    app.post('/check-spam', (req, res) => {
      const { emailContent } = req.body;
      
      if (isSpam(emailContent)) {
        res.json({ message: 'This email is spam.', spam: true });
      } else {
        res.json({ message: 'This email is not spam.', spam: false });
      }
    });


    function advancedSpamCheck(emailContent) {
        let spamScore = 0;
      
        spamWords.forEach(word => {
          const regex = new RegExp(word, 'gi');
          const matchCount = (emailContent.match(regex) || []).length;
          spamScore += matchCount;
        });
      
        return spamScore > 2; // Flag as spam if more than 2 spam words are found
      }
      
      app.post('/check-spam', (req, res) => {
        const { emailContent } = req.body;
        
        if (advancedSpamCheck(emailContent)) {
          res.json({ message: 'This email is spam.', spam: true });
        } else {
          res.json({ message: 'This email is not spam.', spam: false });
        }
      });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});