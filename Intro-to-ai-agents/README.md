# Intro to AI Agents

## Local LLM

### Pre-requisites:

- Docker Model Runner (https://docs.docker.com/ai/model-runner/#requirements)
- Node.js

### Usage:

1. Configure the model runner:

```bash
docker desktop enable model-runner '--tcp=12434'
```

2. Install and run the ai/smollm2 model:

```bash
docker model pull ai/smollm2
docker model run ai/smollm2
```

3. Run the agent:

```bash
npm run dev -- "Add 3 and 5"
```

Or

```bash
npm run dev -- "What's my location?"
```
