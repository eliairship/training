# Course Summary

## Title: Introduction to AWS Lambda

## Target Audience

- Primary: Software Engineers, DevOps Engineers, Cloud Engineers
- Secondary: Backend Developers, Anyone new to serverless computing

---

## Classification

## Workshop (Includes practical demos, guided console walkthroughs, and serverless deployment exercises)

## Time Requirement

Duration: 1.5 Hours

### Breakdown:

- 20 min: Lambda Core Concepts - What is Serverless and Lambda?
- 35 min: Hands-On - Creating and Testing Your First Lambda Function
- 20 min: Event Sources - API Gateway and S3 Basics
- 10 min: Basic Monitoring and Troubleshooting
- 5 min: Q&A and Next Steps

---

### Complexity

### Minimum Seniority Required:

- Beginner Level
- No prior AWS experience required
- Basic programming knowledge in any language helpful
- Willingness to learn cloud computing concepts

---

## Trainer Requirements:

- Basic understanding of AWS Lambda and serverless concepts
- Experience creating simple Lambda functions
- Familiarity with AWS Console navigation
- Ability to explain cloud computing fundamentals clearly

---

## Expected Outcomes

By the end of this course, participants will:

- Understand what serverless computing means and how Lambda fits
- Create and test simple Lambda functions using the AWS Console
- Connect Lambda to basic event sources like API Gateway
- Read CloudWatch logs to debug Lambda functions
- Identify use cases where Lambda is appropriate
- Have foundation knowledge for advanced Lambda courses

---

## What Do We Want to Get Out of the Course?

- Introduce serverless computing concepts in an accessible way
- Provide hands-on experience with Lambda basics
- Build confidence in AWS Console navigation
- Prepare learners for intermediate and advanced Lambda courses
- Create foundation for understanding event-driven architecture

---

## Course Content

### Lambda Core Concepts - What is Serverless and Lambda?

- **What is Serverless Computing?**

  - You write code, AWS runs it for you
  - No servers to manage or maintain
  - Pay only when your code runs
  - Automatically scales up and down

- **What is AWS Lambda?**

  - A service that runs your code when something happens (an "event")
  - Perfect for small, focused tasks
  - Supports popular programming languages like Python and Node.js
  - Integrates easily with other AWS services

- **Basic Lambda Function Structure**

  - **Handler Function**: The main function that runs your code
  - **Event**: Information about what triggered your function
  - **Response**: What your function sends back

- **Key Lambda Facts**
  - Functions can run for up to 15 minutes
  - You can choose how much memory your function needs
  - AWS handles all the infrastructure automatically

**Exercise:**

- Navigate to AWS Lambda in the console
- Create a "Hello World" function from a template
- Test the function and see the results
- Change the message and test again

---

### Hands-On - Creating and Testing Your First Lambda Function

- **Step-by-Step Function Creation**

  - Navigate to Lambda in AWS Console
  - Click "Create function"
  - Choose "Author from scratch"
  - Pick a simple name and Python runtime
  - Create the function

- **Simple Function Example**

Python Example:

```python
def lambda_handler(event, context):
    name = event.get('name', 'World')
    return f"Hello, {name}!"
```

- **Testing Your Function**
  - Use the built-in "Test" button
  - Create a simple test event with your name
  - View the results
  - Check the logs if something goes wrong

**Exercise:**

- Create a function that adds two numbers together
- Test it with different numbers
- Look at the execution logs to see what happened
- Try changing the function timeout setting

---

### Event Sources - API Gateway and S3 Basics

- **What are Event Sources?**

  - Things that can trigger your Lambda function to run
  - Like a doorbell that rings when someone visits
  - Common examples: web requests, file uploads, scheduled tasks

- **API Gateway - Web Requests**

  - Lets people call your Lambda function from the internet
  - Like creating a simple web API
  - When someone visits a URL, your function runs

- **S3 - File Storage Events**

  - Runs your function when files are uploaded to S3
  - Useful for processing images, documents, etc.
  - Automatic - no manual checking needed

- **Simple Event Examples**

Web Request (API Gateway):

```json
{
  "name": "John",
  "action": "greet"
}
```

File Upload (S3):

```json
{
  "Records": [
    {
      "s3": {
        "bucket": { "name": "my-photos" },
        "object": { "key": "vacation.jpg" }
      }
    }
  ]
}
```

**Exercise:**

- Create a simple API Gateway endpoint for your Lambda function
- Test calling your function through a web URL
- (Optional) Set up an S3 bucket to trigger your function when files are uploaded

---

### Basic Monitoring and Troubleshooting

- **CloudWatch Logs - Your Friend When Things Go Wrong**

  - Every Lambda function automatically creates logs
  - See what your function is doing step by step
  - Check for error messages when functions fail
  - Access logs through the Lambda console

- **Basic Troubleshooting Tips**

  - If your function doesn't work, check the logs first
  - Common issues: typos in code, wrong input format
  - Test with simple inputs before complex ones
  - Use `print()` statements to debug (they show up in logs)

- **Simple Cost Awareness**
  - Lambda charges by execution time and memory used
  - Free tier includes 1 million requests per month
  - Functions that run quickly cost less
  - Delete unused functions to avoid charges

**Exercise:**

- Create a function that deliberately has an error
- Find and read the error message in CloudWatch logs
- Fix the error and test again
- Add some `print()` statements to see how logging works

---

## Assessment Requirements

**Practical Task:**

- Create a simple Lambda function that:
  - Accepts a name as input
  - Returns a personalized greeting
  - Is triggered by API Gateway
  - Logs the interaction to CloudWatch

**Knowledge Check:**

- Quiz covering basic serverless and Lambda concepts
- Simple troubleshooting scenarios using CloudWatch logs
- Identification of appropriate Lambda use cases

**Hands-on Review:**

- Review each participant's Lambda function
- Discuss the function code and test results
- Walk through CloudWatch logs together
- Identify when Lambda is the right choice for a problem

**Success Criteria:**

- Successfully create and test a Lambda function
- Demonstrate ability to read CloudWatch logs
- Explain the difference between serverless and traditional hosting
- Connect a function to at least one event source (API Gateway)

---

## Additional Notes and Tips

- **When Lambda Makes Sense:**

  - Processing files when they're uploaded
  - Creating simple web APIs
  - Scheduled tasks (like daily reports)
  - Responding to database changes
  - Processing messages from queues

- **When Lambda Might Not Be the Best Choice:**

  - Applications that need to run continuously
  - Very large file processing
  - Applications that need a lot of memory or storage
  - Complex workflows (though there are advanced tools for this)

- **Common Beginner Mistakes:**

  - Forgetting to save changes before testing
  - Not checking CloudWatch logs when functions fail
  - Making functions too complex for a first attempt
  - Not understanding that Lambda is event-driven

- **Next Steps After This Course:**
  - Take intermediate Lambda courses covering layers, error handling
  - Learn about AWS SAM for more advanced deployments
  - Explore Step Functions for complex workflows
  - Study other AWS services that work well with Lambda
