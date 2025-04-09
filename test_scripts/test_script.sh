#!/bin/bash

echo "=== Shell Script Test ==="
echo "Current date and time: $(date)"
echo "Current user: $USERNAME"
echo "Current directory: $(pwd)"

# Display some basic information
echo -e "\nSystem Information:"
echo "Hostname: $COMPUTERNAME"
echo "Operating System: Windows"

# List files in the current directory
echo -e "\nFiles in current directory:"
dir

# Create a small sample file
echo -e "\nCreating a sample text file..."
echo "This is a test file created by the shell script" > test_output.txt
echo "File created: test_output.txt"

echo -e "\nScript executed successfully!"
