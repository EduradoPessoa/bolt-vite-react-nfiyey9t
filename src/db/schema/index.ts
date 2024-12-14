import { tables } from './tables';
import { indexes } from './indexes';

export const schema = `
${tables}

${indexes}
`;