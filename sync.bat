@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   NEO-RUNNER // PROTOCOL - GITHUB SYNC UTILITY
echo ========================================================

:: Detect Git executable
set "GIT_EXE=git"
where git >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe" (
        set "GIT_EXE=%LOCALAPPDATA%\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe"
    ) else if exist "%LOCALAPPDATA%\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe" (
        set "GIT_EXE=%LOCALAPPDATA%\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"
    ) else (
        echo [ERROR] Git executable not found on system.
        pause
        exit /b 1
    )
)

:: Get commit message from argument or generate timestamp
set "MSG=%~1"
if "%MSG%"=="" (
    for /f "tokens=1-4 delims=/ " %%a in ("%date%") do (
        set "CURRDATE=%%c-%%a-%%b"
    )
    set "CURRTIME=%time:~0,8%"
    set "MSG=update: !date! !time!"
)

echo [1/3] Staging changes...
"%GIT_EXE%" add -A

"%GIT_EXE%" status --porcelain > "%TEMP%\git_status.tmp"
set /p STATUS=<"%TEMP%\git_status.tmp"
del "%TEMP%\git_status.tmp" 2>nul

if "%STATUS%"=="" (
    echo [INFO] No changes detected in working directory.
    echo Everything is already up to date with GitHub.
    timeout /t 3 >nul
    exit /b 0
)

echo [2/3] Committing changes with message: "%MSG%"
"%GIT_EXE%" commit -m "%MSG%"

echo [3/3] Pushing to origin main...
"%GIT_EXE%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Telemetry and code synced to GitHub!
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Check your network or credentials.
)

pause
