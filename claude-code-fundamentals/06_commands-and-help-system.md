---
name: Commands and Help System
description: Exploring Claude Code commands and navigating the help system
---

# Content

# Commands and Help System

## Built-in Commands

### Core Commands

```bash
# Start interactive session
claude

# Single query (non-interactive)
claude -p "Your question"

# Continue the most recent conversation
claude -c "Follow-up"

# Resume a specific session
claude -r "session-id" "Query"

# Update Claude Code
claude update

# Check version
claude --version
```

### Session Management

```bash
# List sessions
claude sessions list

# Show session details
claude sessions show "name"

# Export session
claude sessions export "name" > session.md

# Delete session
claude sessions delete "name"

# Clear all sessions
claude sessions clear
```

### Configuration Commands

```bash
# List configuration
claude config list

# Set configuration
claude config set model claude-3-opus
claude config set verbose true
claude config set auto-update false

# Get specific config
claude config get model

# Reset to defaults
claude config reset
```

## Command Flags

### Essential Flags

```bash
# Print mode (non-interactive)
claude -p "Query"
claude --print "Query"

# Continue the most recent conversation
claude -c "Follow-up"
claude --continue "Follow-up"

# Resume a specific session
claude -r "session-id" "Query"
claude --resume "session-id" "Query"

# Interactively select a conversation to resume
claude --resume
claude -r

# Verbose output
claude --verbose "Query"
claude -v "Query"
```

### Advanced Flags

```bash
# Specify model
claude --model claude-3-sonnet "Query"

# Output format
claude --output-format json "Query"
claude --output-format stream-json "Query"

# Add working directories
claude --add-dir /path/to/project "Query"

# Specify allowed tools
claude --allowedTools read,write "Query"

# Skip permissions (dangerous!)
claude --dangerously-skip-permissions "Query"
```

## Help System

### Getting Help

```bash
# General help
claude --help
claude -h

# Command-specific help
claude config --help

# In interactive mode
claude
> /help
> /help config
```

### Interactive Help

```bash
# Start Claude and ask for help
claude
> How do I use claude code sessions?
> What claude code commands are available?
> Show me examples of claude code piping
```

## Slash commands

Control Claude's behavior during an interactive session with slash commands.

### Built-in slash commands

| Command                   | Purpose                                                                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `/add-dir`                | Add additional working directories                                                                                                           |
| `/agents`                 | Manage custom AI subagents for specialized tasks                                                                                             |
| `/bug`                    | Report bugs (sends conversation to Anthropic)                                                                                                |
| `/clear`                  | Clear conversation history                                                                                                                   |
| `/compact [instructions]` | Compact conversation with optional focus instructions                                                                                        |
| `/config`                 | View/modify configuration                                                                                                                    |
| `/cost`                   | Show token usage statistics (see [cost tracking guide](/en/docs/claude-code/costs#using-the-cost-command) for subscription-specific details) |
| `/doctor`                 | Checks the health of your Claude Code installation                                                                                           |
| `/help`                   | Get usage help                                                                                                                               |
| `/init`                   | Initialize project with CLAUDE.md guide                                                                                                      |
| `/login`                  | Switch Anthropic accounts                                                                                                                    |
| `/logout`                 | Sign out from your Anthropic account                                                                                                         |
| `/mcp`                    | Manage MCP server connections and OAuth authentication                                                                                       |
| `/memory`                 | Edit CLAUDE.md memory files                                                                                                                  |
| `/model`                  | Select or change the AI model                                                                                                                |
| `/permissions`            | View or update [permissions](/en/docs/claude-code/iam#configuring-permissions)                                                               |
| `/pr_comments`            | View pull request comments                                                                                                                   |
| `/review`                 | Request code review                                                                                                                          |
| `/status`                 | View account and system statuses                                                                                                             |
| `/terminal-setup`         | Install Shift+Enter key binding for newlines (iTerm2 and VSCode only)                                                                        |
| `/vim`                    | Enter vim mode for alternating insert and command modes                                                                                      |

## Practical Command Patterns

### Development Workflow

```bash
# Morning setup
claude "What should I focus on today?"

# Code review
git diff | claude -p "Review these changes"

# Bug fix
claude -r "bug-fix" "Help me debug @src/app.js"

# Documentation
claude -p "Generate README from @src/"
```

### Debugging Commands

```bash
# Verbose debugging
claude --verbose -p "Why is this failing?" error.log

# Model comparison
claude --model claude-3-opus -p "Complex analysis"
claude --model claude-3-sonnet -p "Same query for comparison"
```

### Automation Patterns

```bash
# Daily standup
alias standup='git log --oneline --since="1 day ago" | claude -p "Summarize for standup"'

# PR description
alias prdesc='git diff main | claude -p "Write PR description"'

# Test failures
alias fixtest='npm test 2>&1 | claude -p "Fix test failures"'
```

## Environment Variables

```bash
# API Key
export ANTHROPIC_API_KEY="sk-ant-..."

# Default model
export CLAUDE_MODEL="claude-3-opus"

# Verbose mode
export CLAUDE_VERBOSE="true"

# Custom config directory
export CLAUDE_CONFIG_DIR="~/.config/claude"

# Session directory
export CLAUDE_SESSION_DIR="~/.claude/sessions"
```

## Command Combinations

### Complex Workflows

```bash
# Review, fix, and test
claude -p "Review @src/app.js" && \
claude -c "Fix the issues" && \
npm test | claude -c -p "Are tests passing?"

# Multi-file analysis
for file in src/*.js; do
  claude -p "Review @$file for security issues"
done

# Batch processing
find . -name "*.py" -exec claude -p "Add type hints to @{}" \;
```

## Tips and Tricks

### Shell Integration

```bash
# Add to ~/.bashrc or ~/.zshrc

# Quick review function
review() {
  claude -p "Review @$1"
}

# Debug helper
debug() {
  echo "$1" | claude -p "Debug this error"
}

# Explain command output
explain() {
  $@ | claude -p "Explain this output"
}
# Usage: explain docker ps
```

### Performance Tips

1. **Use specific models**: Sonnet for simple tasks, Opus for complex
2. **Leverage sessions**: Don't repeat context
3. **Batch related queries**: Use continue flag
4. **Clear old sessions**: Prevent slowdown

### Security Best Practices

1. **Never use** `--dangerously-skip-permissions` in production
2. **Review permissions** before granting
3. **Rotate API keys (If applicable)** regularly
4. **Don't expose sensitive keys** in command history

## Getting More Help

### Documentation

```bash
# Check installed docs
claude docs

# Online documentation
claude "Show me the documentation URL"
```

### Community Resources

```bash
# Ask Claude itself
claude "What are best practices for using Claude Code?"
claude "Show me advanced Claude Code examples"
```

### Troubleshooting

```bash
# Diagnostic information
claude doctor

# Check connectivity
claude -p "test" --verbose

# Reset if issues
claude config reset
npm reinstall -g @anthropic-ai/claude-code
```

---

# Exercises

Name: Command and Configuration Workshop

Description: Explore all available commands, configure Claude Code for your workflow, and create helpful aliases.

## Steps

1. Use the help command to discover available options.
2. List current configuration settings.
3. Configure Claude Code for your preferences.
4. Practice session management commands.
