
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    let name = "Sanjay UG";
    let usn = "4SF22CS182";
    let collage = "Sahyadri College, Mangalore";

    res.send(`${name} with USN: ${usn} is studing at ${collage}`);
});

app.get('/vowels', (req, res) => {
    let sentence = 'Programming is fun!';
    let vowelCount = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    
    for (let i = 0; i < sentence.length; i++) {
      let char = sentence[i].toLowerCase();
      for (let j = 0; j < vowels.length; j++) {
        if (char === vowels[j]) {
          vowelCount++;
        }
      }
    }
    
    res.send(`Number of vowels: ${vowelCount}`);
})

app.get('/palindrome', (req, res) => {
    let word = 'racecar';
    let isPalindrome = true;
    
    for (let i = 0; i < word.length / 2; i++) {
      if (word[i] !== word[word.length - 1 - i]) {
        isPalindrome = false;
        break;
      }
    }
    
    if (isPalindrome) {
      res.send(`${word} is a palindrome.`)
    } else {
        res.send(`${word} is not a palindrome.`)
    } // Output: 'racecar is a palindrome.'
})

app.get('/duplicate', (req, res) => {
    let input = 'bananas';
    let result = '';
    
    for (let i = 0; i < input.length; i++) {
      let exists = false;
      for (let j = 0; j < result.length; j++) {
        if (input[i] === result[j]) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        result += input[i];
      }
    }
    
    res.send(result);
})

app.get('/censorWords', (req, res) => {
    function censorWords(sentence, badWords) {
        // Split the sentence into an array of words
        let words = sentence.split(' ');
        
        // Loop through each word in the sentence
        for (let i = 0; i < words.length; i++) {
          // If the current word is in the list of bad words (case-insensitive), replace it with asterisks
          if (badWords.includes(words[i].toLowerCase())) {
            words[i] = '*'.repeat(words[i].length);
          }
        }
        
        // Join the array back into a string and return the censored sentence
        return words.join(' ');
    }
      
      // Example usage
      let sentence = 'You are so dumb and stupid';
      let badWords = ['dumb', 'stupid'];
      res.send(censorWords(sentence, badWords));
})

app.get('/generateEmail', (req, res) => {
    function generateEmail(name) {
        // Convert the name to lowercase and split it into words
        let words = name.toLowerCase().split(' ');
        
        // Join the words with periods and append the college email domain
        return words.join('.') + '@college.edu';
    }
      
      // Example usage
    res.send(generateEmail('John Doe'));
})

app.get('/validation', (req, res) => {
  function Validation(user, email, password) {
    if (!user || !email || !password) {
      return res.status(400).json({ error: 'Missing user, email, or password' });
    }

    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if(atIndex === -1 || dotIndex === -1 || dotIndex <= atIndex) {
      return 'Invalid email format.';
    }

    return 'Validation successful!';
  }

  const user = "KRISHNA";
  const email = "krishna@gmail.com";
  const password = "1234asdfg";
  res.send(Validation(user, email, password));
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});