---
name: File References with @ Mentions
description: Using @ mentions to reference files and build context efficiently
---

# Content

# File References with @ Mentions

## Introduction to @ Mentions

@ mentions allow you to reference files without copying content:

- **Automatic reading**: Claude reads referenced files
- **Context building**: Add multiple files to conversation
- **Dynamic updates**: Always uses current file version

## Basic File References

### Single File Reference

```bash
# Reference a specific file
claude "Explain @src/app.js"

# Multiple files in one query
claude "Compare @old/api.js with @new/api.js"

# With wildcards
claude "Review all @src/*.test.js files"
```

### Building Context Progressively

```bash
# Start with overview
claude "What does @package.json tell us about this project?"

# Add more context
claude -c "Now look at @src/index.js entry point"

# Deep dive
claude -c "Explain how @src/auth/login.js handles authentication"
```

## Advanced Reference Patterns

### Directory References

```bash
# Reference entire directory
claude "Analyze architecture of @src/components/"

# Recursive references
claude "Review all @src/**/*.js files for patterns"

# Multiple directories
claude "Compare @v1/api/ with @v2/api/ structure"
```

### Specific Line References

```bash
# Reference specific lines
claude "Explain @src/app.js:45-67"

# Reference function
claude "Review the @src/utils.js:validateEmail function"

# Multiple sections
claude "Compare @auth.js:10-30 with @auth.js:100-120"
```

### Pattern Matching

```bash
# Find all test files
claude "Run through @**/*.test.js and find common issues"

# Configuration files
claude "Analyze all @*.config.js files"

# Specific extensions
claude "Review TypeScript types in @types/*.d.ts"
```

## Practical Workflows

### Code Review Workflow

```bash
# Start with changed files
claude "Review changes in @src/user.js and @src/auth.js"

# Check related tests
claude -c "Are @tests/user.test.js and @tests/auth.test.js adequate?"

# Verify documentation
claude -c "Update @README.md based on these changes"
```

### Debugging Workflow

```bash
# Start with error
ERROR_MSG=$(npm test 2>&1)
echo "$ERROR_MSG" | claude -p "This test is failing for @src/calculator.js"

# Examine implementation
claude -c "Show the issue in @src/calculator.js:calculate function"

# Check test
claude -c "Is @test/calculator.test.js testing correctly?"
```

### Documentation Generation

```bash
# Generate from code
claude "Create API documentation from @routes/*.js"

# Update existing
claude "Update @docs/API.md based on @src/routes/"

# Create examples
claude "Generate usage examples for functions in @lib/utils.js"
```

## Complex Reference Patterns

### Cross-File Analysis

```bash
# Trace data flow
claude "How does data flow from @api/input.js through @services/processor.js to @api/output.js?"

# Find dependencies
claude "What does @src/payment.js depend on from @lib/?"

# Architecture review
claude "Analyze coupling between @controllers/ and @models/"
```

### Refactoring Support

```bash
# Identify candidates
claude "Which functions in @src/utils.js should move to @lib/helpers.js?"

# Impact analysis
claude "If I change @models/user.js, what files in @src/ will be affected?"

# Pattern extraction
claude "Extract common patterns from @components/*.jsx into @components/shared/"
```

## Best Practices

### Efficient Context Building

```bash
# Start broad
claude "Give overview of @package.json and @src/"

# Narrow focus
claude -c "Focus on authentication in @src/auth/"

# Specific issues
claude -c "Fix the bug in @src/auth/token.js:refreshToken"
```

### Performance Optimization

```bash
# Don't reference unnecessary files
# Bad: claude "Review @node_modules/"
# Good: claude "Review @src/ excluding test files"

# Use specific paths when possible
# Bad: claude "Find the user model in @**/*.js"
# Good: claude "Review @models/user.js"
```

### Security Considerations

```bash
# Never reference sensitive files
# Avoid: @.env, @secrets/, @private/

# Be cautious with
# @**/*.key, @**/*.pem, @config/production.js
```

## Troubleshooting

### File Not Found

```bash
# Check file exists
ls src/app.js

# Check working directory
pwd

# Use absolute paths if needed
claude "Review @/Users/me/project/src/app.js"
```

### Large Files

```bash
# For large files, reference specific parts
claude "Review @large-file.js:1-100 first"
claude -c "Now review @large-file.js:101-200"

# Or ask for summary first
claude "Summarize the structure of @large-file.json"
```

### Binary Files

```bash
# Claude can't read binary files directly
# Convert first if needed
hexdump -C binary.dat | claude -p "What is this file format?"

# For images, describe intent
claude "I have an image at @screenshot.png of a UI bug"
```

## Pro Tips

1. **Use Tab Completion**: Many terminals support path completion
2. **Create Aliases**:
   ```bash
   alias review="claude 'Review @'"
   # Usage: review src/app.js
   ```
3. **Reference Patterns**: Save common patterns in shell functions

---

# Exercises

Unchanged.
