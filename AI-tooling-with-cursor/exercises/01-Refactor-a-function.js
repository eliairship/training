function analyzeTextData(text, minWordLength, topN) {
  var words = text
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase()
    .split(/\s+/)
    .filter(function(word) {
      return word.length >= minWordLength;
    });

  var frequency = {};
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (frequency[w]) {
      frequency[w]++;
    } else {
      frequency[w] = 1;
    }
  }

  var sorted = [];
  for (var word in frequency) {
    sorted.push([word, frequency[word]]);
  }

  sorted.sort(function(a, b) {
    if (b[1] === a[1]) {
      return a[0] < b[0] ? -1 : 1;
    }
    return b[1] - a[1];
  });

  var result = [];
  for (var j = 0; j < Math.min(topN, sorted.length); j++) {
    result.push({
      word: sorted[j][0],
      count: sorted[j][1]
    });
  }

  return {
    totalWords: words.length,
    uniqueWords: Object.keys(frequency).length,
    topWords: result
  };
}
