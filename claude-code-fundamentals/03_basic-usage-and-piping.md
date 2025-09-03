---
name: Basic Usage and Piping
description: Core Claude Code usage patterns and piping content from other commands
repo: https://github.com/UnosquareCOE/ai_tooling_training
---

# Content

# Basic Usage and Piping

## Core Command Structure

### Interactive Mode (REPL)

An interactive programming environment where users can input commands or code snippets, have them executed, and receive immediate feedback on the results in an iterative manner.

```bash
# Start interactive session
claude

# Start interactive session with initial prompt
claude "Help me optimize this function"
```

Quick Commands:

```bash
claude
# '#': Memory Shortcut (add to the CLAUDE.md)
> # "Always use cypress for testing"

# '/': Slash commands
> /help
> /context
> /terminal-setup

# '!': Bash Mode (Run commands directly and add execution output to the session)
> ! cat package.json

```

### Non-Interactive Mode

Run a one-off query, then exit

```bash
# Single query with -p flag
claude -p "Explain the SOLID principles"

# Process files
claude -p "Review this code" src/app.js

# Multiple files
claude -p "Find security issues" src/*.js
```

## The Power of Piping

### Basic Piping

In Claude Code, "piping" refers to using the pipe symbol (|) in the terminal to send the output of one command as input to another, allowing you to chain operations together to automate complex tasks. Piping data into Claude Code can reduce token usage, but it also offers significant benefits related to context management and automation. Instead of copying and pasting large amounts of text into your prompt, you can pass data directly from the command line.

```bash
# Pipe command output
ls -la | claude -p "What do these permissions mean?"

# Pipe file content
cat package.json | claude -p "What dependencies are outdated?"

# Pipe error messages
npm test 2>&1 | claude -p "Fix these test failures"
```

### Git Workflows

```bash
# Review changes
git diff | claude -p "Summarize these changes"

# Analyze commits
git log --oneline -10 | claude -p "What patterns do you see?"

# Pre-commit review
git diff --staged | claude -p "Any issues with this commit?"
```

### Build and Test Integration

```bash
# Debug build errors
npm run build 2>&1 | claude -p "How do I fix this?"

# Analyze test failures
pytest -v | claude -p "Why are these tests failing?"

# Coverage analysis
npm run coverage | claude -p "What needs more testing?"
```

### System Analysis

```bash
# Performance monitoring
top -b -n 1 | claude -p "Any performance concerns?"

# Log analysis
tail -n 100 app.log | claude -p "Find anomalies"

# Disk usage
du -h --max-depth=1 | claude -p "What can I clean up?"
```

## Advanced Piping Patterns

### Multi-Stage Pipelines

```bash
# Complex analysis
find . -name "*.js" -exec wc -l {} + | \
  sort -rn | \
  head -20 | \
  claude -p "Which files need refactoring?"
```

### Combining Tools

```bash
# Docker + Claude
docker ps --format "table {{.Names}}\t{{.Status}}" | \
  claude -p "Are all services healthy?"

# Kubernetes + Claude
kubectl get pods --all-namespaces | \
  claude -p "Identify any issues"
```

### Error Stream Handling

```bash
# Capture both stdout and stderr
make build 2>&1 | claude -p "Fix compilation errors"

# Only errors
make build 2>&1 >/dev/null | claude -p "Explain these errors"
```

## Input Methods Comparison

| Method | Use Case        | Example                                |
| ------ | --------------- | -------------------------------------- |
| Direct | Quick questions | `claude "What is REST?"`               |
| Files  | Code review     | `claude "Review" main.py`              |
| Pipe   | Dynamic content | `ps aux \| claude "Find memory leaks"` |
| Stdin  | Large input     | `claude -p < requirements.txt`         |

## Essential commands

Here are the most important commands for daily use:

| Command             | What it does                      | Example                             |
| ------------------- | --------------------------------- | ----------------------------------- |
| `claude`            | Start interactive mode            | `claude`                            |
| `claude "task"`     | Run a one-time task               | `claude "fix the build error"`      |
| `claude -p "query"` | Run one-off query, then exit      | `claude -p "explain this function"` |
| `claude -c`         | Continue most recent conversation | `claude -c`                         |
| `claude -r`         | Resume a previous conversation    | `claude -r`                         |
| `claude commit`     | Create a Git commit               | `claude commit`                     |
| `/clear`            | Clear conversation history        | `> /clear`                          |
| `/help`             | Show available commands           | `> /help`                           |
| `exit` or Ctrl+C    | Exit Claude Code                  | `> exit`                            |

## Practical Workflows

### Daily Standup Helper

```bash
# What did I work on?
git log --author="$(git config user.name)" \
  --since="1 day ago" --oneline | \
  claude -p "Summarize for standup"
```

### Code Review Assistant

```bash
# Review PR changes
gh pr diff | claude -p "Review for:
- Security issues
- Performance problems
- Best practices"
```

### Documentation Generator

```bash
# Generate README sections
ls -la src/ | claude -p "Create README outline"

# API documentation
grep -r "router." src/routes/ | \
  claude -p "Document these endpoints"
```

## Best Practices

1. **Be Specific**: "Fix syntax errors" > "Fix this"
2. **Provide Context**: Include error messages completely
3. **Use Appropriate Flags**:
   - `-p` for one-shot queries
   - No flag for conversations
4. **Handle Large Output**:
   ```bash
   # Paginate large outputs
   git diff | head -200 | claude -p "Start reviewing"
   ```

## Common Patterns

### Debug Helper

```bash
alias debug='claude -p "Debug this error:"'
# Usage: npm test 2>&1 | debug
```

### Explain Helper

```bash
alias explain='claude -p "Explain this output:"'
# Usage: docker inspect container | explain
```
