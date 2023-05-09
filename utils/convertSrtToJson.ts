// Define a function to parse an SRT file and return an array of subtitle objects
export function parseSRT(srtText: string) {
  // Split the SRT text into individual subtitle blocks
  const blocks = srtText.trim().split(/\r?\n\r?\n/);

  // Parse each subtitle block and create an array of subtitle objects
  const subtitles = blocks.map(function (block) {
    // Split the block into its component parts (number, time codes, and text)
    var parts = block.split(/\r?\n/);

    // Extract the number and time codes from the parts array
    var number = parseInt(parts[0]);
    var times = parts[1].split(" --> ");
    var start = parseSRTTimecode(times[0]);
    var end = parseSRTTimecode(times[1]);

    // Extract the text from the parts array and remove any formatting
    var text = parts
      .slice(2)
      .join("\n")
      .replace(/<\/?[^>]+(>|$)/g, "");

    // Create a subtitle object with the parsed data
    return { number: number, start: start, end: end, text: text };
  });

  // Return the array of subtitle objects
  return subtitles;
}

// Define a function to parse an SRT timecode and return the time in seconds
function parseSRTTimecode(timecode: string) {
  // Split the timecode into its component parts (hours, minutes, seconds, and milliseconds)
  var parts = timecode.split(/[:,]/);

  // Convert the parts to numbers and calculate the time in seconds
  var hours = parseInt(parts[0]);
  var minutes = parseInt(parts[1]);
  var seconds = parseInt(parts[2]);
  var milliseconds = parseInt(parts[3]);
  var time = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;

  // Return the time in seconds
  return time;
}
