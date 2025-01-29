
Manipulating various types of data in Google Apps Script

## Dates

Although it's introduced at https://developers.google.com/google-ads/scripts/docs/features/dates some of it is not as easy as you might hope

```typescript
function dateExamples(){
  // today in words
  const dt = new Date();
  console.log(dt);
  // now in milliseconds
  const dtval = new Date().valueOf();
  console.log(dtval);
  // start of today in milliseconds
  const today = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).valueOf();
  console.log(today);
  // two days from now
  const twoDaysHence = new Date(new Date().setDate(dt.getDate() + 2));
  console.log(twoDaysHence);
  // start of two days from now
  const twoDaysHenceStart = new Date(twoDaysHence.getFullYear(), twoDaysHence.getMonth(), twoDaysHence.getDate()).valueOf();
  console.log(twoDaysHenceStart);
  // as a string
  const twoDate = new Date(twoDaysHenceStart);
  console.log(twoDate);
}
```

