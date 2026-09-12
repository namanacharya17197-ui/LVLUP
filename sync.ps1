<#
.SYNOPSIS
  Instant Git Sync script for NEO-RUNNER // PROTOCOL
.EXAMPLE
  .\sync.ps1 -Message "refactored HUD components"
#>
param(
    [string]$Message = ""
)

$GitExe = "git"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    $candidates = @(
        "$env:LOCALAPPDATA\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe",
        "$env:LOCALAPPDATA\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) {
            $GitExe = $c
            break
        }
    }
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

Write-Host "`n[1/3] Staging all files..." -ForegroundColor Cyan
& $GitExe add -A

$status = & $GitExe status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "[INFO] Working tree is clean. Nothing to commit." -ForegroundColor Green
    return
}

Write-Host "[2/3] Committing with message: '$Message'..." -ForegroundColor Cyan
& $GitExe commit -m $Message

Write-Host "[3/3] Pushing to GitHub (origin main)..." -ForegroundColor Cyan
& $GitExe push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Successfully pushed all changes to https://github.com/namanacharya17197-ui/LVLUP.git`n" -ForegroundColor Green
} else {
    Write-Host "`n[ERROR] Failed to push to GitHub. Error code: $LASTEXITCODE`n" -ForegroundColor Red
}
