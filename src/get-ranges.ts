
function getSequences(arr: number[]): number[][] {
  return arr.reduce(
    (sequences: number[][], current: number, index: number) => {
      const lastSequence = sequences.slice(-1)[0];
      if (index === 0 || (lastSequence.slice(-1)[0] + 1) === current) {
        lastSequence.push(current);
      } else {
        sequences.push([current]);
      }

      return sequences;
    },
    [[]]
  );
}

function sequenceToString(sequence: number[]): string {
  if (sequence.length === 0) return '';
  else if (sequence.length === 1) return sequence[0].toString();

  return `${sequence[0]}-${sequence.slice(-1)[0]}`
}

export default function getRanges(arr: number[]): string {
  return getSequences(arr).map(sequenceToString).join(',');
}
