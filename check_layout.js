const http = require('http');

fetch('http://localhost:3000').then(res => res.text()).then(html => {
  if (html.includes('bl-hero-visual')) {
    console.log("Home page has bl-hero-visual");
  } else {
    console.log("Home page missing bl-hero-visual");
  }
});

fetch('http://localhost:3000/start').then(res => res.text()).then(html => {
  if (html.includes('bl-hero-visual')) {
    console.log("Start page has bl-hero-visual");
  } else {
    console.log("Start page missing bl-hero-visual");
  }
});
