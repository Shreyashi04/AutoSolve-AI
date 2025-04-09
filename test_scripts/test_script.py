#!/usr/bin/env python
import os
import platform
import sys
from datetime import datetime

def main():
    print("=== Python Test Script ===")
    print(f"Current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Python version: {platform.python_version()}")
    print(f"Operating system: {platform.system()} {platform.release()}")
    print(f"Current directory: {os.getcwd()}")
    
    # Simple calculation
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    total = sum(numbers)
    average = total / len(numbers)
    
    print(f"\nCalculation demonstration:")
    print(f"Sum of numbers from 1 to 10: {total}")
    print(f"Average of numbers: {average:.2f}")
    
    print("\nScript executed successfully!")

if __name__ == "__main__":
    main()
