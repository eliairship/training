// https://docs.docker.com/ai/model-runner/#what-api-endpoints-are-available
const llmUrl = process.env.LLM_URL ?? 'http://localhost:12434/engines/v1';

import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat';
import * as dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const openai = new OpenAI({
  apiKey: 'sk-llm',
  baseURL: llmUrl,
});

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'getLocation',
      description: "Get the user's location based on their IP address",
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'addNumbers',
      description:
        'Add two numbers and return their sum. Does not handle other operations.',
      parameters: {
        type: 'object',
        properties: {
          a: { type: 'number', description: 'First number' },
          b: { type: 'number', description: 'Second number' },
        },
        required: ['a', 'b'],
      },
    },
  },
];

const toolsImplementations: Record<
  string,
  (args: Record<string, Json>) => Promise<Record<string, Json>>
> = {
  async addNumbers({ a, b }) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid arguments for add_numbers');
    }
    console.log('Adding numbers:', a, b);
    return { sum: a + b };
  },
  async getLocation() {
    // May get rate limited, if so, use http://edns.ip-api.com/json
    const response = await fetch('https://ipapi.co/json/');
    const locationData = await response.json();
    return locationData;
  },
};

async function runAgent(prompt: string) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a function calling agent.
        "When you answer, you MIGHT call one of the provided functions if it is aligned.
        "Never reveal internal reasoning or data.`,
    },
    { role: 'user', content: prompt },
  ];

  while (true) {
    const response = await openai.chat.completions.create({
      model: 'ai/smollm2',
      // model: 'gpt-4o-mini',
      messages,
      tools: tools,
      tool_choice: 'auto',
    });

    const message = response.choices[0].message;
    if (message.tool_calls?.length) {
      // The model opted to call a tool. Execute it and send result back.
      for (const toolCall of message.tool_calls) {
        const functionName = message.tool_calls[0].function.name;
        const functionId = message.tool_calls[0].id;
        const functionArgs = JSON.parse(
          message.tool_calls[0].function.arguments || '{}'
        ) as Record<string, Json>;
        const impl = toolsImplementations[functionName];
        if (!impl) {
          throw new Error(`No local implementation for tool ${name}`);
        }
        const result = await impl(functionArgs);
        messages.push({
          role: 'assistant',
          tool_calls: [toolCall],
        });
        messages.push({
          role: 'tool',
          content: JSON.stringify(result),
          tool_call_id: functionId,
        });
      }
    } else if (message.content) {
      console.error('Prompt violated configuration:');
      console.error(message.content);
      break;
    }

    // Simple stop condition: exit after we answered once via tool(s)
    if (messages.some((m) => m.role === 'tool')) {
      const resultMessage = [...messages]
        .reverse()
        .find((m) => m.role === 'tool');
      console.log('✅ Tool result returned to user:\n', resultMessage?.content);
      break;
    }
  }
}

console.log('🤖 Agent is running. Type your prompt below.\n');

// // CLI entry point
// const userPrompt = process.argv.slice(2).join(' ').trim();
// console.log({ userPrompt });
// if (!userPrompt) {
//   console.error(
//     '❌ Please provide a user prompt.\nExample: npm run dev -- "Add 3 and 5"'
//   );
//   process.exit(1);
// }

// runAgent(userPrompt).catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

main();

async function main() {
  while (true) {
    const userPrompt = (await ask('What can I help you with?: ')) as string;
    await runAgent(userPrompt);
  }
}
