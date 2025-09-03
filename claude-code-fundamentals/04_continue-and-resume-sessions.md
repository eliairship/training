---
name: Continue and Resume Sessions
description: Managing conversation context with continue and resume features
---

# Content

# Continue and Resume Sessions

## Understanding Session Context

Claude Code maintains conversation history, enabling:

- **Iterative development**: Build solutions step-by-step
- **Context preservation**: Remember previous discussions
- **Multi-day projects**: Resume work across sessions

## The --continue (-c) Flag

### Basic Usage

```bash
# Initial query
claude "Analyze this React component" src/App.js

# Continue the conversation
claude -c "Now optimize it for performance"
claude -c "Add error boundaries"
claude -c "Write tests for it"
```

### Practical Workflow

```bash
# Step 1: Initial analysis
claude "Review this API" api/users.js

# Step 2: Get suggestions
claude -c "What security improvements do you recommend?"

# Step 3: Implementation
claude -c "Show me how to implement input validation"

# Step 4: Testing
claude -c "Generate tests for these changes"
```

### Continue with New Context

```bash
# Add new files to existing conversation
claude -c "Now look at this related file" api/auth.js

# Pipe new information
git diff | claude -c -p "Review changes since our last discussion"
```

## The --resume (-r) Flag

### Resume Session

Resume a session by its unique ID

```bash
# Start a  session
claude "Let's refactor the authentication system"

claude /status
# Output: Session ID: some-unique-id

# Resume later (even after closing terminal)
claude -r "some-unique-id" "Continue where we left off"

# Add new context to session
claude -r "some-unique-id" "Here's the new requirement" requirements.md
```

Resume a session by its description

```bash
claude -r "Continue where we left off"
# Output: a list of sessions with a summary of the conversation
# Select the session you want to resume with <enter>
```

### Session Management

```bash
# Show current session details
claude /status

# Clear current session
claude /clear
```

## Session Best Practices

### Long-Running Projects

```bash
# Day 1: Architecture
claude -r "project-migration-session-id" "Plan database migration from MySQL to PostgreSQL"

# Day 2: Implementation
claude -r "project-migration-session-id" "Let's start with user tables"

# Day 3: Testing
claude -r "project-migration-session-id" "Create migration tests"

# Check progress
claude -r "project-migration-session-id" "Summarize what we've done so far"
```

## Real-World Examples

### Code Review Session

```bash
# Start review
claude -r "pr-review-session-id" "Review PR #1234"

# Address each file
claude -r "pr-review-session-id" "Check auth.js for security issues"
claude -r "pr-review-session-id" "Review database queries in user.js"

# Final summary
claude -r "pr-review-session-id" "Provide overall PR feedback"
```

### Learning Session

```bash
# Start learning
claude -r "learning-rust-session-id" "Teach me Rust basics"

# Continue lessons
claude -r "learning-rust-session-id" "Show me ownership examples"
claude -r "learning-rust-session-id" "Explain borrowing"

# Practice
claude -r "learning-rust-session-id" "Give me an exercise to practice"
```

### Debug Session

```bash
# Start debugging
error_output=$(npm test 2>&1)
echo "$error_output" | claude -r "debug-tests-session-id" -p "Help fix these test failures"

# Try fixes
claude -r "debug-tests-session-id" "The first approach didn't work, try another"

# Success
claude -r "debug-tests-session-id" "That worked! Document the solution"
```

## Session Limits and Performance

### Token Limits

- Sessions have context limits (typically 100K tokens)
- Older context is truncated when limit reached
- Use session summary for long projects:

To view context of the current session:

```bash
claude /context
```

To decrease the context size:

```bash
claude /compact [instructions]
```

### Clearing the Session

```bash
claude /clear
```

### Performance Tips

1. **Clear old sessions**: Remove completed work
2. **Use specific sessions**: Don't overload one session
3. **Summarize periodically**: Consolidate the conversation once you get close to the context window
4. **Check context periodically**: Use `claude /context` to see the current context and if any files or MCP servers are consuming too much of the context.

---

# Exercises

Name: Multi-Day Project Simulation

Description: Start a session for a mock refactoring project, practice continuing conversations, and manage session lifecycle.

## Instructions

1. Start a session for a refactoring project
   - `claude "let's refactor the authentication module"`
2. Add files and context to the session progressively.
   - `claude -c "First, analyze @src/auth/login.js"`
   - `claude -c "What security improvements do you recommend?"`
3. Get the session ID
   - `claude /status`
4. Resume the session
   - `claude -r "some-unique-id" "Let's continue our refactoring work"`
5. Compact the session
   - `claude /compact "Focus on the security improvements"`
6. Clear the session
   - `claude /clear`
7. List all sessions
   - `claude -r | claude --resume`
