---
name: Installation and Setup
description: Installing Claude Code and configuring your development environment
---

# Content

# Installation and Setup

## System Requirements

- **Node.js**: Version 18 or newer
- **Memory**: 4GB+ RAM recommended
- **OS**: macOS, Linux, or Windows (WSL/Git Bash)
- **Network**: Stable internet connection

## Installation

### Primary Method: npm Global Install

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
# Output: claude-code version X.X.X
```

### Alternative: Local Project Install

```bash
# Install in specific project
npm install --save-dev @anthropic-ai/claude-code

# Run with npx
npx claude "Help with this project"
```

## Authentication Setup

### Method 1: Anthropic Console

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create account or sign in
3. Navigate to API keys
4. Generate new key with descriptive name
5. First run of `claude` will prompt for authentication

### Method 2: Environment Variable

```bash
# Set API key in environment
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Add to shell profile for persistence
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-..."' >> ~/.bashrc
source ~/.bashrc
```

### Method 3: Claude Pro/Team (Recommended)

If you have Claude Pro subscription:

```bash
claude
> /login
# Opens browser for authentication
```

## Configuration

### View Current Config

```bash
claude config list
```

### Set Configuration Options

```bash
# Set default model (Optional)
claude config set model claude-3-opus

# Set output format (Optional)
claude config set output-format json

# Enable verbose logging (Optional)
claude config set verbose true
```

## First Run Verification

### Test Basic Functionality

```bash
# Simple test
claude "Hello, are you working?"

# Test file reading
echo "console.log('test');" > test.js
claude "Explain this file" test.js

# Test piping
ls -la | claude -p "What files are here?"
```

## IDE Integration

### VSCode

1. Open VSCode
2. Open the integrated teminal
3. Run `claude` - the extension will automatically install

## Troubleshooting Common Issues

### Permission Denied

```bash
# Fix npm permissions
sudo npm install -g @anthropic-ai/claude-code
# OR better approach:
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### API Key Not Working

```bash
# Check for extra spaces or quotes
echo $ANTHROPIC_API_KEY | cat -A
# Should show: sk-ant-api03-...$
# Not: "sk-ant-api03-..."$ or sk-ant-api03-... $
```

### Version Conflicts

```bash
# Update to latest
claude update

# Or reinstall
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code@latest
```

## Auto-Update Feature

Claude Code automatically checks for updates:

- On startup
- Every 4 hours while running
- Disable with: `claude config set auto-update false`

## Security Best Practices

1. **Never commit API keys**: Add to `.gitignore`
2. **Use environment files**: `.env` for local development
3. **Rotate keys regularly**: Monthly for production use
4. **Monitor usage**: Check console.anthropic.com dashboard

---

# Exercises

Name: Complete Claude code installation

Description: Install Claude Code on your system, configure API authentication, and verify everything is working correctly.

## Steps

1. Install Claude Code.
   - Run the npm installation command. Watch for any errors and note the installed version.
   - `npm install -g @anthropic-ai/claude-code`
2. Configure API authentication
   - Check that Claude Code is properly installed by running the version command.
   - `claude --version`
3. Verify everything is working correctly
   - Test that Claude Code can respond to a simple query.
   - `claude "Hello Claude, please confirm you are working"`

## Success Criteria

- Claude Code is installed and configured
- API authentication is working
- Everything is working correctly

---

# Coach Notes

**Pre-Exercise Setup (2 min):**

- Ensure all participants have Node.js 18+ installed
- Test installation commands on training machine
- Have troubleshooting guide ready

**Shared login steps:**

1. As the instructor, login to https://claude.ai with `learning.claude@unosquare.com`
2. A link will get sent to `chris_crawford.claude@unosquare.com` email. Click the link sent to that email and copy the code.
3. Navigate back to claude.ai and paste the code.
4. Instruct user to run `claude /login` and click login with subscription
5. Instruct user to send the link in their terminal to you
6. As the instructor, open the link in your browser and log in
7. Upon completion of the course, Remove the users session from claude.ai

**Key Teaching Points:**

- Security of API keys - never commit to git
- Difference between global and local installation
- Auto-update feature and how to control it

**Common Issues & Solutions:**

- Issue: npm permission denied Solution: Use npx or fix npm permissions (not sudo) Command: npm config set prefix ~/.npm-global
- Issue: API key not working Solution: Check for spaces, quotes, correct format (sk-ant-...)
- Issue: Corporate proxy blocking Solution: Set HTTP_PROXY and HTTPS_PROXY environment variables

**Time Management:**

- Installation: 3 minutes
- API configuration: 2 minutes
- Verification: 2 minutes
- Troubleshooting buffer: 3 minutes

**Post-Exercise Discussion:**

- Verify everyone has working installation
- Discuss API key management best practices
- Preview what we'll build with Claude Code
