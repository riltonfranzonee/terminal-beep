const asciiNums = [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39];

process.stdout.write("Enter the number of beeps: ")
process.stdin.on("data", buffer => {
  let number = 0;

  for(let [index, byte] of buffer.reverse().entries()) {
    if(byte === 0x0a) continue; // ignore null entries

    if(!asciiNums.includes(byte)) {
      process.stderr.write("Please, input a valid number.\n"); 
      break;
    }

    index--;
    const asciiNum = asciiNums.findIndex(xx => xx === byte);
    number += asciiNum * (10 ** index);
  }

  while (number > 0) {
    process.stdout.write('\x07');
    number--;
  }

  process.stdout.write("Enter the number of beeps: ");
})