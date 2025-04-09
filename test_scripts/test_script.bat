:: filepath: c:\Owais\autosolve-app\test_scripts\test_script.bat
@echo off
echo === Batch Script Test ===
echo Current date and time: %DATE% %TIME%
echo Current user: %USERNAME%
echo Current directory: %CD%

echo.
echo System Information:
echo Hostname: %COMPUTERNAME%
systeminfo | findstr /B /C:"OS Name" /C:"OS Version"

echo.
echo Files in current directory:
dir

echo.
echo Creating a sample text file...
echo This is a test file created by the batch script > test_output.txt
echo File created: test_output.txt

echo.
echo Script executed successfully!